/*!
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * v4.0.23-development - 2016-10-18
 *
 */!function(a,b,c){"use strict";var d=c.doc,e="#wb-srch-q",f=a(e),g=a("#"+f.attr("list")),h=function(b){b.length>0&&a(this).trigger({type:"ajax-fetch.wb",fetch:{url:c.pageUrlParts.protocol+"//clients1.google.com/complete/search?client=partner&sugexp=gsnos%2Cn%3D13&gs_rn=25&gs_ri=partner&partnerid="+window.encodeURIComponent("008724028898028201144:knjjdikrhq0+lang:"+c.lang)+"&types=t&ds=cse&cp=3&gs_id=b&hl="+c.lang+"&q="+encodeURI(b),dataType:"jsonp",jsonp:"callback"}})};d.on("change keyup",e,function(a){var b=a.target,c=a.target.value,d=a.which;switch(a.type){case"change":h.call(b,c);break;case"keyup":a.ctrlKey||a.altKey||a.metaKey||(32===d||d>47&&d<91||d>95&&d<112||d>159&&d<177||d>187&&d<223)&&h.call(b,c)}}),d.on("ajax-fetched.wb",e,function(a){var b,d,e=a.fetch.response[1],h=e.length,i="";for(g.empty(),b=0;b<h;b+=1)d=e[b],i+='<option label="'+d[0]+'" value="'+d[0]+'"></option>';c.ielt10&&(i="<select>"+i+"</select>"),g.append(i),f.trigger("wb-update.wb-datalist")}),window["wb-data-ajax"]={corsFallback:function(a){return a.url=a.url.replace(".html",".htmlp"),a}},a("[data-reveal]").change(function(){var b=a(this),c=b.attr("data-reveal");b.find(c);return b.is(":checked")?a(c).removeClass("hide"):a(c).addClass("hide")})}(jQuery,document,wb);