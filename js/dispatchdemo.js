/*global d3:true */
/*global console:true */

var dispatch = d3.dispatch("load", "statechange");

d3.csv("/data/runandgun.csv", function(error, skaters) {
  if (error) { throw error; }
  var skaterByName = d3.map();
  skaters.forEach(function(d) { skaterByName.set(d.skater, d); });
  dispatch.call("load", this, skaterByName);
  dispatch.call("statechange", this, skaterByName.get("Nyjah Huston"));
  console.log(skaters);
});



// A drop-down menu for selecting a state; uses the "menu" namespace.
dispatch.on("load.menu", function(skaterByName) {
  var select = d3.select("#mainbarchart")
    .append("div")
    .append("select")
      .on("change", function() { dispatch.call("statechange", this, skaterByName.get(this.value)); });

  select.selectAll("option")
      .data(skaterByName.values())
    .enter().append("option")
      .attr("value", function(d) { return d.skater; })
      .text(function(d) { return d.skater; });

  dispatch.on("statechange.menu", function(skater) {
    select.property("value", skater.skater);
  });
});

dispatch.on("load.dismounts", function(){
   var dismounts = d3.select("#dismount").append("text");

   dispatch.on("statechange.dismounts", function(d) {
     dismounts.text(d.dismounts);
   });

});

// A bar chart to show total population; uses the "bar" namespace.
dispatch.on("load.bar", function(skaterByName) {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = document.getElementById('mainbarchart').offsetWidth - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom,
      max = d3.max(skaterByName.values(), function(d) { return d.tricks.split(" || ").length; });

  var x = d3.scaleLinear()
      .domain([0, max])
      .rangeRound([0, width])
      .nice();

  var xAxis = d3.axisBottom(x);

  var svg = d3.select("#mainbarchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "y axis")
      .call(xAxis);

  var rect = svg.append("rect")
      .attr("x", 0)
      .attr("width", width)
      .attr("y", -5)
      .attr("height", 5)
      .style("fill", "#aaa");

  dispatch.on("statechange.bar", function(d) {
    rect.transition()
        .attr("x", 0)
        .attr("width", x(d.tricks.split(" || ").length) - x(0));
  });
});

//**************************************************************//
//**************************************************************//
//**************************************************************//
//**************************************************************//
//**************************************************************//
// PIE CHART
dispatch.on("load.pie", function() {
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
  dispatch.on("statechange.pie", function(d) {
    var arcyArc = d3.sum(d.timeBetweenTricks.split(",")),
        cirDegrees = arcTween((arcyArc)/(1.5*tau));

      d3.selectAll(".second").remove();

      donutChart.append("text")
            .attr("class", "line-label second")
            .attr("y",dcheight / 2)
            .attr("x",dcwidth / 2.3)
            .style("font-size", "36px")
            .text(Math.round(arcyArc));

      foreground.transition().duration(1500).ease(d3.easeExpInOut)
                    .attrTween("d", cirDegrees);

      console.log(d.skater+" run duration: "+arcyArc);
      console.log("degrees: "+arcTween((arcyArc+1.5)/tau));
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
