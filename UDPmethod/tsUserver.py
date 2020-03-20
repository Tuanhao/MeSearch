from socket import *
from time import ctime

HOST = ''
PORT = 23567
BUFSIZE = 1024
ADDR = (HOST,PORT)

udpSerSock = socket(AF_INET,SOCK_DGRAM)
udpSerSock.bind(ADDR)

def udpreceive(host, port):
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
    
    
while True:
    udpreceive(" ",23567)
