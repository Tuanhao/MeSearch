Author:Zhi Qiao
package: Keysearch

To call wikisearch:
    import wikisearch
    create seach keyword list -> List[String]
    wikisearch.ralated(list)
    return a list for 5 items with highest occurence

Python console example:
    words = ["you", "shall", "not", "pass"]
    rel = related(words)
    print("\nprint top 5 items in list")
    print(rel)

output: 
      print top 5 items in list
      ['film', 'song', 'found', 'series', 'season']
  
------------------------------------------------------------------------------------------------------------------  
  
Command line:  
    $: python wikisearch.py [list of search keyword]
 
Example:
    python wikisearch.py [NBA, kobe, lakers, basketball]

Output:
    print top 5 items in list
    ['team', 'game', 'nba', 'season', 'won']


