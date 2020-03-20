from socket import *
from time import ctime
from webcrawling import related as craw
from wikisearch import related as wiki
import re

HOST = ''
PORT = 23567
BUFSIZE = 1024
ADDR = (HOST, PORT)

udpSerSock = socket(AF_INET, SOCK_DGRAM)
udpSerSock.bind(ADDR)


def udpServer():
    print("...waiting for message...")
    data, ADDR = udpSerSock.recvfrom(BUFSIZE)
    word = data.decode()
    print("[%s]: From Address %s:%s receive data: %s" % (ctime(), ADDR[0], ADDR[1], data))
    word = word.split(",")

    flag = re.sub(r'[^a-zA-Z0-9 ]', "", word[0])
    raw = word[1:]

    data = []
    for w in raw:
        ww = re.sub(r'[^a-zA-Z0-9 ]', "", w)
        data.append(ww.strip(" "))
    print(word)
    print(flag)
    if flag == "wiki":
        list = wiki(data)
        sendData = bytes(list.__str__().encode())

    if flag == "craw":
        URL = raw[0].replace("'", '')
        print(URL)
        key = data[1:]
        print(key)
        list = craw(URL, key)
        sendData = bytes(list.__str__().encode())

    if sendData is not None:
        udpSerSock.sendto(sendData, ADDR)


while True:
    print('waiting for commands')
    udpServer()
