function stanceDonutChart(t,a){function r(t){return t.count=+t.count,t}function e(t,a,r,e){var s;if(s=n(t,a,r,e)){var l=o(s);return l.startAngle=s.endAngle,l}if(s=i(t,a,r,e)){var l=o(s);return l.endAngle=s.startAngle,l}return null}function n(t,a,r,e){for(var n=a.length;--t>=0;)for(var i=e(r[t]),s=0;s<n;++s)if(e(a[s])===i)return a[s]}function i(t,a,r,e){for(var n=r.length,i=a.length;++t<n;)for(var s=e(r[t]),o=0;o<i;++o)if(e(a[o])===s)return a[o]}function s(t){var a=d3.interpolate(this._current,t);return this._current=a(0),function(t){return g(a(t))}}function o(t){var a={};for(var r in t)a[r]=t[r];return a}function l(a){function r(t){return t.data.stance}var n=y.selectAll("#"+t+" path"),i=n.data(),o=m(a.values);n=n.data(o,r),n.transition().duration(750).attrTween("d",s),n.enter().append("path").each(function(t,a){var n=e(a,i,o,r);n?(this._current=n,this._previous=n):this._current=t}).attr("fill",function(t,a){return h[a]}).attr("stroke","#fff").attr("stroke-width","4px").transition().duration(750).attrTween("d",s),n.exit().transition().duration(750).attrTween("d",function(t,a){var r=this._previous.data.stance,e=d3.interpolateObject(t,this._previous);return function(t){return g(e(t))}}).remove(),p=!1}var d={top:0,right:10,bottom:20,left:0},c=document.getElementById(t).offsetWidth-d.right-d.left,u=document.getElementById(t).offsetHeight-d.top-d.bottom,f=Math.min(c,u)/2,p=!0,h=["#9BCFE6","#0079B9","#A5E17F","#00A400"],m=d3.pie().value(function(t){return t.count}).sort(null),g=d3.arc().innerRadius(f-35).outerRadius(f-15),y=d3.select("#"+t).append("svg").attr("width",c).attr("height",u).append("g").attr("transform","translate("+c/2+","+u/2+")"),v=[];for(var k in a)if(a.hasOwnProperty(k)){var x={key:a[k].skater[0].name,values:[{count:a[k].regularTricks,skater:a[k].skater[0].name,stance:"Regular"},{count:a[k].fakieTricks,skater:a[k].skater[0].name,stance:"Fakie"},{count:a[k].switchTricks,skater:a[k].skater[0].name,stance:"Switch"},{count:a[k].nollieTricks,skater:a[k].skater[0].name,stance:"Nollie"}]};v.push(x)}var w=d3.select("form").selectAll("label").data(v).enter().append("label");w.append("input").attr("type","radio").attr("name","skater").attr("value",function(t){return t.key}).attr("id",function(t){return t.key.replace(/\s+/g,"").replace(/[^\w ]/,"")}).on("change",l).filter(function(t,a){return!a}).each(l).property("checked",!0),w.append("span").text(function(t){return t.key}),y.append("rect").attr("fill","#9BCFE6").attr("height",10).attr("width",10).attr("transform","translate(-35,-30)"),y.append("text").attr("transform","translate(-15,-20)").attr("fill","#111").text("Regular"),y.append("rect").attr("fill","#0079B9").attr("height",10).attr("width",10).attr("transform","translate(-35,-10)"),y.append("text").attr("transform","translate(-15,0)").attr("fill","#111").text("Fakie"),y.append("rect").attr("fill","#A5E17F").attr("height",10).attr("width",10).attr("transform","translate(-35,10)"),y.append("text").attr("transform","translate(-15,20)").attr("fill","#111").text("Switch"),y.append("rect").attr("fill","#00A400").attr("height",10).attr("width",10).attr("transform","translate(-35,30)"),y.append("text").attr("transform","translate(-15,40)").attr("fill","#111").text("Nollie")}function drawRunChart(t,a){console.log(a);var r=$("#"+t).width(),e=$("#"+t).height(),n=44,i=d3.scaleLinear().domain([0,44]).rangeRound([0,r]),s=d3.axisBottom(i).ticks(0),o=d3.select("#"+t).append("svg").attr("width",r).attr("height",e).append("g").attr("transform","translate(4,12)"),l=0,t=d3.select("body").append("div").attr("class","tooltip").style("opacity",0);for(var d in a){var c=a[d];i=d3.scaleLinear().domain([0,44]).rangeRound([0,r]).nice(),s=d3.axisBottom(i).ticks(0),o.append("g").attr("class","x axis").attr("transform","translate(0,"+20*l+")").attr("stroke","#fff").attr("stroke-width","7").style("fill","#50D1E3").call(s);for(var u=0;u<c["Run 1"].length;u++){var f=c["Run 1"][0].timestamp+44-c["Run 1"][u].timestamp-44;c["Run 1"][u].bail?o.append("polyline").attr("points","4,4 8,8 12,4 16,8 12,12 16,16 12,20 8,16 4,20 0,16 4,12 0,8 4,4").style("fill","#E36640").style("stroke","none").attr("transform","translate(0,"+(20*l-10)+")").transition().duration(750).delay(150).attr("transform","translate("+-(i(f)-15)+","+(20*l-7)+")"):o.append("circle").style("stroke","#none").style("fill","#fff").attr("stroke","#368195").attr("transform","translate(0,"+20*l+")").attr("cx",0).attr("cy","5").attr("r","5").on("mouseover",function(a){t.transition().duration(200).style("opacity",.9),t.html("<p>"+c["Run 1"][u].name+"</p>").style("left",d3.event.pageX-30+"px").style("top",d3.event.pageY-40+"px")}).on("mouseout",function(a){t.transition().duration(500).style("opacity",0)}).transition().duration(750).delay(150).attr("transform","translate("+-(i(f)-15)+","+20*l+")")}l+=1,o.append("g").attr("class","x axis").attr("transform","translate(0,"+20*l+")").attr("stroke","#fff").attr("stroke-width","7").style("fill","#50D1E3").call(s);for(var u=0;u<c["Run 2"].length;u++){var f=c["Run 2"][0].timestamp+44-c["Run 2"][u].timestamp-44;c["Run 2"][u].bail?o.append("polyline").attr("points","4,4 8,8 12,4 16,8 12,12 16,16 12,20 8,16 4,20 0,16 4,12 0,8 4,4").style("fill","#E36640").style("stroke","none").attr("transform","translate(0,"+(20*l-10)+")").transition().duration(750).delay(150).attr("transform","translate("+-(i(f)-15)+","+(20*l-7)+")"):o.append("circle").style("stroke","#none").style("fill","#fff").attr("stroke","#368195").attr("transform","translate(0,"+20*l+")").attr("cx",0).attr("cy","5").attr("r","5").on("mouseover",function(a){t.transition().duration(200).style("opacity",.9),t.html("<p>"+c["Run 2"][u].name+"</p>").style("left",d3.event.pageX-30+"px").style("top",d3.event.pageY-40+"px")}).on("mouseout",function(a){t.transition().duration(500).style("opacity",0)}).transition().duration(750).delay(150).attr("transform","translate("+-(i(f)-15)+","+20*l+")")}l+=2}}function consistencyChart(t,a){var r={top:0,right:0,bottom:20,left:40},e=d3.select("#"+t).append("svg"),n=document.getElementById(t).offsetWidth-r.right-r.left,i=document.getElementById(t).offsetHeight-r.top-r.bottom,s=d3.max(d3.entries(a),function(t){return t.value.makes+5}),o=d3.schemeCategory10;e.attr("height",i).attr("width",n);var l=d3.scaleLinear().domain([0,s]).range([0,n]),d=d3.scaleLinear().range([i+10,0]),c=d3.axisLeft().scale(d).tickFormat("").tickSize(0),u=1;for(var f in a)e.append("rect").attr("fill","#2ad76f").attr("height",4).attr("width",0).attr("transform","translate(0,"+10*u+")").transition().ease(d3.easeCubic).duration(1e3).delay(250).attr("width",function(){return l(a[f].makes)}),u+=.75,e.append("rect").attr("fill","#c12836").attr("class","bar").attr("height",4).attr("width",0).attr("transform","translate(0,"+10*u+")").transition().ease(d3.easeCubic).duration(1e3).delay(250).attr("width",function(){return l(a[f].bails)}),e.append("text").attr("fill","#333").attr("transform","translate(0,"+10*u+")").transition().ease(d3.easeCubic).duration(1e3).delay(250).attr("transform","translate("+(l(a[f].makes)+5)+","+(10*u+1)+")").text((a[f].makes/(a[f].makes+a[f].bails)*100).toFixed(2)+"%"),u+=3.5}var data;d3.json("../data/sls-munich-finals-trick-data.json",function(t,a){if(t)return console.warn(t);data=a,stanceDonutChart("stanceChart",a),consistencyChart("consistencyChart",a),console.log(a)}),d3.json("../data/sls-run-data.json",function(t,a){if(t)return console.warn(t);data=a,drawRunChart("runChart",a)});