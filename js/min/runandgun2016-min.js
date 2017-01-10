function fixMiCharts(){"use strict";var t=d3.select(".mallgrabs");d3.selectAll("#mainbarchart svg, #rundown svg, #sidechart svg, #trickstance svg").remove(),d3.selectAll("text").remove(),d3.selectAll("select").remove(),d3.selectAll(".select-style").remove(),d3.csv("/data/runandgun.csv",function(t,e){if(t)throw t;var a=d3.map();e.forEach(function(t){a.set(t.skater,t)}),dispatch.call("load",this,a),dispatch.call("statechange",this,a.get("Paul Rodriguez"))}),dispatch.on("load.menu",function(t){var e=d3.select("#mainbarchart").append("div").attr("class","select-style").append("select").on("change",function(){dispatch.call("statechange",this,t.get(this.value))});e.selectAll("option").data(t.values()).enter().append("option").attr("value",function(t){return t.skater}).text(function(t){return t.skater}),dispatch.on("statechange.menu",function(t){e.property("value",t.skater),selectedSkater=t.skater})}),dispatch.on("load.dismounts",function(){var t=d3.select("#dismount").append("text");dispatch.on("statechange.dismounts",function(e){t.text(e.dismounts)})}),dispatch.on("load.bar",function(t){var e={top:0,right:40,bottom:30,left:130},a=document.getElementById("mainbarchart").offsetWidth-e.left-e.right,n=375-e.top-e.bottom,r=d3.max(t.values(),function(t){return t.tricks.split(" || ").length}),s=d3.scaleLinear().domain([0,r]).rangeRound([0,a]).nice(),i=d3.axisBottom(s),l=d3.select("#mainbarchart").append("svg").attr("width",a+e.left+e.right).attr("height",n+e.top+e.bottom).append("g").attr("transform","translate("+e.left+","+e.top+")");l.append("g").attr("class","x axis").attr("transform","translate(0,355)").call(i);var o=0;for(var d in t)if(t.hasOwnProperty(d)){o++;var c=t[d];l.append("rect").attr("y",30*o).attr("height",5).attr("class",c.skater.replace(/ +/g,"")).transition().duration(1e3).delay(150).attr("width",s(c.tricks.split(" || ").length)).style("fill","#aaa"),l.append("text").attr("class","skater").attr("class",c.skater.replace(/ +/g,"")).attr("y",30*o+7).attr("x",-e.left).style("stroke","green","text-align","center").text(c.skater)}dispatch.on("statechange.bar",function(t){l.selectAll("rect").style("fill","#aaa"),l.selectAll("text").style("fill","#333").transition().duration(750).style("font-weight","normal"),l.select("rect."+t.skater.replace(/ +/g,"")).transition().duration(750).attr("width",s(t.tricks.split(" || ").length)).style("fill","#44bf70"),l.select("text."+t.skater.replace(/ +/g,"")).style("fill","#44bf70").transition().duration(750).style("font-weight","bold")})}),dispatch.on("load.trickstance",function(t){var e={top:0,right:20,bottom:30,left:75},a=document.getElementById("trickstance").offsetWidth-e.left-e.right,n=170-e.top-e.bottom,r=d3.max(t.values(),function(t){for(var e=t.tricks.split(" || "),a=[],n=0,r=0,s=0,i=0,l=0;l<e.length;l++){var o=e[l].split(" ");"Switch"===o[0]?r++:"Nollie"===o[0]?s++:"Fakie"===o[0]?n++:i++}return a.push(i,n,s,r),d3.max(a)}),s=d3.scaleLinear().domain([0,r]).rangeRound([0,a]).nice(),i=d3.axisBottom(s),l=d3.select("#trickstance").append("svg").attr("width",a+e.left+e.right).attr("height",n+e.top+e.bottom).append("g").attr("transform","translate("+e.left+",-7)");l.append("g").attr("class","x axis").attr("transform","translate(0,145)").call(i),dispatch.on("statechange.trickstance",function(t){l.selectAll("rect").remove();for(var a=t.tricks.split(" || "),n={regular:0,fakie:0,nollie:0,switch:0},i=0;i<a.length;i++){var o=a[i].split(" ");"Switch"===o[0]?n.switch++:"Nollie"===o[0]?n.nollie++:"Fakie"===o[0]?n.fakie++:n.regular++}var d=Object.keys(n).map(function(t){return n[t]});r=Math.max.apply(null,d);var c=0;for(var p in n)if(n.hasOwnProperty(p)){c++;var f=n[p];l.append("rect").attr("y",30*c).style("fill","#aaa").attr("height",5).transition().ease(d3.easeCubic).duration(1e3).delay(150).attr("width",s(f)),l.append("text").attr("y",30*c+7).attr("x",-e.left).style("text-transform","capitalize").style("font-weight","normal").style("font-size","16px").style("line-height","24px").text(p)}})}),dispatch.on("load.rundown",function(){var t={top:10,right:10,bottom:10,left:10},e=document.getElementById("rundown").offsetWidth-t.left-t.right,a=600-t.top-t.bottom,n=71;if($(window).width()<600)var r=d3.scaleLinear().domain([0,n]).rangeRound([0,a]).nice(),s=d3.axisRight(r).ticks(0);else var i=d3.scaleLinear().domain([0,n]).rangeRound([0,e]).nice(),l=d3.axisBottom(i).ticks(0);var o=d3.select(".rundown").append("svg").attr("width",e+t.left+t.right).attr("height",a+t.top+t.bottom).append("g").attr("transform","translate("+t.left+",10)");dispatch.on("statechange.rundown",function(t){o.selectAll("circle").remove(),o.selectAll("text").remove();var r=t.timeBetweenTricks.split(","),i=1.5,d=t.tricks.split(" || ");if(n=d3.sum(t.timeBetweenTricks.split(",")),console.log(n),$(window).width()<600){h=d3.scaleLinear().domain([0,n]).rangeRound([0,a]).nice(),s=d3.axisRight(h).ticks(0),o.append("g").attr("class","y axis").attr("transform","translate("+e/4+",0)").style("fill","#44bf70").call(s);for(var c=0;c<r.length;c++){i+=parseInt(r[c]);var p=20,f=e/4-20;o.append("circle").style("stroke","#ddd").style("fill","#ffffff").attr("transform","translate("+f+",0)").transition().duration(750).delay(150).attr("cy",h(i)).attr("cx","23").attr("r","8"),o.append("text").append("tspan").attr("y",h(i)+5).attr("transform","translate("+e/4+",0)").attr("x",f+40).style("opacity","0").transition().duration(750).delay(150).style("opacity","1").text(d[c]).attr("class","rundownTrick")}}else{p=d3.scaleLinear().domain([0,n]).rangeRound([0,e]).nice(),l=d3.axisBottom(p).ticks(0),o.append("g").attr("class","x axis").attr("transform","translate(0,20)").style("fill","#44bf70").call(l);for(var c=0;c<r.length;c++){i+=parseInt(r[c]);var h=20;h=1===Math.abs(c%2)?50:5,o.append("circle").style("stroke","#ddd").style("fill","#ffffff").transition().duration(750).delay(150).attr("cx",p(i)).attr("cy","23").attr("r","8"),o.append("text").append("tspan").attr("x",p(i)-15).attr("y",h).style("opacity","0").transition().duration(750).delay(150).style("opacity","1").text(d[c]).attr("class","rundownTrick")}}})}),dispatch.on("load.pie",function(){function t(t){return function(e){var a=d3.interpolate(e.endAngle,t);return function(t){return e.endAngle=a(t),i(e)}}}var e=2*Math.PI,a=d3.select("#sidechart").append("svg"),n=document.getElementById("sidechart").offsetWidth,r=document.getElementById("sidechart").offsetHeight,s=a.append("g").attr("transform","translate("+n/1.9+","+r/2+")");$(window).width()<900?(n/=1.35,r/=1.35,a.append("text").attr("class","line-label").attr("y",r/1.25).attr("x",n/1.73).style("stroke","green","text-align","center").text("seconds")):a.append("text").attr("class","line-label").attr("y",r/1.68).attr("x",n/2.43).style("stroke","green","text-align","center").text("seconds");var i=d3.arc().innerRadius(n/3.1).outerRadius(n/3.1+10).startAngle(0);s.append("path").datum({endAngle:e}).style("fill","#ddd").attr("d",i);var l=s.append("path").style("fill","#44bf70").datum({endAngle:0}).attr("d",i);dispatch.on("statechange.pie",function(s){var i=d3.sum(s.timeBetweenTricks.split(",")),o=t(i/(1.5*e));d3.selectAll(".second").remove(),$(window).width()<900?a.append("text").attr("class","line-label second").attr("y",r/1.5).attr("x",n/1.62).style("font-size","36px").text(Math.round(i)):a.append("text").attr("class","line-label second").attr("y",r/1.9).attr("x",n/2.25).style("font-size","36px").text(Math.round(i)),l.transition().duration(1500).ease(d3.easeExpInOut).attrTween("d",o)})})}var dispatch=d3.dispatch("load","statechange"),selectedSkater="Paul Rodgriguez";d3.select(window).on("resize",fixMiCharts),fixMiCharts();
