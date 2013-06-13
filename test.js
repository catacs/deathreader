var urls = [
    "http://www.xataka.com/index.xml" ,
    "http://feeds2.feedburner.com/microsiervos",
    "http://feeds.weblogssl.com/genciencia"
]


parser = require('rssparser');
var options = {};
//rss feeds

for(var u=0;u<urls.length; u++) {
    parser.parseURL(urls[u], options, function(err, out){
       console.log(err);
        if(out != null && out != undefined) {
       // console.log(out);
        for(var i = 0; i<out.items.length; i++)
            console.log("Title"+u+"."+i+": "+out.items[i].title);
       }
    });
}
