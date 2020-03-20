# Author: Zhi Qiao
# 3/5/2020

import sys
import requests
from bs4 import BeautifulSoup
import extract
import nltk as nl
from stop_words import get_stop_words


def get_content(url):
    r = requests.get(url).content
    str_content = r.decode('utf-8')
    soup = BeautifulSoup(str_content, 'html.parser')
    content = soup.select('p')
    fp = open("contents.txt", "w", encoding='utf-8')
    # for c in content:
    fp.write(soup.__str__())
    fp.close()


def selectnoun(wordlist):
    selective_pos = ['NN', 'NNP']
    selective_pos_words = []
    for i in range(len(wordlist)):
        word_tokens = nl.word_tokenize(wordlist[i])
        pos = nl.pos_tag(word_tokens)
        for word, tag in pos:
            if tag in selective_pos:
                selective_pos_words.append(word)
    return selective_pos_words


stop_words = get_stop_words('en')
common_wikipage_words = ['page', 'find', 'servers', 'mean', 'alternatively', 'can', 'visit', 'main', 'read',
                         'information', 'type', 'error', "use", "build", "name", "work", "top", "s", "th", "since",
                         "many", 'act', 'time', "human", 'year', 'include', 'however', 'world', 'prey','tag','al','quot',
                         'b','js','ss','alt','meta','po','x','y','z','view','title','div','datatype','img']
discarded_words = stop_words + common_wikipage_words


def remove_stop_words(list):
    temp_list = []
    for key in list:
        if key not in discarded_words:
            temp_list.append(key)
    return temp_list


def key_search(url, input):
    get_content(url)
    asso_result = extract.get_asso_words('contents.txt', 'stopwords.txt', input, m=50)
    flist = remove_stop_words(asso_result)
    return flist


def run(argv):
    words = sys.argv[1:]
    ht = words[0]
    w = words[1]
    HTML = 'https://www.usatoday.com/story/news/2020/03/03/coronavirus-global-developments/4936938002/'
    word = 'Coronavirus'
    list = key_search(ht,w)
    print(list)
    rlist = selectnoun(list)
    for w in rlist:
        print(w)


if __name__ == '__main__':
    run(sys.argv[1:])
