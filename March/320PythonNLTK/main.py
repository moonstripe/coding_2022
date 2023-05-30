import nltk

tokens = nltk.word_tokenize("Kojin gave Hannah $2000")

print(tokens)

print("Parts of Speech: ", nltk.pos_tag(tokens))

