var data;

d3.json('../data/sls-munich-finals-trick-data.json', function(error, json) {
    if (error) return console.warn(error);
    data = json;

    stanceDonutChart('stanceChart', json);
    console.log(json);
});

// donut chart / stance chart
function stanceDonutChart(div, data) {
    var margin = {
        top: 0,
        right: 10,
        bottom: 20,
        left: 0
    };

    var width = document.getElementById(div).offsetWidth - margin.right - margin.left,
        height = document.getElementById(div).offsetHeight - margin.top - margin.bottom,
        radius = Math.min(width, height) / 2;

    var firstTime = true;

    var color = ["#9BCFE6", "#0079B9", "#A5E17F", "#00A400"];
    var pie = d3.pie()
        .value(function(d) {
            return d.count;
        })
        .sort(null);

    var arc = d3.arc()
        .innerRadius(radius - 35)
        .outerRadius(radius - 15);

    var svg = d3.select("#" + div).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var chartData = [];

    for (var key in data) {
        if (data.hasOwnProperty(key)) {

            var obj = {
                key: data[key].skater[0].name,
                values: [{
                        count: data[key].regularTricks,
                        skater: data[key].skater[0].name,
                        stance: "Regular"
                    },
                    {
                        count: data[key].fakieTricks,
                        skater: data[key].skater[0].name,
                        stance: "Fakie"
                    },
                    {
                        count: data[key].switchTricks,
                        skater: data[key].skater[0].name,
                        stance: "Switch"
                    },
                    {
                        count: data[key].nollieTricks,
                        skater: data[key].skater[0].name,
                        stance: "Nollie"
                    }
                ]
            };

            chartData.push(obj);
        }
    };

    // console.log(chartData);

    var label = d3.select("form").selectAll("label")
        .data(chartData)
        .enter().append("label");

    label.append("input")
        .attr("type", "radio")
        .attr("name", "skater")
        .attr("value", function(d) {
            return d.key;
        })
        .attr("id", function(d) {
            return d.key.replace(/\s+/g, '').replace(/[^\w ]/, '');
        })
        .on("change", change)
        .filter(function(d, i) {
            return !i;
        })
        .each(change)
        .property("checked", true);

    label.append("span")
        .text(function(d) {
            return d.key;
        });

    // add a legend
    svg.append("rect")
        .attr("fill", "#9BCFE6")
        .attr("height", 10)
        .attr("width", 10)
        .attr("transform", "translate(" + -35 + "," + -30 + ")");

    svg.append("text")
        .attr("transform", "translate(" + -15 + "," + -20 + ")")
        .attr("fill", "#111")
        .text("Regular");

    svg.append("rect")
        .attr("fill", "#0079B9")
        .attr("height", 10)
        .attr("width", 10)
        .attr("transform", "translate(" + -35 + "," + -10 + ")");

    svg.append("text")
        .attr("transform", "translate(" + -15 + "," + 0 + ")")
        .attr("fill", "#111")
        .text("Fakie");

    svg.append("rect")
        .attr("fill", "#A5E17F")
        .attr("height", 10)
        .attr("width", 10)
        .attr("transform", "translate(" + -35 + "," + 10 + ")");

    svg.append("text")
        .attr("transform", "translate(" + -15 + "," + 20 + ")")
        .attr("fill", "#111")
        .text("Switch");

    svg.append("rect")
        .attr("fill", "#00A400")
        .attr("height", 10)
        .attr("width", 10)
        .attr("transform", "translate(" + -35 + "," + 30 + ")");

    svg.append("text")
        .attr("transform", "translate(" + -15 + "," + 40 + ")")
        .attr("fill", "#111")
        .text("Nollie");

    function type(d) {
        d.count = +d.count;
        return d;
    }

    function findNeighborArc(i, data0, data1, key) {
        var d;
        if (d = findPreceding(i, data0, data1, key)) {
            var obj = cloneObj(d)
            obj.startAngle = d.endAngle;
            return obj;
        } else if (d = findFollowing(i, data0, data1, key)) {
            var obj = cloneObj(d)
            obj.endAngle = d.startAngle;
            return obj;
        }
        return null
    }

    // Find the element in data0 that joins the highest preceding element in data1.
    function findPreceding(i, data0, data1, key) {
        var m = data0.length;
        while (--i >= 0) {
            var k = key(data1[i]);
            for (var j = 0; j < m; ++j) {
                if (key(data0[j]) === k) return data0[j];
            }
        }
    }

    // Find the element in data0 that joins the lowest following element in data1.
    function findFollowing(i, data0, data1, key) {
        var n = data1.length,
            m = data0.length;
        while (++i < n) {
            var k = key(data1[i]);
            for (var j = 0; j < m; ++j) {
                if (key(data0[j]) === k) return data0[j];
            }
        }
    }

    function arcTween(d) {
        var i = d3.interpolate(this._current, d);
        this._current = i(0);
        return function(t) {
            return arc(i(t))
        }

    }

    function cloneObj(obj) {
        var o = {};
        for (var i in obj) {
            o[i] = obj[i];
        }
        return o;

    }


    function change(stance) {

        function key(d) {
            return d.data.stance;
        }

        var path = svg.selectAll("#" + div + " path");
        var data0 = path.data(),
            data1 = pie(stance.values);


        path = path.data(data1, key);

        path.transition()
            .duration(750)
            .attrTween("d", arcTween)

        path.enter()
            .append("path")
            .each(function(d, i) {
                var narc = findNeighborArc(i, data0, data1, key);
                if (narc) {
                    this._current = narc;
                    this._previous = narc;
                } else {
                    this._current = d;
                }
            })
            .attr("fill", function(d, i) {
                return color[i];
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", "4px")
            .transition()
            .duration(750)
            .attrTween("d", arcTween);

        path.exit()
            .transition()
            .duration(750)
            .attrTween("d", function(d, index) {
                var currentIndex = this._previous.data.stance;
                var i = d3.interpolateObject(d, this._previous);
                return function(t) {
                    return arc(i(t));
                }
            }).remove();

        firstTime = false;
    }
};


function drawRunChart(div, data) {

    console.log(data);
    // set ze variables
    var width = $('#' + div).width(),
        height = $('#' + div).height(),
        max = 44;
    // console.log("width: " + width);
    // set ze axis
    var x = d3.scaleLinear()
        .domain([0, max])
        .rangeRound([0, width]);

    var xAxis = d3.axisBottom(x).ticks(0);

    var svg = d3.select("#" + div).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 4 + "," + 12 + ")");

    var t = 0;

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    for (var key in data) {

        var currentSkater = data[key];

        x = d3.scaleLinear()
            .domain([0, max])
            .rangeRound([0, width])
            .nice();

        xAxis = d3.axisBottom(x).ticks(0);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + 0 + "," + t * 20 + ")")
            .attr("stroke", "#fff")
            .attr("stroke-width", "7")
            .style("fill", "#50D1E3")
            .call(xAxis)


        for (var i = 0; i < currentSkater["Run 1"].length; i++) {
            var position = (currentSkater["Run 1"][0].timestamp + max - currentSkater["Run 1"][i].timestamp) - max;
            // check if the trick is a bail or land
            if (currentSkater["Run 1"][i].bail) {
                // add an X
                svg.append('polyline').attr('points', '4,4 8,8 12,4 16,8 12,12 16,16 12,20 8,16 4,20 0,16 4,12 0,8 4,4').style("fill", "#E36640").style("stroke", "none").attr("transform", "translate(" + 0 + "," + ((t * 20) - 10) + ")").transition().duration(750).delay(150).attr("transform", "translate(" + -(x(position) - 15) + "," + ((t * 20) - 7) + ")");
            } else {
                // circle dat sheeiit
                svg.append("circle").style("stroke", "#none").style("fill", "#fff").attr("stroke", "#368195").attr("transform", "translate(" + 0 + "," + ((t * 20)) + ")").attr("cx", 0).attr("cy", "5").attr("r", "5").on("mouseover", function(d) {
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div.html("<p>" + currentSkater["Run 1"][i].name + "</p>")
                            .style("left", (d3.event.pageX - 30) + "px")
                            .style("top", (d3.event.pageY - 40) + "px");
                    })
                    .on("mouseout", function(d) {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })
                    .transition().duration(750).delay(150).attr("transform", "translate(" + -(x(position) - 15) + "," + ((t * 20)) + ")");
            }
        }

        t += 1;

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + 0 + "," + t * 20 + ")")
            .attr("stroke", "#fff")
            .attr("stroke-width", "7")
            .style("fill", "#50D1E3")
            .call(xAxis);

        for (var i = 0; i < currentSkater["Run 2"].length; i++) {
            var position = (currentSkater["Run 2"][0].timestamp + max - currentSkater["Run 2"][i].timestamp) - max;
            // check if the trick is a bail or land
            if (currentSkater["Run 2"][i].bail) {
                // add an X
                svg.append('polyline').attr('points', '4,4 8,8 12,4 16,8 12,12 16,16 12,20 8,16 4,20 0,16 4,12 0,8 4,4').style("fill", "#E36640").style("stroke", "none").attr("transform", "translate(" + 0 + "," + ((t * 20) - 10) + ")").transition().duration(750).delay(150).attr("transform", "translate(" + -(x(position) - 15) + "," + ((t * 20) - 7) + ")");
            } else {
                // circle dat sheeiit
                svg.append("circle").style("stroke", "#none").style("fill", "#fff").attr("stroke", "#368195").attr("transform", "translate(" + 0 + "," + ((t * 20)) + ")").attr("cx", 0).attr("cy", "5").attr("r", "5").on("mouseover", function(d) {
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div.html("<p>" + currentSkater["Run 2"][i].name + "</p>")
                            .style("left", (d3.event.pageX - 30) + "px")
                            .style("top", (d3.event.pageY - 40) + "px");
                    })
                    .on("mouseout", function(d) {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })
                    .transition().duration(750).delay(150).attr("transform", "translate(" + -(x(position) - 15) + "," + ((t * 20)) + ")");
            }

        }
        t += 2;
    }
};


