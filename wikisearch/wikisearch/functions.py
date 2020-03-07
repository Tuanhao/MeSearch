from bs4 import BeautifulSoup
import requests
import re
from stop_words import get_stop_words


# clean word with regex
def clean_word(word):
    cleaned_word = re.sub('[^A-Za-z]+', '', word)
    return cleaned_word


# get the words
def getWordList(url):
    word_list = []
    # taking web page data in xlml
    source_code = requests.get(url)
    plain_text = source_code.text
    soup = BeautifulSoup(plain_text, 'lxml')

    # finding paragraph text
    for text in soup.findAll('p'):
        if text.text:
            content = text.text
            words = content.lower().split()

        # each word in para
        for word in words:
            cleaned_word = clean_word(word)
            if len(cleaned_word) > 0:
                word_list.append(cleaned_word)
    return word_list


def createFrequencyTable(word_list):
    # word count
    word_count = {}
    for word in word_list:
        if word in word_count:
            word_count[word] += 1
        else:
            word_count[word] = 1
    return word_count


# remove stop words
stop_words = get_stop_words('en')
common_wikipage_words = ['page', 'find', 'servers', 'mean', 'alternatively', 'can', 'visit', 'main', 'read',
                         'information', 'type', 'error', "use", "build", "name", "work", "top", "s", "th", "since",
                         "many", 'act', 'time', "human", 'year', 'include', 'however', 'world', 'prey','tag','al','quot',
                         'b','js','ss','alt','meta','po','x','y','z','view','title','div']
discarded_words = stop_words + common_wikipage_words


def remove_stop_words(frequency_list):
    temp_list = []
    for key, value in frequency_list:
        if key not in discarded_words:
            temp_list.append([key, value])
    return temp_list
