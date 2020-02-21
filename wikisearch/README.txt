

to call wikisearch:
    import wikisearch
    create seach keyword list -> List[String]
    wikisearch.ralated(list)
    return a list for 5 items with highest occurence

example:
words = ["you", "shall", "not", "pass"]
rel = related(words)
print("\nprint top 5 items in list")
print(rel)

output: 
  print top 5 items in list
  ['film', 'song', 'found', 'series', 'season']
