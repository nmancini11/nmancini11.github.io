function type(t){return t.total=d3.sum(groups,function(a){return t[a]=+t[a]}),t}var dispatch=d3.dispatch("load","statechange"),groups=["Under 5 Years","5 to 13 Years","14 to 17 Years","18 to 24 Years","25 to 44 Years","45 to 64 Years","65 Years and Over"];d3.csv("/data/runandgun.csv",type,function(t,a){if(t)throw t;var e=d3.map();a.forEach(function(t){e.set(t.skater,t)}),dispatch.call("load",this,e),dispatch.call("statechange",this,e.get("Nyjah Huston"))}),dispatch.on("load.menu",function(t){var a=d3.select("body").append("div").append("select").on("change",function(){dispatch.call("statechange",this,t.get(this.value))});a.selectAll("option").data(t.values()).enter().append("option").attr("value",function(t){return t.skater}).text(function(t){return t.skater}),dispatch.on("statechange.menu",function(t){a.property("value",t.skater)})}),dispatch.on("load.bar",function(t){var a={top:20,right:20,bottom:30,left:40},e=80-a.left-a.right,n=460-a.top-a.bottom,r=d3.max(t.values(),function(t){return t.tricks.split(" || ").length}),s=d3.scaleLinear().domain([0,r]).rangeRound([n,0]).nice(),i=d3.axisLeft(s),o=d3.select("body").append("svg").attr("width",e+a.left+a.right).attr("height",n+a.top+a.bottom).append("g").attr("transform","translate("+a.left+","+a.top+")");o.append("g").attr("class","y axis").call(i);var c=o.append("rect").attr("x",4).attr("width",e-4).attr("y",n).attr("height",0).style("fill","#aaa");dispatch.on("statechange.bar",function(t){c.transition().attr("y",s(t.tricks.split(" || ").length)).attr("height",s(0)-s(t.tricks.split(" || ").length))})}),dispatch.on("load.pie",function(t){var a=880,e=460,n=Math.min(a,e)/2,r=d3.scaleOrdinal().domain(groups).range(["#98abc5","#8a89a6","#7b6888","#6b486b","#a05d56","#d0743c","#ff8c00"]),s=d3.arc().outerRadius(n-10).innerRadius(n-70),i=d3.pie().sort(null),o=d3.select("body").append("svg").attr("width",a).attr("height",e).append("g").attr("transform","translate("+a/2+","+e/2+")"),c=o.selectAll("path").data(groups).enter().append("path").style("fill",r).each(function(){this._current={startAngle:0,endAngle:0}});dispatch.on("statechange.pie",function(t){c.data(i.value(function(a){return t[a]})(groups)).transition().attrTween("d",function(t){var a=d3.interpolate(this._current,t);return this._current=a(0),function(t){return s(a(t))}})})});