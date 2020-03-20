"""
Created on 3/5/2020


@author: Zhi Qiao
@source: HankTown
"""
import jieba.posseg as pseg
import numpy as np


# This method converts a txt file into a two-dimensional list.
# The sub-list represents a sentence. The elements of the sub-list are words.
# The result is used as the parameter of get_t_trans_asso_words ().

def txtToWords(txt, stopwords=None):
    """Txt text word segmentation into two-dimensional array words
    Keyword arguments:
    txt             --  txt-file address
    stopwords       --  stopwords-file addresses
    """
    # read the file
    fname = txt
    f = open(fname, 'r', encoding='utf-8')
    text = f.read()
    text = text.split('\n')
    stopword = [line.strip() for line in open(stopwords, encoding='utf-8').readlines()]
    # Text delimiters, separators are sentence separators
    seprators = '?!;？！。；…'
    for sep in seprators:
        res = []
        for sentence in text:
            res += (sentence.split(sep))
        text = res

    res = []
    for sentence in text:
        # Separate words
        sentence = pseg.cut(sentence)
        sentence = [w for w in sentence]
        # Remove leading and trailing spaces and non-morpheme characters
        sentence = [w.word.strip() for w in sentence if w.flag != 'x']
        # Remove empty characters
        sentence = [word for word in sentence if len(word) > 0]
        # Remove stop words
        if stopwords is not None:
            sentence = [w for w in sentence if w not in stopword]
        res.append(sentence)
    return res


def combine(word_list, window=2):
    """Constructs a combination of words under window, used to construct edges between words.
    Keyword arguments:
    word_list  --  list of str, a list of words.
    windows    --  int, window size.
    """
    if window < 2: window = 2
    for x in range(1, window):
        if x >= len(word_list):
            break
        word_list2 = word_list[x:]
        # Using the zip method, yield generates a pair of word edges
        res = zip(word_list, word_list2)
        for r in res:
            yield r


def get_asso_words(txt, stopwords, w, window=2, t=2, s=0.5, m=10):
    """Main method for getting keywords
    Keyword arguments:
    txt             --  txt-file address
    stopwords       --  stopwords-file address
    word            --  the keyword to query
    window          --  adjacent window words in a sentence, considered edged
    t               --  set number of transition steps
    s               --  set self-transition probability
    m               --  the number of related words you want to get

    """
    words = txtToWords(txt, stopwords)
    result_words = []
    # Subscript dictionary from words
    word_index = {}
    # Dictionary of Words from Subscripts
    index_word = {}
    words_number = 0

    # The following will count all words in the words list into the VSM (Vector Space Model),
    # and provide word to subscript and subscript to word dictionaries to facilitate subsequent search.
    for word_list in words:
        for word in word_list:
            if not word in word_index:
                word_index[word] = words_number
                index_word[words_number] = word
                words_number += 1

    # The following creates an undirected weight graph based on the position information of each word
    graph = np.zeros((words_number, words_number))
    w_index = word_index.get(w)

    # If two words appear in the same sentence and match the window size relationship,
    # an edge is established between them and stored in the graph.
    for word_list in words:
        for w1, w2 in combine(word_list, window):
            if w1 in word_index and w2 in word_index:
                index1 = word_index[w1]
                index2 = word_index[w2]
                graph[index1][index2] += 1.0
                graph[index2][index1] += 1.0

    # Next, a 1-step transition probability matrix between nodes is established based on the graph obtained earlier.
    trans_g = np.zeros((words_number, words_number))
    for i in range(words_number):
        sum_i = np.sum(graph[i])
        if sum_i == 0:
            sum_i = 1
        trans_g[i][i] = s
        for j in range(words_number):
            if j != i:
                trans_g[i][j] = (1 - s) * (graph[i][j] / float(sum_i))
    trans_mat = np.mat(trans_g)
    # Transition probability matrix from 1 step
    t_trans_mat = trans_mat ** t

    # Get the index of the first m related words in the t-step transition probability matrix,
    # then find the words in the index_word dictionary, store them in result_words and return
    w_prob = np.array(t_trans_mat[w_index])
    w_prob_rank = np.argsort(-w_prob)
    import logging
    for i in range(m):
        try:
            result_words.append(index_word[w_prob_rank[0][i + 1]])
        except Exception as e:
            if not result_words:
                print('no word related to ' + w + 'in this page')
                logging.log(1, 'no word related to ' + w + 'in this page', e)
    return result_words
