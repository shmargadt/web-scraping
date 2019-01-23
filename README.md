# web-scraping-using-node-js
This code use Node.js and friends to perform a quick and effective web-scraping for single-page applications.

# Get started
1. npm install
2. `node index.js`


# Longest common substring problem
In computer science, the longest common substring problem is to find the longest string (or strings) that is a substring (or are substrings) of two or more strings.

## Pseudocode
The following pseudocode finds the set of longest common substrings between two strings with dynamic programming:

function LCSubstr(S[1..r], T[1..n])
    L := array(1..r, 1..n)
    z := 0
    ret := {}
    for i := 1..r
        for j := 1..n
            if S[i] == T[j]
                if i == 1 or j == 1
                    L[i,j] := 1
                else
                    L[i,j] := L[i-1,j-1] + 1
                if L[i,j] > z
                    z := L[i,j]
                    ret := {S[i-z+1..i]}
                else
                if L[i,j] == z
                    ret := ret ∪ {S[i-z+1..i]}
            else
                L[i,j] := 0
    return ret



## External links
- [The Algorithm from wikipedia](https://en.wikipedia.org/wiki/Longest_common_substring_problem)