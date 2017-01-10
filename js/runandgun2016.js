/*global d3:true */
/*global console:true */

var dispatch = d3.dispatch("load", "statechange");
var selectedSkater = "Paul Rodgriguez";

function fixMiCharts() {
  "use strict";
  // remove all the old charts when browser resizes
  var mallgrabs = d3.select(".mallgrabs");

  // delete all SVG charts except that sweet mall grab icon
  d3.selectAll("#mainbarchart svg, #rundown svg, #sidechart svg, #trickstance svg").remove();
  d3.selectAll("text").remove();
  d3.selectAll("select").remove();
  d3.selectAll(".select-style").remove();

  d3.csv("/data/runandgun.csv", function(error, skaters) {
    "use strict";
    if (error) {
      throw error;
    }
    var skaterByName = d3.map();
    skaters.forEach(function(d) {
      skaterByName.set(d.skater, d);
    });
    dispatch.call("load", this, skaterByName);
    dispatch.call("statechange", this, skaterByName.get("Paul Rodriguez"));
  });

  // A drop-down menu for selecting a state; uses the "menu" namespace.
  dispatch.on("load.menu", function(skaterByName) {
    "use strict";
    var select = d3.select("#mainbarchart")
      .append("div").attr("class", "select-style")
      .append("select")
      .on("change", function() {
        dispatch.call("statechange", this, skaterByName.get(this.value));
      });

    select.selectAll("option")
      .data(skaterByName.values())
      .enter().append("option")
      .attr("value", function(d) {
        return d.skater;
      })
      .text(function(d) {
        return d.skater;
      });

    dispatch.on("statechange.menu", function(d) {
      select.property("value", d.skater);
      selectedSkater = d.skater;
    });
  });

  dispatch.on("load.dismounts", function() {
    "use strict";
    var dismounts = d3.select("#dismount").append("text");

    dispatch.on("statechange.dismounts", function(d) {
      dismounts.text(d.dismounts);
    });

  });

  // A bar chart to show total population; uses the "bar" namespace.
  dispatch.on("load.bar", function(skaterByName) {
    "use strict";
    var margin = {
        top: 0,
        right: 40,
        bottom: 30,
        left: 130
      },
      width = document.getElementById('mainbarchart').offsetWidth - margin.left - margin.right,
      height = 375 - margin.top - margin.bottom,
      max = d3.max(skaterByName.values(), function(d) {
        return d.tricks.split(" || ").length;
      });

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
      .attr("class", "x axis")
      .attr("transform", "translate(" + 0 + "," + 355 + ")")
      .call(xAxis);

    var iterator = 0;
    for (var key in skaterByName) {

      // skip loop if the property is from prototype
      if (!skaterByName.hasOwnProperty(key)) {
        continue;
      }

      iterator++;
      var obj = skaterByName[key];

      svg.append("rect")
        .attr("y", iterator * 30)
        .attr("height", 5)
        .attr("class", obj.skater.replace(/ +/g, ""))
        .transition().duration(1000).delay(150)
        .attr("width", x(obj.tricks.split(" || ").length))
        .style("fill", "#aaa");

      svg.append("text")
        .attr("class", "skater")
        .attr("class", obj.skater.replace(/ +/g, ""))
        .attr("stroke","#FFF")
        .attr("y", (iterator * 30) + 7)
        .attr("x", -(margin.left))
        .text(obj.skater);
    }

    dispatch.on("statechange.bar", function(d) {
      svg.selectAll("rect")
        .style("fill", "#aaa");

      svg.selectAll("text")
        .style("fill", "#333")
        .transition()
        .duration(750)
        .style("font-weight", "normal");

      svg.select("rect." + d.skater.replace(/ +/g, "")).transition()
        .duration(750)
        .attr("width", x(d.tricks.split(" || ").length))
        .style("fill", "#44bf70");

      svg.select("text." + d.skater.replace(/ +/g, ""))
        .style("fill", "#44bf70")
        .transition()
        .duration(750)
        .style("font-weight", "bold");

    });
  });

  dispatch.on("load.trickstance", function(skaterByName) {
    // load the bar chart
    "use strict";
    var margin = {
        top: 0,
        right: 20,
        bottom: 30,
        left: 75
      },
      width = document.getElementById('trickstance').offsetWidth - margin.left - margin.right,
      height = 170 - margin.top - margin.bottom,
      // assign stance to each trick & get the 'stance' with the highest number of tricks
      max = d3.max(skaterByName.values(), function(d) {
        var trickSplit = d.tricks.split(" || "),
          trickArray = [],
          fakieStance = 0,
          switchStance = 0,
          nollieStance = 0,
          regularStance = 0;

        for (var i = 0; i < trickSplit.length; i++) {
          var trick = trickSplit[i].split(" ");
          if (trick[0] === "Switch") {
            switchStance++;
          } else if (trick[0] === "Nollie") {
            nollieStance++;
          } else if (trick[0] === "Fakie") {
            fakieStance++;
          } else {
            regularStance++;
          }
        }
        trickArray.push(regularStance, fakieStance, nollieStance, switchStance);

        return d3.max(trickArray);
      });

    var x = d3.scaleLinear()
      .domain([0, max])
      .rangeRound([0, width])
      .nice();

    var xAxis = d3.axisBottom(x);

    var svg = d3.select("#trickstance").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + "-7" + ")");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + 0 + "," + 145 + ")")
      .call(xAxis);

    dispatch.on("statechange.trickstance", function(d) {
      svg.selectAll("rect").remove();

      var trickArray = d.tricks.split(" || "),
        trickObj = {
          "regular": 0,
          "fakie": 0,
          "nollie": 0,
          "switch": 0
        };

      for (var i = 0; i < trickArray.length; i++) {
        var trick = trickArray[i].split(" ");
        if (trick[0] === "Switch") {
          trickObj.switch++;
        } else if (trick[0] === "Nollie") {
          trickObj.nollie++;
        } else if (trick[0] === "Fakie") {
          trickObj.fakie++;
        } else {
          trickObj.regular++;
        }
      }

      // find the most number of tricks / stance the apply the max
      var arr = Object.keys(trickObj).map(function(key) {
        return trickObj[key];
      });
      max = Math.max.apply(null, arr);

      var iterator = 0;
      for (var key in trickObj) {
        // skip loop if the property is from prototype
        if (!trickObj.hasOwnProperty(key)) {
          continue;
        }

        iterator++;
        var obj = trickObj[key];

        svg.append("rect")
          .attr("y", iterator * 30)
          .style("fill", "#aaa")
          .attr("height", 5)
          .transition().ease(d3.easeCubic).duration(1000).delay(150)
          .attr("width", x(obj));

        svg.append("text")
          .attr("y", (iterator * 30) + 7)
          .attr("x", -(margin.left))
          .style("text-transform", "capitalize")
          .style("font-weight", "normal")
          .style("font-size", "16px")
          .style("line-height", "24px")
          .text(key);
      }
    });
  });

  dispatch.on("load.rundown", function() {
    "use strict";
    var margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
      width = document.getElementById('rundown').offsetWidth - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom,
      max = 71;

    if ($(window).width() < 600 ) {
      var y = d3.scaleLinear()
        .domain([0, max])
        .rangeRound([0, height])
        .nice();

      var yAxis = d3.axisRight(y).ticks(0);
    } else {
      var x = d3.scaleLinear()
        .domain([0, max])
        .rangeRound([0, width])
        .nice();

      var xAxis = d3.axisBottom(x).ticks(0);
    }

    var svg = d3.select(".rundown").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + 10 + ")");

    dispatch.on("statechange.rundown", function(d) {
      svg.selectAll("circle").remove();
      svg.selectAll("text").remove();
      var runDuration = d.timeBetweenTricks.split(",");
      var runProgress = 1.5;
      var runTricks = d.tricks.split(" || ");
      max = d3.sum(d.timeBetweenTricks.split(","));
      console.log(max);

      if ($(window).width() < 600 ) {
        y = d3.scaleLinear()
          .domain([0, max])
          .rangeRound([0, height])
          .nice();

        yAxis = d3.axisRight(y).ticks(0);

        svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + width/4 + "," + 0 + ")")
          .style("fill", "#44bf70")
          .call(yAxis);

        for (var i = 0; i < runDuration.length; i++) {
          runProgress += parseInt(runDuration[i]);

          var x = 20;
          var centerCir = (width/4)-20;

          svg.append("circle")
            .style("stroke", "#ddd")
            .style("fill", "#ffffff")
            .attr("transform", "translate(" + centerCir + "," + 0 + ")")
            .transition()
            .duration(750)
            .delay(150)
            .attr("cy", y(runProgress))
            .attr("cx", "23")
            .attr("r", "8");

          svg.append("text").append("tspan")
            .attr("y", y(runProgress)+5)
            .attr("transform", "translate(" + width/4 + "," + 0 + ")")
            .attr("x", centerCir+40)
            .style("opacity", "0")
            .transition()
            .duration(750)
            .delay(150)
            .style("opacity", "1")
            .text(runTricks[i])
            .attr("class", "rundownTrick");
        }

      } else {
        x = d3.scaleLinear()
          .domain([0, max])
          .rangeRound([0, width])
          .nice();

        xAxis = d3.axisBottom(x).ticks(0);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(" + 0 + "," + 20 + ")")
          .style("fill", "#44bf70")
          .call(xAxis);

        for (var i = 0; i < runDuration.length; i++) {
          runProgress += parseInt(runDuration[i]);

          var y = 20;

          // if the i ODD or EVEN
          if (Math.abs(i % 2) === 1) {
            y = 50;
          } else {
            y = 5;
          }

          svg.append("circle")
            .style("stroke", "#ddd")
            .style("fill", "#ffffff")
            .transition()
            .duration(750)
            .delay(150)
            .attr("cx", x(runProgress))
            .attr("cy", "23")
            .attr("r", "8");

          svg.append("text").append("tspan")
            .attr("x", x(runProgress) - 15)
            .attr("y", y)
            .style("opacity", "0")
            .transition()
            .duration(750)
            .delay(150)
            .style("opacity", "1")
            .text(runTricks[i])
            .attr("class", "rundownTrick");
        }
      }

    });

  });

  //**************************************************************//
  //**************************************************************//
  //**************************************************************//
  //**************************************************************//
  //**************************************************************//
  // PIE CHART
  dispatch.on("load.pie", function() {
    "use strict";
    var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
    var donutChart = d3.select("#sidechart").append("svg"),
      dcwidth = document.getElementById('sidechart').offsetWidth,
      dcheight = document.getElementById('sidechart').offsetHeight,
      g = donutChart.append("g").attr("transform", "translate(" + dcwidth / 1.9 + "," + dcheight / 2 + ")");

      // make the radial chart smaller on smaller screens
      if ($(window).width() < 900 ) {
        dcwidth = dcwidth/1.35;
        dcheight = dcheight/1.35;

        donutChart.append("text")
          .attr("class", "line-label")
          .attr("y", dcheight / 1.25)
          .attr("x", dcwidth / 1.73)
          .text("seconds");
      } else {
        donutChart.append("text")
          .attr("class", "line-label")
          .attr("y", dcheight / 1.68)
          .attr("x", dcwidth / 2.43)
          .text("seconds");
      }


    // An arc function with all values bound except the endAngle. So, to compute an
    // SVG path string for a given angle, we pass an object with an endAngle
    // property to the `arc` function, and it will return the corresponding string.
    var arc = d3.arc()
      .innerRadius(dcwidth / 3.1)
      .outerRadius((dcwidth / 3.1) + 10)
      .startAngle(0);

    // Add the background arc, from 0 to 100% (tau).
    g.append("path")
      .datum({
        endAngle: tau
      })
      .style("fill", "#ddd")
      .attr("d", arc);

    // Add the foreground arc in orange, currently showing 12.7%.
    var foreground = g.append("path")
      .style("fill", "#44bf70")
      .datum({
        endAngle: 0
      })
      .attr("d", arc);

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

    // Every so often, start a transition to a new random angle. The attrTween
    // definition is encapsulated in a separate function (a closure) below.
    dispatch.on("statechange.pie", function(d) {
      var arcyArc = d3.sum(d.timeBetweenTricks.split(",")),
        cirDegrees = arcTween((arcyArc) / (1.5 * tau));

      d3.selectAll(".second").remove();


        if ($(window).width() < 900 ) {
          donutChart.append("text")
            .attr("class", "line-label second")
            .attr("y", dcheight / 1.5)
            .attr("x", dcwidth / 1.62)
            .style("font-size", "36px")
            .text(Math.round(arcyArc));
        } else {
          donutChart.append("text")
            .attr("class", "line-label second")
            .attr("y", dcheight / 1.9)
            .attr("x", dcwidth / 2.25)
            .style("font-size", "36px")
            .text(Math.round(arcyArc));
        }

      foreground.transition().duration(1500).ease(d3.easeExpInOut)
        .attrTween("d", cirDegrees);

      // console.log(d.skater+" run duration: "+arcyArc);
      // console.log("degrees: "+arcTween((arcyArc+1.5)/tau));
    });
  });
}

// redraw ze charts on window resize
d3.select(window).on("resize", function(){
  if($.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))) {
    // do nothing
  } else {
    return fixMiCharts();
  }
});
fixMiCharts();
