to use this project :

Windows:

1. install win64 python 3.7.4

2. cd to file located folder, example cd C:\Users\George\Desktop\AI

3. type in cmd: pip install -r requirement.txt

once finished,

for wikisearch:

	python wikisearch.py [wordlist] 

example:
	python wikisearch.py harry potter


for webcrawling:
	
	python webcrawling.py URL searchkey

example:
	python webcrawling.py URL searchkey https://medium.com/@boscacci/why-and-how-to-make-a-requirements-txt-f329c685181e pip
	
	

Linus:
Due to defalut nltk on Linus is leak of some files,
 type in cmd: 
 	pip install -r requirement.txt
	python -m nltk.downloader averaged_perceptron_tagger
	python -m nltk.downloader punkt
	python -m nltk.downloader stopwords
