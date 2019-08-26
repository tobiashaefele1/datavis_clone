SHITLIST:
   + für excelinput - things that cant be in:
          - formulae
          - excel darstellung matters (decimals)
          - max length 60 characters (we cut)
          - idealerweise keine space oder äöü in col names
FOR SQL:
          - all exact inputs need ' ' around them, especially important for years, as for searching 2015 -> returns (2015, 2015-30) and similar; only searching for '2015' gives back correct value = 2015.
          - we take averages where we can; otherwise: arithmetic.

+ for DB: ctrl + J (alt + enter) line breaks will not work in col names . I have fixed this now in all excel and input sheets but this is something to rememebr as this means the averages and/or values will not be calculated correctly.
   


