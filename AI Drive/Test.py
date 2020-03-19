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

print('send flag and data')
wordlist = ["wiki", "one","punch"]
udpClient(wordlist, 'localhost', 23567)
wordlist2 = ['craw', 'https://www.journaldev.com/23674/python-remove-character-from-string','string','python']
udpClient(wordlist2, 'localhost', 23567)