function consistencyChart(div, trickData) {
    // set ze variables
    var margin = {
        top: 0,
        right: 0,
        bottom: 20,
        left: 40
    };
    var svg = d3.select("#" + div).append("svg"),
        width = document.getElementById(div).offsetWidth - margin.right - margin.left,
        height = document.getElementById(div).offsetHeight - margin.top - margin.bottom,
        max = d3.max(d3.entries(trickData), function(d) {
            return d.value.makes + 5;
            // return +i.consistency
        });


    // set the color scale
    var color = d3.schemeCategory10;

    svg.attr("height", height).attr("width", width);

    // console.log("width: "+width);
    // console.log("max: "+max);

    var x = d3.scaleLinear()
        // calculate max
        .domain([0, max])
        .range([0, width]);

    // var xAxis = d3.axisBottom()
    //     .scale(x)
    //     .tickFormat('')
    //     .tickSize(10);

    var y = d3.scaleLinear()
        .range([height + 10, 0]);

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickFormat('')
        .tickSize(0);

    var yIterator = 1;

    // add ze axis X Axis
    // svg.append("g").attr("class", "x axis").call(xAxis).attr("transform", "translate(" + 0 + "," + (height-5) + ")");

    // Y Axis - Not needed for now
    // svg.append("g").attr("class", "y axis").call(yAxis).attr("transform", "translate(" + 0 + "," + 0 + ")").attr("stroke","#fff");

    for (var key in trickData) {
        svg.append("rect")
            .attr("fill", "#2ad76f")
            .attr("height", 4)
            .attr("width", 0)
            .attr("transform", "translate(" + 0 + "," + yIterator * 10 + ")")
            .transition().ease(d3.easeCubic).duration(1000).delay(250)
            .attr("width", function() {
                return x(trickData[key].makes);
            });

        yIterator += .75;

        svg.append("rect")
            .attr("fill", "#c12836")
            .attr("class", "bar")
            .attr("height", 4)
            .attr("width", 0)
            .attr("transform", "translate(" + 0 + "," + yIterator * 10 + ")")
            .transition().ease(d3.easeCubic).duration(1000).delay(250)
            .attr("width", function() {
                return x(trickData[key].bails);
            });

        svg.append("text")
            .attr("fill", "#333")
            .attr("transform", "translate(" + 0 + "," + yIterator * 10 + ")")
            .transition().ease(d3.easeCubic).duration(1000).delay(250)
            .attr("transform", "translate(" + (x(trickData[key].makes) + 5) + "," + ((yIterator * 10) + 1) + ")")
            .text((trickData[key].makes / (trickData[key].makes + trickData[key].bails) * 100).toFixed(2) + "%");



        // add additional spacing between groups
        yIterator += 3.5;

    }
};
