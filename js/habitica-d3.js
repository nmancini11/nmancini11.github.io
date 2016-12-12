d3.csv("/csv/data.csv").get(function(error, data){
console.log(data);

});

// var dataArray = [25,27,29,34,45,67,78,89,92,108,115,127,134];
// var dataYears = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012'];
//
// var parseDate = d3.timeParse("%Y");
//
// var height = 200;
// var width = 700;
//
// var margin = {left:50,right:50,top:40,bottom:0}
//
// var y = d3.scaleLinear()
//             .domain([0,d3.max(dataArray)])
//             .range([height,0]);
// var x = d3.scaleTime()
//             .domain(d3.extent(dataYears, function(d){ return parseDate(d);}))
//             .range([0, width]);
//
// var yAxis = d3.axisLeft(y).ticks(3).tickPadding(10);
// var xAxis = d3.axisBottom(x);
//
// var area = d3.area()
//               .x(function(d,i) { return x(parseDate(dataYears[i]));})
//               .y0(height)
//               .y1(function(d){ return y(d); });
//
// var svg = d3.select(".personal-data").append("svg").attr("height","100%").attr("width","100%");
// var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");
//
// chartGroup.append("path").attr("d", area(dataArray));
// chartGroup.append("g").attr("class", "axis y").call(yAxis);
// chartGroup.append("g").attr("class", "axis x").attr("transform","translate(0,"+height+")").call(xAxis);

// Line chart with no access
// var dataArray = [{x:0, y:15},{x:25, y:25},{x:50, y:5},{x:75, y:35},{x:100, y:55},{x:125, y:15}];
// var interpolateTypes = [d3.curveLinear, d3.curveNatural, d3.curveStep, d3.curveBasis, d3.curveBundle, d3.curveCardinal]
//
// for (var p=0; p<6; p++){
//     var svg = d3.select(".personal-data").append("svg").attr("height","100%").attr("width","100%");
//
//     // create the line
//     var line = d3.line()
//                     .x(function(d,i){ return d.x*6; })
//                     .y(function(d,i){ return d.y*4; })
//                     .curve(d3.curveCardinal);
//
//     var shiftX = p*250;
//
//     // create a group for the lines
//     var chartGroup = svg.append("g").attr("transform","translate(0,0)");
//
//     // add the line to the svg
//     chartGroup.append("path")
//           .attr("fill","none")
//           .attr("stroke","blue")
//           .attr("d",line(dataArray));
//
//     // add circles to the line on the svg
//     chartGroup.selectAll("circle.group"+p)
//         .data(dataArray)
//         .enter().append("circle")
//                     .attr("class",function(d,i){ return "group"+i })
//                     .attr("cx", function(d,i){ return d.x*6; })
//                     .attr("cy", function(d,i){ return d.y*4; })
//                     .attr("r","2");
//     }

// Earlier Lessons
// var dataArray = [5,11,18];
//
// var svg = d3.select(".personal-data").append("svg").attr("height","100%").attr("width","100%");
//
// svg.selectAll("rect")
//   .data(dataArray)
//   .enter().append("rect")
//     // d - data || i - index of data array
//     .attr("height",function(d,i){ return d*15; })
//     .attr("width","50")
//     .attr("x",function(d,i){ return i*60;})
//     .attr("y",function(d,i){ return 300-(d*15) });
//
// var newX = 300;
//
// svg.selectAll("circle.first")
//   .data(dataArray)
//   .enter().append("circle")
//     .attr("class","first")
//     .attr("cx",function(d,i){ newX +=(d*3)+(i*20); return newX;})
//     .attr("cy","100")
//     .attr("r",function(d){ return d*3 });
//
// var newX = 600;
// svg.selectAll("ellipse")
//   .data(dataArray)
//   .enter().append("ellipse")
//     .attr("class","second")
//     .attr("cx",function(d,i){ newX +=(d*3)+(i*20); return newX;})
//     .attr("cy","100")
//     .attr("rx",function(d){ return d*3 })
//     .attr("ry","30");
//
// var newX = 900;
// svg.selectAll("line")
//   .data(dataArray)
//   .enter().append("line")
//     .attr("x1", newX)
//     .attr("y1", function(d,i){ return 80+(i*20);})
//     .attr("x2", function(d){ return newX+(d*15);})
//     .attr("y2", function(d,i){ return 80+(i*20);})
//     .attr("stroke","blue")
//     .attr("stroke-width", "2");
