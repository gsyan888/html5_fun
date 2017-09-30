#!/usr/bin/env python
# -*- coding: UTF-8 -*-

"""Utilty to make index page
"""

import optparse
import subprocess
import os

compiledPath = 'html5_fun'

urlDict = {}
urlDict["html5_wheel"] = "http://gsyan888.blogspot.com/2017/09/html5-wheel.html"
urlDict["html5_spelling"] = "http://gsyan888.blogspot.com/2014/08/html5-spelling.html"
urlDict["html5_sentence"] = "http://gsyan888.blogspot.com/2014/07/html5-sentence.html"
urlDict["html5_phonetics_quiz"] = "http://gsyan888.blogspot.com/2014/02/html5-phoneticsquiz.html"
urlDict["html5_pk2"] = "http://gsyan888.blogspot.com/2013/12/html5-pk2.html"
urlDict["html5_ghost"] = "http://gsyan888.blogspot.com/2012/12/html5-ghost.html"
urlDict["html5_pk"] = "http://gsyan888.blogspot.com/2012/11/html5-pk.html"
urlDict["html5_lotto"] = "http://gsyan888.blogspot.com/2012/11/html5-lotto.html"


currentPath = os.getcwd();
parent_folder_name, current_folder_name = os.path.split(currentPath)
if current_folder_name == compiledPath :
    currentPath = os.path.join(currentPath, '..')

output_folder_name = os.path.join(currentPath, compiledPath) 
    

def make_index_page() :

    header = """<html>
<head>
<title>HTML5 FUN : gsyan : 雄</title>
<meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
<style>
h1 {
    text-align: center;
    color: #31B404;
  }
#css_table {
      display:table;
      width:100%
  }
.css_tr {
      display: table-row;
  }
.css_td {
      display: table-cell;
      border: 0px solid black;
      text-align:center;
      vertical-align:middle;
      height : 130pt;
  }
img {
	width: 60pt;
	height: 60pt;
  }
  
#url {
	color: #31B404;
	text-align:center;
	padding-top: 8pt;
  }
#url a:link, #url a:visited {
	color: #38610B;
  }
.source {
	font-size:8px;
  }
#archive {
    background-image:url(archives/icon-download.png);
    background-repeat: no-repeat;
    display:inline-block;
    text-indent:-9999px;
    margin: 0 auto;
    height:20px;
    width:20px;
}  
#none-archive {
    background-image:url(archives/icon-download.png);
    background-repeat: no-repeat;
    opacity: 0.3;
    display:inline-block;
    text-indent:-9999px;
    margin: 0 auto;
    height:20px;
    width:20px;
}  
#description {
    background-image:url(archives/icon-info.png);
    background-repeat: no-repeat;
    display:inline-block;
    margin: 0 auto;
    height:20px;
    width:20px;
}
#none-description {
    background-image:url(archives/icon-info.png);
    background-repeat: no-repeat;
    opacity: 0.3;
    display:inline-block;
    margin: 0 auto;
    height:20px;
    width:20px;
}
#icons {
    padding: 5px;
}  
</style>
</head>
<body>
<h1>HTML5 FUN BY GSYan</h1>
<hr size="1" width="95%" />
<div id="css_table">
"""
    footer ="""
<hr size="1" width="95%" />
<div id="url">Some HTML5 games created by LimeJS.<br /><a href="http://gsyan888.blogspot.com/">http://gsyan888.blogspot.com/</a></div>
</body>
</html>
"""
    outfilePath = os.path.join(output_folder_name, 'index.html')
    outfile = open(outfilePath, 'w')
    outfile.write( header )
    
    col_total = 5
    row = 0
    for d in os.listdir(output_folder_name) :
        pageFile = os.path.join(d, d + '.html')
        pageFilePath = os.path.join(currentPath, compiledPath, pageFile)        
        if os.path.exists(pageFilePath) :
            print pageFilePath
            if row > 0 and row%col_total == 0 :
                outfile.write( '</div><!--end of tr-->\n' )  #end of tr
            if row%col_total == 0 :
                outfile.write( '\n<div class="css_tr">\n\n' )
            outfile.write( '<div class="css_td">\n' )
            url = pageFile.replace(os.sep, '/')
            icon = os.path.join(d, 'assets', 'icon.png')
            iconPath = os.path.join(currentPath, compiledPath, icon)
            if os.path.exists(iconPath) :
                iconUrl = icon.replace(os.sep, '/')
                outfile.write( '<a href="'+ url + '" title="PLAY"><img src="'+iconUrl+'"></a>\n' )
            outfile.write( '<br /><a href="'+ url + '">'+d+'</a>\n' ) 
            outfile.write( '<div id="icons">\n' )
            archive = os.path.join("archives",d+".zip")
            archivePath = os.path.join(currentPath, compiledPath, archive)
            if os.path.exists(archivePath) :
                archiveUrl = archive.replace(os.sep, '/')
                outfile.write('<a href="' + archiveUrl + '" id="archive" title="Download"></a>' )
            else :
                outfile.write('<span id="none-archive"></span>' )
            outfile.write('\n');
            if d in urlDict :
                outfile.write('<a href="' + urlDict[d] +'" id="description" title="Description"></a>')
            else :
                outfile.write('<span id="none-description"></span>')
            outfile.write( '\n</div>\n' )   #end of icons
            outfile.write( '</div><!--end of td-->\n\n' )   #end of td
            row = row+1
    
    outfile.write( '</div><!--end of tr-->\n' )   #end of tr
    outfile.write( '</div><!--end of table-->\n' )   #end of table
    outfile.write( footer )    
    outfile.close()
    print 'Create index page : ' + outfilePath + '\n'

            
def main():
    """The entrypoint for this script."""
    
    make_index_page()

if __name__ == '__main__':
    main()