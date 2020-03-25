from socket import *
from time import ctime
from webcrawling import related as craw
from wikisearch import related as wiki
import re

HOST = ''
PORT = 23567
BUFSIZE = 1024
ADDR = (HOST, PORT)
User = None
ACflag = ['sign', 'check', 'wiki', 'craw', 'end']
totallist = []

udpSerSock = socket(AF_INET, SOCK_DGRAM)
udpSerSock.bind(ADDR)


def Interface():
    global User
    print("...waiting for user infor...")
    print("...waiting for message...")
    data, ADDR = udpSerSock.recvfrom(BUFSIZE)
    rword = data.decode()
    print("[%s]: From Address %s:%s receive data: %s" % (ctime(), ADDR[0], ADDR[1], data))
    word = rword.split(",")
    flag = re.sub(r'[^a-zA-Z0-9 ]', "", word[0])
    raw = word[1:]

    if flag in ACflag:
        print("processing " + flag)
    else:
        print('invalid flag')
        list = ['invalid']
        sendData = bytes(list.__str__().encode())

    data = []
    for w in raw:
        ww = re.sub(r'[^a-zA-Z0-9 ]', "", w)
        data.append(ww.strip(" "))

    if flag == "sign":
        User = raw[0].replace(']', '')
        list = ['User', 'is', User]
        sendData = bytes(list.__str__().encode())

    if flag == "check":
        print("current user is " + User)
        list = ['User', 'is', User]
        sendData = bytes(list.__str__().encode())

    if flag == "wiki":
        list = wiki(data)
        totallist.extend(list)
        sendData = bytes(list.__str__().encode())

    if flag == "craw":
        URL = raw[0].replace("'", '')
        print(URL)
        key = data[1:]
        print(key)
        list = craw(URL, key)
        totallist.extend(list)
        sendData = bytes(list.__str__().encode())

    if flag == "end":
        sendtotallist = totallist
        updateData = bytes(sendtotallist.__str__().encode())
        if updateData is not None:
            udpSerSock.sendto(updateData, ADDR)
        exit()

    if sendData is not None:
        udpSerSock.sendto(sendData, ADDR)


while True:
    print('waiting for commands')
    Interface()
