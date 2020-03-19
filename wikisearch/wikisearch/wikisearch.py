# Author: Zhi Qiao
# 2/21/2020
import keysearch
import nltk as nl
import sys


def selectnoun(wordlist, occurencelist):
    selective_pos = ['NN']
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


def printlists(wl, ol):
    for k in range(len(wl)):
        print("No." + str(k) + "  word: " + wl[k] + "  occurence: " + str(ol[k]))


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


def topfive(wordlist):
    top5 = wordlist[:5]
    return top5


def related(wordlist):
    clist = []
    flist = []
    olist = []
    wordlist.append("exit")
    for i in range(len(wordlist)):
        var = wordlist[i]
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

            # check whether it is a noun
            # print(flist)
            # print(olist)
            # selective_pos = ['NN', 'NNS', 'NNP']
            # selective_pos_words = []
            # selective_pos_words_occ = []
            # for i in range(len(flist)):
            # word_tokens = nl.word_tokenize(flist[i])
            # pos = nl.pos_tag(word_tokens)
            # for word, tag in pos:
            # if tag in selective_pos:
            # selective_pos_words.append(word)
            # selective_pos_words_occ.append(olist[i])
            # print("selective_pos_words")
            # print(selective_pos_words)
            # print(selective_pos_words_occ)

            # print the filtered list
            selective_pos_words, selective_pos_words_occ = selectnoun(flist, olist)
            rearrange(selective_pos_words, selective_pos_words_occ)
            print("after filtered, only " + str(len(selective_pos_words)) + " to be used")
            print("\nprint list")
            printlists(selective_pos_words, selective_pos_words_occ)
            top5 = topfive(selective_pos_words)
            return top5

        wlist = keysearch.wikisearch(var)

        for i in range(len(wlist)):
            word = wlist[i]
            # collecting to clist
            clist.append(word)

        # print(clist)


def run(argv):
    words = sys.argv[1:]
    ##print(words)

    #words = ['Carleton', 'nfl']
    rel = related(words)
    print("\nprint top 5 items in list\n")
    print(rel)


if __name__ == '__main__':
    run(sys.argv[1:])
