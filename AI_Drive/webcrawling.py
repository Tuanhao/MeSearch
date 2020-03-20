"""
Created on 3/5/2020

@author: Zhi Qiao
"""

import sys
import requests
from bs4 import BeautifulSoup
from nltk.corpus import stopwords

import extract
import nltk as nl
#from stop_words import get_stop_words


# get web content
def get_content(url):
    r = requests.get(url).content
    str_content = r.decode('utf-8')
    soup = BeautifulSoup(str_content, 'html.parser')
    # content = soup.select('p')
    fp = open("contents.txt", "w", encoding='utf-8')
    # for c in content:
    fp.write(soup.__str__())
    fp.close()


def selectnoun(wordlist, occurencelist):
    selective_pos = ['NN', 'NNP']
    selective_pos_words = []
    selective_pos_words_occ = []
    for i in range(len(wordlist)):
        word_tokens = nl.word_tokenize(wordlist[i])
        pos = nl.pos_tag(word_tokens)
        for word, tag in pos:
            if tag in selective_pos:
                selective_pos_words.append(word)
                selective_pos_words_occ.append(occurencelist[i])
    return selective_pos_words, selective_pos_words_occ


stop_words = set(stopwords.words('english'))
common_wikipage_words = ['page', 'find', 'servers', 'mean', 'alternatively', 'can', 'visit', 'main', 'read',
                         'information', 'type', 'error', "use", "build", "name", "work", "top", "s", "th", "since",
                         "many", 'act', 'time', "human", 'year', 'include', 'however', 'world', 'prey', 'tag', 'al',
                         'quot',
                         'b', 'js', 'ss', 'alt', 'meta', 'po', 'x', 'y', 'z', 'view', 'title', 'div', 'datatype', 'img',
                         'support', 'Yang', 'keyword']
for w in common_wikipage_words:
    stop_words.add(w)
discarded_words = stop_words


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


def rearrange(ke, oc):
    for i in range(len(oc)):
        for j in range(len(oc) - i):
            if oc[i] > oc[j]:
                temp = oc[j]
                wtemp = ke[j]
                oc[j] = oc[i]
                ke[j] = ke[i]
                oc[i] = temp
                ke[i] = wtemp


def printlists(wl, ol):
    for k in range(len(wl)):
        print("No." + str(k) + "  word: " + wl[k] + "  occurence: " + str(ol[k]))


def topfive(wordlist):
    top5 = wordlist[:5]
    return top5


def related(URL, keylist):
    clist = []
    flist = []
    olist = []
    keylist.append("exit")
    for i in range(len(keylist)):
        var = keylist[i]
        if var == "exit":
            print("there are " + str(len(clist)) + " keywords from privious search")
            # collect original keywords list
            for j in range(len(clist)):
                word = clist.__getitem__(j)
                occurence = clist.count(word)
                if flist.count(word) == 0:
                    flist.append(word)
                    olist.append(occurence)
                elif flist.count(word) != 0:
                    for z in range(len(flist)):
                        if word == flist[z]:
                            olist.pop(z)
                            olist.insert(z, occurence)
            # print the filtered list
            selective_pos_words, selective_pos_words_occ = selectnoun(flist, olist)
            rearrange(selective_pos_words, selective_pos_words_occ)
            print("after filtered, only " + str(len(selective_pos_words)) + " to be used")
            print("\nprint list")
            printlists(selective_pos_words, selective_pos_words_occ)
            top5 = topfive(selective_pos_words)
            keylist.pop(len(keylist) - 1)
            return top5

        wlist = key_search(URL, var)

        for i in range(len(wlist)):
            word = wlist[i]
            # collecting to clist
            clist.append(word)

        # print(clist)


def run(argv):
    words = sys.argv[1:]
    ht = words[0]
    w = words[1:]
    # HTML = 'https://www.usatoday.com/story/news/2020/03/03/coronavirus-global-developments/4936938002/'
    # word = 'Coronavirus'
    list = related(ht, w)
    print('related word list:')
    list.extend(w)
    print(list)


if __name__ == '__main__':
    run(sys.argv[1:])
