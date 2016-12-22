/*global d3:true */
/*global console:true */


var selectedSkater = "EvanSmith";
var skaterIndex = [3];
var skaterString = "Evan Smith";

// D3
function fixMiCharts(){

  var svgtest = d3.select("#mainbarchart").select("svg");
  var svgtest2 = d3.select("#sidechart").select("svg");
  if (!svgtest.empty() || !svgtest2.empty()){
    svgtest.remove();
    svgtest2.remove();
  }

  d3.csv("data/runandgun.csv")
  .row(function(d){ return {skater:d.skater, stance:d.stance, dismounts:d.dismounts, timeBetweenTricks:d.timeBetweenTricks.split(","), tricks:d.tricks.split(" || ")  }; })
  .get(function(error, data){

    // tricks & timeBetweenTricks arrays are equal in length
    for (var i=0; i<data.length; i++){
      if (data[i].timeBetweenTricks.length !== data[i].tricks.length) {
        console.log(data[i].skater+" is fucked up. # Timestamps: " + data[i].timeBetweenTricks.length +" # Tricks: "+ data[i].tricks.length);
      }
      else {
        console.log("every trick has a timestamp, noice!");
      }
    }

    //**************************************************************//
    //**************************************************************//
    //**************************************************************//
    //**************************************************************//
    //**************************************************************//
    // BAR CHART - NUMBER OF TRICKS

    // define the size of the chart
    var width= document.getElementById('mainbarchart').offsetWidth;

    // get the max values for the domain
    var maxTricks = d3.max(data, function(d){ return d.tricks.length; });

    // set the margin
    var margin = {left: 130, right: 8, top: 10, bottom: 0};
    var rainbow = d3.scaleSequential(d3.interpolateViridis).domain([0,10]);  // set the colour scale

    // set a scale for the x-axis
    var x = d3.scaleLinear().domain([0,maxTricks]).range([0,width-margin.right-margin.left]);

    // create the axis
    var xAxis = d3.axisBottom(x);

    // start drawing the chart (aka create the svg)
    var mainBarChart = d3.select("#mainbarchart").append("svg").attr("height","100%").attr("width","100%");

    // great a group for the chart
    var barChartGroup = mainBarChart.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

    data.forEach(function(d){

      barChartGroup.append("text")
          .attr("class", "line-label")
          .attr("id", d.skater.replace(/ /g,''))
          .attr("y",8+data.indexOf(d)*35)
          .attr("x",-110)
          .transition().ease(d3.easeCubic).duration(1000).delay(150)
          .attr("x",-130)
          .attr("class","skater")
          .attr("color", rainbow(data.indexOf(d)))
          .text(d.skater);

      barChartGroup.append("rect")
          .attr("class", "rect")
          .attr("y",data.indexOf(d)*35)
          .attr("x","0")
          .attr("height","5")
          .transition().ease(d3.easeCubic).duration(1000).delay(150)
          .attr("width",(d.tricks.length/maxTricks)*(width-margin.right-margin.left))
          .attr("fill", rainbow(data.indexOf(d)));


    });
    //
    barChartGroup.append("g").attr("class","x axis").attr("transform","translate(0,"+380+")").call(xAxis);





    //**************************************************************//
    //**************************************************************//
    //**************************************************************//
    //**************************************************************//
    //**************************************************************//
    // PIE CHART
    var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
    var donutChart = d3.select("#sidechart").append("svg"),
    dcwidth = document.getElementById('sidechart').offsetWidth,
    dcheight = document.getElementById('sidechart').offsetHeight,
    g = donutChart.append("g").attr("transform", "translate(" + dcwidth / 1.9 + "," + dcheight / 2 + ")");

    // An arc function with all values bound except the endAngle. So, to compute an
    // SVG path string for a given angle, we pass an object with an endAngle
    // property to the `arc` function, and it will return the corresponding string.
    var arc = d3.arc()
    .innerRadius(dcwidth/3.1)
    .outerRadius((dcwidth/3.1)+10)
    .startAngle(0);

    donutChart.append("text")
    .attr("class", "line-label")
    .attr("y",dcheight / 1.78)
    .attr("x",dcwidth / 2.53)
    .style("stroke", "green", "text-align","center")
    .text("seconds");


    donutChart.append("text")
    .attr("class", "line-label")
    .attr("y",dcheight / 2)
    .attr("x",dcwidth / 2.3)
    .style("font-size", "36px")
    .text(Math.round(d3.sum(data[skaterIndex].timeBetweenTricks)+1.5));

    // Add the background arc, from 0 to 100% (tau).
    g.append("path")
        .datum({endAngle: tau})
        .style("fill", "#ddd")
        .attr("d", arc);

    // Add the foreground arc in orange, currently showing 12.7%.
    var foreground = g.append("path")
    .style("fill", "#44bf70")
    .datum({endAngle: 0 })
    .attr("d", arc);


    // Every so often, start a transition to a new random angle. The attrTween
    // definition is encapsulated in a separate function (a closure) below.


    d3.select("#mainbarchart text").on("click", function(){
      if (selectedSkater === this.id) {
        // do nothing
        console.log("fuck");
      } else {
        // select the Global set skater and set the class
        selectedSkater = this.id;
        // get index of selected skater
        skaterString = selectedSkater.split(/(?=[A-Z])/).join(" ");
        skaterIndex = data.map(function(x) {return x.skater; }).indexOf(skaterString);
        // remove selected class
        $("#mainbarchart").find(".selected").removeClass("selected");
        // apply new class to select skater
        $(this).addClass("selected");
        console.log(selectedSkater.split(/(?=[A-Z])/).join(" ")+" is currently selected");
        console.log("time between tricks: "+d3.sum(data[skaterIndex].timeBetweenTricks));
      }

      foreground.transition()
      .duration(750)
      .attrTween("d", arcTween(Math.round((d3.sum(data[skaterIndex].timeBetweenTricks)+1.5)/9.549296586)));
    });

    // Returns a tween for a transition’s "d" attribute, transitioning any selected
    // arcs from their current angle to the specified new angle.
    function arcTween(newAngle) {

      // The function passed to attrTween is invoked for each selected element when
      // the transition starts, and for each element returns the interpolator to use
      // over the course of transition. This function is thus responsible for
      // determining the starting angle of the transition (which is pulled from the
      // element’s bound datum, d.endAngle), and the ending angle (simply the
      // newAngle argument to the enclosing function).
      return function(d) {

        // To interpolate between the two angles, we use the default d3.interpolate.
        // (Internally, this maps to d3.interpolateNumber, since both of the
        // arguments to d3.interpolate are numbers.) The returned function takes a
        // single argument t and returns a number between the starting angle and the
        // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
        // newAngle; and for 0 < t < 1 it returns an angle in-between.
        var interpolate = d3.interpolate(d.endAngle, newAngle);

        // The return value of the attrTween is also a function: the function that
        // we want to run for each tick of the transition. Because we used
        // attrTween("d"), the return value of this last function will be set to the
        // "d" attribute at every tick. (It’s also possible to use transition.tween
        // to run arbitrary code for every tick, say if you want to set multiple
        // attributes from a single function.) The argument t ranges from 0, at the
        // start of the transition, to 1, at the end.
        return function(t) {

          // Calculate the current arc angle based on the transition time, t. Since
          // the t for the transition and the t for the interpolate both range from
          // 0 to 1, we can pass t directly to the interpolator.
          //
          // Note that the interpolated angle is written into the element’s bound
          // data object! This is important: it means that if the transition were
          // interrupted, the data bound to the element would still be consistent
          // with its appearance. Whenever we start a new arc transition, the
          // correct starting angle can be inferred from the data.
          d.endAngle = interpolate(t);

          // Lastly, compute the arc path given the updated data! In effect, this
          // transition uses data-space interpolation: the data is interpolated
          // (that is, the end angle) rather than the path string itself.
          // Interpolating the angles in polar coordinates, rather than the raw path
          // string, produces valid intermediate arcs during the transition.
          return arc(d);
            };
          };
        }

  });
}

d3.select(window).on("resize",fixMiCharts);
fixMiCharts();


// $(function() {
//   $("#mainbarchart text").on("click", function(){
//     if (selectedSkater == this.id) {
//       // do nothing
//       console.log("fuck");
//     } else {
//       // select the Global set skater and set the class
//       selectedSkater = this.id;
//       // get index of selected skater
//       skaterString = selectedSkater.split(/(?=[A-Z])/).join(" ");
//       skaterIndex = data.map(function(x) {return x.skater; }).indexOf(skaterString);
//       // remove selected class
//       $("#mainbarchart").find(".selected").removeClass("selected");
//       // apply new class to select skater
//       $(this).addClass("selected");
//       console.log(selectedSkater.split(/(?=[A-Z])/).join(" ")+" is currently selected");
//       console.log("time between tricks: "+d3.sum(data[skaterIndex].timeBetweenTricks));
//     }
//   });
// });
