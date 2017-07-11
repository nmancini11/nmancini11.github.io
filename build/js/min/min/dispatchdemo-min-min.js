var dispatch=d3.dispatch("load","statechange"),selectedSkater="Paul Rodgriguez";d3.csv("/data/runandgun.csv",function(t,e){if(t)throw t;var a=d3.map();e.forEach(function(t){a.set(t.skater,t)}),dispatch.call("load",this,a),dispatch.call("statechange",this,a.get("Paul Rodriguez"))}),dispatch.on("load.menu",function(t){var e=d3.select("#mainbarchart").append("div").attr("class","select-style").append("select").on("change",function(){dispatch.call("statechange",this,t.get(this.value))});e.selectAll("option").data(t.values()).enter().append("option").attr("value",function(t){return t.skater}).text(function(t){return t.skater}),dispatch.on("statechange.menu",function(t){e.property("value",t.skater),selectedSkater=t.skater})}),dispatch.on("load.dismounts",function(){var t=d3.select("#dismount").append("text");dispatch.on("statechange.dismounts",function(e){t.text(e.dismounts)})}),dispatch.on("load.bar",function(t){var e={top:0,right:40,bottom:30,left:130},a=document.getElementById("mainbarchart").offsetWidth-e.left-e.right,n=375-e.top-e.bottom,r=d3.max(t.values(),function(t){return t.tricks.split(" || ").length}),s=d3.scaleLinear().domain([0,r]).rangeRound([0,a]).nice(),i=d3.axisBottom(s),l=d3.select("#mainbarchart").append("svg").attr("width",a+e.left+e.right).attr("height",n+e.top+e.bottom).append("g").attr("transform","translate("+e.left+","+e.top+")");l.append("g").attr("class","x axis").attr("transform","translate(0,355)").call(i);var o=0;for(var d in t)if(t.hasOwnProperty(d)){o++;var c=t[d];l.append("rect").attr("width",s(c.tricks.split(" || ").length)).attr("y",30*o).attr("height",5).attr("class",c.skater.replace(/ +/g,"")).transition().ease(d3.easeCubic).duration(1e3).delay(150).style("fill","#aaa"),l.append("text").attr("class","skater").attr("class",c.skater.replace(/ +/g,"")).attr("y",30*o+7).attr("x",-e.left).style("stroke","green","text-align","center").text(c.skater)}dispatch.on("statechange.bar",function(t){l.selectAll("rect").style("fill","#aaa"),l.selectAll("text").style("fill","#333").transition().duration(750).style("font-weight","normal"),l.select("rect."+t.skater.replace(/ +/g,"")).transition().duration(750).style("fill","#44bf70"),l.select("text."+t.skater.replace(/ +/g,"")).style("fill","#44bf70").transition().duration(750).style("font-weight","bold")})}),dispatch.on("load.trickstance",function(t){var e={top:0,right:20,bottom:30,left:75},a=document.getElementById("trickstance").offsetWidth-e.left-e.right,n=170-e.top-e.bottom,r=8,s=d3.scaleLinear().domain([0,8]).rangeRound([0,a]).nice(),i=d3.axisBottom(s),l=d3.select("#trickstance").append("svg").attr("width",a+e.left+e.right).attr("height",n+e.top+e.bottom).append("g").attr("transform","translate("+e.left+",-7)");l.append("g").attr("class","x axis").attr("transform","translate(0,145)").call(i),dispatch.on("statechange.trickstance",function(t){l.selectAll("rect").remove();for(var a=t.tricks.split(" || "),n={regular:0,fakie:0,nollie:0,switch:0},r=0;r<a.length;r++){var i=a[r].split(" ");"Switch"===i[0]?n.switch++:"Nollie"===i[0]?n.nollie++:"Fakie"===i[0]?n.fakie++:n.regular++}var o=0;for(var d in n)if(n.hasOwnProperty(d)){o++;var c=n[d];l.append("rect").attr("y",30*o).style("fill","#aaa").transition().ease(d3.easeCubic).duration(1e3).delay(150).attr("width",s(c)).attr("height",5),l.append("text").attr("y",30*o+7).attr("x",-e.left).style("text-transform","capitalize").style("font-weight","normal").style("font-size","16px").style("line-height","24px").text(d)}})}),dispatch.on("load.rundown",function(t){var e={top:70,right:10,bottom:70,left:10},a=document.getElementById("rundown").offsetWidth-e.left-e.right,n=70-e.top-e.bottom,r=71,s=d3.scaleLinear().domain([0,r]).rangeRound([0,a]).nice(),i=d3.axisBottom(s).ticks(0),l=d3.select(".rundown").append("svg").attr("width",a+e.left+e.right).attr("height",n+e.top+e.bottom).append("g").attr("transform","translate("+e.left+",10)");dispatch.on("statechange.rundown",function(t){l.selectAll("circle").remove(),l.selectAll("text").remove();var e=t.timeBetweenTricks.split(","),n=1.5,o=t.tricks.split(" || ");r=d3.sum(t.timeBetweenTricks.split(",")),console.log(r),s=d3.scaleLinear().domain([0,r]).rangeRound([0,a]).nice(),i=d3.axisBottom(s).ticks(0),l.append("g").attr("class","x axis").attr("transform","translate(0,20)").style("fill","#44bf70").call(i);for(var d=0;d<e.length;d++){n+=parseInt(e[d]);var c=20;c=1===Math.abs(d%2)?50:5,l.append("circle").style("stroke","#ddd").style("fill","#ffffff").transition().duration(750).delay(150).attr("cx",s(n)).attr("cy","23").attr("r","8"),l.append("text").append("tspan").attr("x",s(n)-15).attr("y",c).style("opacity","0").transition().duration(750).delay(150).style("opacity","1").text(o[d]).attr("class","rundownTrick")}})}),dispatch.on("load.pie",function(){function t(t){return function(e){var a=d3.interpolate(e.endAngle,t);return function(t){return e.endAngle=a(t),i(e)}}}var e=2*Math.PI,a=d3.select("#sidechart").append("svg"),n=document.getElementById("sidechart").offsetWidth,r=document.getElementById("sidechart").offsetHeight,s=a.append("g").attr("transform","translate("+n/1.9+","+r/2+")"),i=d3.arc().innerRadius(n/3.1).outerRadius(n/3.1+10).startAngle(0);a.append("text").attr("class","line-label").attr("y",r/1.68).attr("x",n/2.43).style("stroke","green","text-align","center").text("seconds"),s.append("path").datum({endAngle:e}).style("fill","#ddd").attr("d",i);var l=s.append("path").style("fill","#44bf70").datum({endAngle:0}).attr("d",i);dispatch.on("statechange.pie",function(s){var i=d3.sum(s.timeBetweenTricks.split(",")),o=t(i/(1.5*e));d3.selectAll(".second").remove(),a.append("text").attr("class","line-label second").attr("y",r/1.9).attr("x",n/2.25).style("font-size","36px").text(Math.round(i)),l.transition().duration(1500).ease(d3.easeExpInOut).attrTween("d",o)})});