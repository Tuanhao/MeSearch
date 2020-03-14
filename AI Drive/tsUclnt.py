from socket import *
from time import ctime

HOST = '192.168.56.1'
PORT = 23567
BUFSIZE = 1024
ADDR = (HOST,PORT)

udpCliSock = socket(AF_INET,SOCK_DGRAM)

def udprClient(wordlist, host, port):
    ADDR = (host,port)
    sendData = bytes(wordlist.__str__().encode())

    udpCliSock.sendto(sendData,ADDR) 
    
    print ("...waiting for response...")
    recv_data,ADDR = udpCliSock.recvfrom(BUFSIZE)
    if recv_data is not None:
        print ("[%s]: receiving data from server %s:%s  :%s" %(ctime(),ADDR[0],ADDR[1],recv_data))
    
def udpServer(host, port):
    HOST = host
    PORT = port
    ADDR = (host,port)
    print ("...waiting for message...")
    data,ADDR = udpSerSock.recvfrom(BUFSIZE)

    a = data.decode()

    print ("[%s]: From Address %s:%s receive data: %s" %(ctime(),ADDR[0],ADDR[1],data))
    
    a = a.split(",")
    for s in a:
        s.strip()
    print(a)
    
    sendData = bytes(("received ").encode())
    if sendData is not None:
        udpSerSock.sendto(sendData,ADDR)
    
    

wordlist = ['one','punch','man']
udprsend(wordlist,'192.168.56.1',23567)
wordlist2 = 'bat','man','DC'
udprsend(wordlist2,'192.168.56.1',23567)
