from socket import *
from time import ctime

HOST = ''
PORT = 23567
BUFSIZE = 1024
ADDR = (HOST, PORT)

udpCliSock = socket(AF_INET, SOCK_DGRAM)


def udpClient(wordlist, host, port):
    ADDR = (host, port)
    sendData = bytes(wordlist.__str__().encode())

    udpCliSock.sendto(sendData, ADDR)

    print("...waiting for response...")
    recv_data, ADDR = udpCliSock.recvfrom(BUFSIZE)
    if recv_data is not None:
        print("[%s]: receiving data from server %s:%s  :%s" % (ctime(), ADDR[0], ADDR[1], recv_data))


print('Test')
print('send flag and data')
## test user sign in
wordlist1 = ["sign", "Hao"]
udpClient(wordlist1, 'localhost', 23567)

##test user sign in status
wordlist2 = ["check"]
udpClient(wordlist2, 'localhost', 23567)

##test wikisearch
wordlist3 = ["wiki", "one", "punch"]
udpClient(wordlist3, 'localhost', 23567)

##test webcrawling
wordlist4 = ['craw', 'https://www.journaldev.com/23674/python-remove-character-from-string',
             'string', 'python']
udpClient(wordlist4, 'localhost', 23567)

##test invalid flag input
wordlist5 = ['like']
udpClient(wordlist5, 'localhost', 23567)

##test end flag
wordlist6 = ["end"]
udpClient(wordlist6, 'localhost', 23567)
