// create the svg area
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", 600)
    .attr("height", 600)
    .append("g")
    .attr("transform", "translate(300,300)");

svg.append('circle')
    .attr('r', 300)
    .attr('fill', 'lightgrey')
    .on("mouseout", mouseout_panel);

var pointer = svg.append('polyline')
    .attr('points', "-8,0 0,-20 8,0")
    .attr("transform", "translate(0,-240)")
    .attr('fill', '#848488');

svg.append('circle')
    .attr('id', 'cxx')
    .attr('r', 240)
    .attr('fill', '#848488');

svg.append('circle')
    .attr('r', 230)
    .attr('fill', 'white');

svg.append('path')
    .attr('id', 'tick_label_path')
    .attr('d', "M0,255a255,255 0 0,1 0,-510a255,255 0 0,1 0,510Z")
    .attr("fill", "none")
    .attr("stroke", "none");

svg.append('path')
    .attr('id', 'cat_label_path')
    .attr('d', "M0,280a280,280 0 0,1 0,-560a280,280 0 0,1 0,560Z")
    .attr("fill", "none")
    .attr("stroke", "none");

svg.append('path')
    .attr('id', 'obj_label_path')
    .attr('d', "M0,210a210,210 0 0,1 0,-420a210,210 0 0,1 0,420Z")
    .attr("fill", "none")
    .attr("stroke", "none");

tick_labels = ["(All)", "Adult", "Child", "Female", "Male", "Hispanic", "Latino", "Other",
  "White", "Black", "Multi.", "Other", "Alone", "Cohabit",
  "College", "Middle", "Elementary", "Other"];
ticks = new Array();
for (i = 0; i < 18; i++) {
  ticks[i] = {'angle': 20 * i, 'label': tick_labels[i]};
}




svg.datum(ticks)
    .append('g')
    .selectAll("g")
    .data(function(d) { return d;})
    .enter()
    .append("g")
    .attr("transform", function(d) { return "rotate(" + (d.angle - 90) + ") translate(" + 240 + ",0)"; })
    .append("line")               // By default, x1 = y1 = y2 = 0, so no need to specify it.
    .attr("x2", 10)
    .attr("stroke", "black");


svg.datum(ticks)
    .append('g')
    .selectAll("g")
    .data(function(d) { return d;})
    .enter()
    .append("g")
    .attr("transform", function(d) { return "rotate(" + (d.angle) + ")"; })
    .append("text")
    //.attr("dx", 50)
    //.attr("dy", ".35em")

    //.attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
    //.attr("transform", function(d) { return "rotate(90) translate(-10)"; })
    .append("textPath")
    .attr("text-anchor", "middle")
    .attr("startOffset", "50%")
    .attr("href", "#tick_label_path")
    .text(function(d) { return d.label; })
    .style("fill", "#474747")
    .style("font-weight", 600)
    .style("font-size", 14);

dividers = [10, 50, 90, 150, 230, 270, 350];
svg.datum(dividers)
    .append('g')
    .selectAll("g")
    .data(function(d) { return d;})
    .enter()
    .append("g")
    .attr("transform", function(d) { return "rotate(" + (d - 90) + ") translate(" + 230 + ",0)"; })
    .append("line")               // By default, x1 = y1 = y2 = 0, so no need to specify it.
    .attr("x2", 70)
    .attr("stroke", "#676767");

categories = [
  {'label':'*', 'angle':0},
  {'label':'AGE GROUP', 'angle':30},
  {'label':'GENDER', 'angle':70},
  {'label':'ETHNICITY', 'angle':120},
  {'label':'RACE', 'angle':190},
  {'label':'LIVING', 'angle':250},
  {'label':'EDUCATION', 'angle':310}
];

svg.datum(categories)
    .append('g')
    .selectAll("g")
    .data(function(d) { return d;})
    .enter()
    .append("g")
    .attr("transform", function(d) { return "rotate(" + (d.angle) + ")"; })
    .append("text")
    //.attr("dx", 60)
    //.attr("dy", ".35em")

    //.attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
    //.attr("transform", function(d) { return "rotate(90) translate(-10)"; })
    .append("textPath")
    .attr("text-anchor", "middle")
    .attr("startOffset", "50%")
    .attr("href", "#cat_label_path")
    .text(function(d) { return d.label; })
    .style("fill", "#474747")
    .style("font-weight", 900)
    .style("font-size", 14);

// create a matrix
var matrix_all = [[0, 33, 32, 3, 3, 22, 3, 5, 3, 20, 24, 2, 21], [33, 0, 26, 3, 3, 20, 3, 5, 3, 15, 14, 2, 12], [32, 26, 0, 1, 1, 20, 2, 3, 2, 16, 18, 1, 18], [3, 3, 1, 0, 13, 2, 5, 2, 4, 1, 1, 1, 1], [3, 3, 1, 13, 0, 2, 5, 2, 5, 1, 1, 1, 1], [22, 20, 20, 2, 2, 0, 2, 5, 4, 16, 16, 2, 13], [3, 3, 2, 5, 5, 2, 0, 4, 5, 1, 1, 1, 1], [5, 5, 3, 2, 2, 5, 4, 0, 3, 7, 7, 5, 3], [3, 3, 2, 4, 5, 4, 5, 3, 0, 2, 2, 2, 2], [20, 15, 16, 1, 1, 16, 1, 7, 2, 0, 45, 5, 14], [24, 14, 18, 1, 1, 16, 1, 7, 2, 45, 0, 5, 20], [2, 2, 1, 1, 1, 2, 1, 5, 2, 5, 5, 0, 0], [21, 12, 18, 1, 1, 13, 1, 3, 2, 14, 20, 0, 0]];
var matrix_adult = [[0, 33, 32, 3, 3, 22, 3, 5, 3, 20, 24, 2, 25], [33, 0, 28, 3, 3, 22, 3, 5, 3, 15, 14, 2, 14], [32, 28, 0, 1, 1, 21, 2, 3, 2, 17, 18, 1, 19], [3, 3, 1, 0, 13, 3, 5, 2, 4, 1, 1, 1, 1], [3, 3, 1, 13, 0, 3, 5, 2, 5, 1, 1, 1, 1], [22, 22, 21, 3, 3, 0, 2, 6, 4, 17, 16, 2, 14], [3, 3, 2, 5, 5, 2, 0, 4, 5, 1, 1, 1, 1], [5, 5, 3, 2, 2, 6, 4, 0, 3, 7, 7, 5, 3], [3, 3, 2, 4, 5, 4, 5, 3, 0, 2, 2, 2, 2], [20, 15, 17, 1, 1, 17, 1, 7, 2, 0, 45, 5, 17], [24, 14, 18, 1, 1, 16, 1, 7, 2, 45, 0, 5, 24], [2, 2, 1, 1, 1, 2, 1, 5, 2, 5, 5, 0, 0], [25, 14, 19, 1, 1, 14, 1, 3, 2, 17, 24, 0, 0]];
var matrix_child = [[0, 3, 3, 0, 4, 1, 4, 2, 2, 2, 1, 0, 0], [3, 0, 3, 0, 0, 1, 0, 0, 0, 2, 1, 1, 0], [3, 3, 0, 0, 0, 11, 0, 0, 0, 2, 3, 0, 8], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0], [1, 1, 11, 0, 0, 0, 0, 0, 0, 1, 2, 0, 8], [4, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0], [2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 31, 3, 1], [1, 1, 3, 0, 0, 2, 0, 0, 0, 31, 0, 4, 2], [0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0], [0, 0, 8, 0, 0, 8, 0, 0, 0, 1, 2, 0, 0]];
var matrix_female = [[0, 35, 37, 2, 4, 26, 3, 3, 5, 12, 16, 1, 21], [35, 0, 27, 2, 3, 22, 3, 4, 5, 11, 14, 1, 13], [37, 27, 0, 1, 2, 24, 2, 2, 3, 11, 16, 0, 21], [2, 2, 1, 0, 11, 2, 3, 1, 3, 1, 1, 0, 1], [4, 3, 2, 11, 0, 3, 6, 2, 5, 2, 1, 2, 1], [26, 22, 24, 2, 3, 0, 2, 4, 4, 13, 20, 1, 16], [3, 3, 2, 3, 6, 2, 0, 5, 4, 1, 1, 0, 1], [3, 4, 2, 1, 2, 4, 5, 0, 4, 6, 6, 3, 2], [5, 5, 3, 3, 5, 4, 4, 4, 0, 3, 3, 1, 3], [12, 11, 11, 1, 2, 13, 1, 6, 3, 0, 39, 4, 9], [16, 14, 16, 1, 1, 20, 1, 6, 3, 39, 0, 4, 14], [1, 1, 0, 0, 2, 1, 0, 3, 1, 4, 4, 0, 0], [21, 13, 21, 1, 1, 16, 1, 2, 3, 9, 14, 0, 0]];
var matrix_male = [[0, 31, 27, 4, 2, 17, 3, 7, 2, 28, 25, 3, 21], [31, 0, 25, 3, 2, 16, 3, 7, 2, 15, 13, 3, 11], [27, 25, 0, 1, 0, 15, 2, 3, 1, 17, 15, 1, 14], [4, 3, 1, 0, 13, 3, 6, 3, 6, 1, 1, 1, 1], [2, 2, 0, 13, 0, 1, 5, 2, 4, 1, 1, 1, 0], [17, 16, 15, 3, 1, 0, 2, 7, 3, 14, 13, 2, 11], [3, 3, 2, 6, 5, 2, 0, 3, 6, 1, 1, 1, 1], [7, 7, 3, 3, 2, 7, 3, 0, 2, 7, 8, 5, 3], [2, 2, 1, 6, 4, 3, 6, 2, 0, 1, 1, 2, 1], [28, 15, 17, 1, 1, 14, 1, 7, 1, 0, 48, 5, 19], [25, 13, 15, 1, 1, 13, 1, 8, 1, 48, 0, 6, 27], [3, 3, 1, 1, 1, 2, 1, 5, 2, 5, 6, 0, 0], [21, 11, 14, 1, 0, 11, 1, 3, 1, 19, 27, 0, 0]];
var matrix_hispanic = [[0, 37, 26, 3, 3, 25, 2, 7, 3, 15, 22, 2, 20], [37, 0, 25, 2, 3, 21, 2, 7, 3, 15, 16, 2, 13], [26, 25, 0, 1, 1, 21, 1, 3, 1, 12, 16, 1, 15], [3, 2, 1, 0, 13, 2, 5, 2, 3, 1, 1, 0, 1], [3, 3, 1, 13, 0, 2, 6, 2, 7, 1, 0, 0, 1], [25, 21, 21, 2, 2, 0, 1, 6, 2, 13, 18, 1, 15], [2, 2, 1, 5, 6, 1, 0, 3, 7, 1, 1, 1, 1], [7, 7, 3, 2, 2, 6, 3, 0, 2, 10, 11, 4, 4], [3, 3, 1, 3, 7, 2, 7, 2, 0, 1, 1, 1, 1], [15, 15, 12, 1, 1, 13, 1, 10, 1, 0, 39, 6, 10], [22, 16, 16, 1, 0, 18, 1, 11, 1, 39, 0, 5, 18], [2, 2, 1, 0, 0, 1, 1, 4, 1, 6, 5, 0, 0], [20, 13, 15, 1, 1, 15, 1, 4, 1, 10, 18, 0, 0]];
var matrix_latino = matrix_all;
var matrix_eth_other = [[0, 32, 33, 3, 3, 21, 3, 5, 3, 21, 24, 2, 21], [32, 0, 26, 3, 3, 20, 3, 5, 3, 14, 13, 2, 12], [33, 26, 0, 1, 1, 20, 2, 2, 2, 17, 18, 1, 18], [3, 3, 1, 0, 13, 3, 5, 2, 4, 1, 1, 1, 1], [3, 3, 1, 13, 0, 2, 5, 2, 5, 1, 1, 1, 1], [21, 20, 20, 3, 2, 0, 2, 5, 4, 16, 15, 2, 13], [3, 3, 2, 5, 5, 2, 0, 4, 4, 1, 1, 1, 1], [5, 5, 2, 2, 2, 5, 4, 0, 4, 6, 6, 5, 2], [3, 3, 2, 4, 5, 4, 4, 4, 0, 2, 2, 2, 2], [21, 14, 17, 1, 1, 16, 1, 6, 2, 0, 46, 5, 15], [24, 13, 18, 1, 1, 15, 1, 6, 2, 46, 0, 5, 21], [2, 2, 1, 1, 1, 2, 1, 5, 2, 5, 5, 0, 0], [21, 12, 18, 1, 1, 13, 1, 2, 2, 15, 21, 0, 0]];
var matrix_white = [[0, 30, 35, 4, 3, 23, 4, 5, 4, 18, 19, 1, 20], [30, 0, 24, 3, 3, 20, 3, 5, 4, 12, 11, 1, 11], [35, 24, 0, 2, 1, 21, 2, 2, 3, 15, 19, 0, 19], [4, 3, 2, 0, 15, 3, 5, 2, 5, 2, 1, 0, 1], [3, 3, 1, 15, 0, 3, 4, 2, 5, 1, 1, 1, 1], [23, 20, 21, 3, 3, 0, 2, 5, 4, 18, 16, 1, 14], [4, 3, 2, 5, 4, 2, 0, 4, 5, 1, 1, 0, 1], [5, 5, 2, 2, 2, 5, 4, 0, 4, 6, 8, 4, 3], [4, 4, 3, 5, 5, 4, 5, 4, 0, 2, 2, 1, 2], [18, 12, 15, 2, 1, 18, 1, 6, 2, 0, 46, 4, 14], [19, 11, 19, 1, 1, 16, 1, 8, 2, 46, 0, 4, 18], [1, 1, 0, 0, 1, 1, 0, 4, 1, 4, 4, 0, 0], [20, 11, 19, 1, 1, 14, 1, 3, 2, 14, 18, 0, 0]];
var matrix_black = [[0, 36, 29, 1, 3, 19, 3, 5, 3, 24, 30, 4, 25], [36, 0, 31, 2, 2, 18, 3, 6, 2, 19, 18, 4, 15], [29, 31, 0, 1, 1, 19, 1, 2, 1, 19, 17, 2, 17], [1, 2, 1, 0, 11, 1, 5, 2, 3, 0, 0, 1, 0], [3, 2, 1, 11, 0, 2, 9, 1, 7, 1, 1, 1, 1], [19, 18, 19, 1, 2, 0, 2, 4, 2, 15, 15, 3, 13], [3, 3, 1, 5, 9, 2, 0, 4, 5, 1, 1, 1, 1], [5, 6, 2, 2, 1, 4, 4, 0, 2, 6, 5, 5, 3], [3, 2, 1, 3, 7, 2, 5, 2, 0, 2, 2, 2, 1], [24, 19, 19, 0, 1, 15, 1, 6, 2, 0, 45, 7, 18], [30, 18, 17, 0, 1, 15, 1, 5, 2, 45, 0, 7, 29], [4, 4, 2, 1, 1, 3, 1, 5, 2, 7, 7, 0, 0], [25, 15, 17, 0, 1, 13, 1, 3, 1, 18, 29, 0, 0]];
var matrix_multi = [[0, 37, 28, 4, 1, 22, 3, 8, 2, 20, 22, 1, 18], [37, 0, 23, 4, 1, 19, 4, 7, 3, 18, 16, 1, 11], [28, 23, 0, 1, 0, 22, 2, 4, 1, 12, 17, 1, 18], [4, 4, 1, 0, 5, 3, 0, 2, 10, 3, 1, 0, 1], [1, 1, 0, 5, 0, 2, 4, 2, 15, 0, 0, 0, 0], [22, 19, 22, 3, 2, 0, 5, 6, 3, 16, 18, 1, 13], [3, 4, 2, 0, 4, 5, 0, 2, 13, 1, 2, 4, 1], [8, 7, 4, 2, 2, 6, 2, 0, 2, 13, 11, 7, 3], [2, 3, 1, 10, 15, 3, 13, 2, 0, 2, 1, 0, 1], [20, 18, 12, 3, 0, 16, 1, 13, 2, 0, 47, 4, 11], [22, 16, 17, 1, 0, 18, 2, 11, 1, 47, 0, 4, 16], [1, 1, 1, 0, 0, 1, 4, 7, 0, 4, 4, 0, 0], [18, 11, 18, 1, 0, 13, 1, 3, 1, 11, 16, 0, 0]];
var matrix_race_other = [[0, 36, 25, 3, 2, 20, 2, 6, 3, 15, 22, 2, 18], [36, 0, 22, 2, 1, 19, 3, 7, 2, 15, 16, 2, 12], [25, 22, 0, 0, 0, 18, 1, 3, 1, 12, 15, 1, 13], [3, 2, 0, 0, 5, 1, 5, 1, 0, 0, 1, 0, 0], [2, 1, 0, 5, 0, 1, 4, 2, 4, 1, 0, 0, 0], [20, 19, 18, 1, 1, 0, 1, 7, 2, 13, 17, 1, 12], [2, 3, 1, 5, 4, 1, 0, 4, 0, 2, 1, 0, 1], [6, 7, 3, 1, 2, 7, 4, 0, 3, 10, 10, 3, 3], [3, 2, 1, 0, 4, 2, 0, 3, 0, 1, 1, 0, 1], [15, 15, 12, 0, 1, 13, 2, 10, 1, 0, 39, 5, 10], [22, 16, 15, 1, 0, 17, 1, 10, 1, 39, 0, 4, 17], [2, 2, 1, 0, 0, 1, 0, 3, 0, 5, 4, 0, 0], [18, 12, 13, 0, 0, 12, 1, 3, 1, 10, 17, 0, 0]];
var matrix_alone = matrix_adult;
var matrix_cohabit = matrix_all;
var matrix_college = [[0, 30, 32, 3, 3, 18, 5, 3, 5, 16, 14, 2, 21], [30, 0, 25, 2, 3, 21, 4, 5, 5, 12, 13, 1, 12], [32, 25, 0, 1, 1, 21, 2, 2, 3, 12, 14, 0, 19], [3, 2, 1, 0, 9, 3, 5, 2, 3, 1, 1, 1, 1], [3, 3, 1, 9, 0, 4, 3, 2, 5, 1, 1, 2, 1], [18, 21, 21, 3, 4, 0, 3, 5, 6, 11, 13, 1, 11], [5, 4, 2, 5, 3, 3, 0, 7, 5, 1, 1, 0, 1], [3, 5, 2, 2, 2, 5, 7, 0, 5, 5, 6, 2, 2], [5, 5, 3, 3, 5, 6, 5, 5, 0, 3, 3, 1, 3], [16, 12, 12, 1, 1, 11, 1, 5, 3, 0, 44, 4, 12], [14, 13, 14, 1, 1, 13, 1, 6, 3, 44, 0, 4, 13], [2, 1, 0, 1, 2, 1, 0, 2, 1, 4, 4, 0, 0], [21, 12, 19, 1, 1, 11, 1, 2, 3, 12, 13, 0, 0]];
var matrix_middle = [[0, 33, 31, 3, 3, 23, 3, 6, 3, 21, 25, 2, 22], [33, 0, 26, 3, 3, 20, 3, 6, 3, 16, 15, 2, 13], [31, 26, 0, 1, 1, 21, 1, 3, 2, 17, 18, 1, 18], [3, 3, 1, 0, 13, 2, 5, 2, 4, 1, 1, 0, 1], [3, 3, 1, 13, 0, 2, 6, 2, 6, 1, 1, 1, 1], [23, 20, 21, 2, 2, 0, 2, 6, 3, 18, 16, 2, 14], [3, 3, 1, 5, 6, 2, 0, 3, 5, 1, 1, 0, 1], [6, 6, 3, 2, 2, 6, 3, 0, 3, 8, 8, 6, 3], [3, 3, 2, 4, 6, 3, 5, 3, 0, 2, 2, 2, 2], [21, 16, 17, 1, 1, 18, 1, 8, 2, 0, 45, 6, 15], [25, 15, 18, 1, 1, 16, 1, 8, 2, 45, 0, 5, 23], [2, 2, 1, 0, 1, 2, 0, 6, 2, 6, 5, 0, 0], [22, 13, 18, 1, 1, 14, 1, 3, 2, 15, 23, 0, 0]];
var matrix_elementary = [[0, 44, 24, 5, 4, 17, 2, 5, 6, 17, 19, 2, 7], [44, 0, 16, 3, 1, 12, 3, 7, 7, 17, 20, 1, 5], [24, 16, 0, 0, 1, 13, 0, 1, 3, 9, 7, 0, 7], [5, 3, 0, 0, 20, 1, 5, 6, 0, 0, 2, 0, 0], [4, 1, 1, 20, 0, 0, 10, 3, 4, 0, 2, 0, 0], [17, 12, 13, 1, 0, 0, 1, 1, 1, 6, 6, 0, 11], [2, 3, 0, 5, 10, 1, 0, 6, 4, 1, 2, 0, 0], [5, 7, 1, 6, 3, 1, 6, 0, 3, 8, 9, 6, 1], [6, 7, 3, 0, 4, 1, 4, 3, 0, 1, 1, 0, 0], [17, 17, 9, 0, 0, 6, 1, 8, 1, 0, 53, 4, 3], [19, 20, 7, 2, 2, 6, 2, 9, 1, 53, 0, 5, 3], [2, 1, 0, 0, 0, 0, 0, 6, 0, 4, 5, 0, 0], [7, 5, 7, 0, 0, 11, 0, 1, 0, 3, 3, 0, 0]];
var matrix_edu_other = [[0, 30, 20, 0, 3, 16, 3, 2, 5, 13, 19, 2, 22], [30, 0, 28, 0, 1, 17, 3, 3, 3, 13, 11, 3, 14], [20, 28, 0, 0, 0, 24, 3, 3, 3, 14, 13, 3, 14], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [3, 1, 0, 0, 0, 1, 6, 0, 5, 0, 1, 0, 0], [16, 17, 24, 1, 1, 0, 1, 4, 5, 15, 18, 2, 15], [3, 3, 3, 0, 6, 1, 0, 0, 5, 1, 2, 4, 1], [2, 3, 3, 0, 0, 4, 0, 0, 0, 5, 8, 4, 2], [5, 3, 3, 0, 5, 5, 5, 0, 0, 1, 1, 4, 2], [13, 13, 14, 0, 0, 15, 1, 5, 1, 0, 42, 4, 12], [19, 11, 13, 0, 1, 18, 2, 8, 1, 42, 0, 4, 19], [2, 3, 3, 0, 0, 2, 4, 4, 4, 4, 4, 0, 0], [22, 14, 14, 0, 0, 15, 1, 2, 2, 12, 19, 0, 0]];

var matrices = [matrix_all, matrix_adult, matrix_child, matrix_female, matrix_male, matrix_hispanic, matrix_latino, matrix_eth_other,
  matrix_white, matrix_black, matrix_multi, matrix_race_other, matrix_alone, matrix_cohabit, matrix_college, matrix_middle,
  matrix_elementary, matrix_edu_other]


//cat_colors = ["#FF7900", "#1BA602", "#4A43FF"];
cat_colors = ["#4B9BFF", "#FFB46E", "#FF5F5F"];

objectives = [
  {"name":"High Blood Pressure", "color":"#F5DEB3", "category": 0},
  {"name":"Diabetes", "color":"#EE82EE", "category": 0},
  {"name":"Obesity", "color":"#40E0D0", "category": 0},
  {"name":"Heart Attack", "color":"#D8BFD8", "category": 0},
  {"name":"Stroke", "color":"#D2B48C", "category": 0},
  {"name":"Pulmonary Asthma", "color":"#4682B4", "category": 0},
  {"name":"Kidney Disease", "color":"#00FF7F", "category": 0},
  {"name":"Liver Disease", "color":"#FFFAFA", "category": 0},
  {"name":"Cancer", "color":"#708090", "category": 0},
  {"name":"Alcohol Related Disorder", "color":"#9ACD32", "category": 1},
  {"name":"Drug Substance Disorder", "color":"#377DB8", "category": 1},
  {"name":"Substance-related & Addictive Mental Disorder", "color":"#2E8B57", "category": 1},
  {"name":"Mental Illness", "color":"#6A5ACD", "category": 2}];

gen_chord(svg, matrices[0]);

function gen_chord(svg, matrix){

  // give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
  var res = d3.chord()
      .padAngle(0.02)
      .sortSubgroups(d3.descending)
      (matrix);

  // add the groups on the outer part of the circle
  var arc_grp = svg
      .datum(res)
      .append("g")
      .attr("id", "g_arc")
      .selectAll("g")
      .data(function(d) { return d.groups; })
      .enter();

  arc_grp
      .append("path")
      .on("mouseover", mouseover_arc)
      //.on("mouseout", mouseout)
      .style("fill", function(d,i){ return cat_colors[objectives[i].category]; })
      .attr("title", function(d,i){ return objectives[i].name; })
      .on("id", function(d,i){ return 'arc_' + i;})
      .on("mouseout", hideTooltip)
      .attr("d", d3.arc()
          .innerRadius(200)
          .outerRadius(230)
      );

  arc_grp
      .append("g")
      .attr("transform", function(d) { return "rotate(" + (d.startAngle * 90 / Math.PI + d.endAngle * 90 / Math.PI) + ")"; })
      .append("text")
      .append("textPath")
      .attr("text-anchor", "middle")
      .attr("startOffset", "50%")
      .attr("href", "#obj_label_path" )
      .text(function(d,i) {
        if((d.endAngle-d.startAngle)*210-12>objectives[i].name.length*6)
          return objectives[i].name;
        else
          return "";
      })
      .style("fill", "#efefef")
      .style("text-anchor", "middle")
      .style("font-size", 13);

  // Add the links between groups
  svg
      .datum(res)
      .append("g")
      .attr("id", "g_chord")
      .selectAll("path")
      .data(function(d) { return d; })
      .enter()
      .append("path")
      .attr("class", "chord")
      .attr("source", function(d){return d.source.index;})
      .attr("target", function(d){return d.target.index;})
      .attr("d", d3.ribbon()
          .radius(200)
      )
      .style("fill", function(d){ return(cat_colors[objectives[d.source.index].category]) })
      .style("opacity", 0.5)
      .on("mouseover", mouseover_chord);
  //.on("mouseout", mouseout);
  // colors depend on the source group. Change to target otherwise.

}

// Returns an array of tick angles and values for a given group and step.
function groupTicks(d, step) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(function(value) {
    return {value: value, angle: value * k + d.startAngle};
  });
}

function mouseover_arc(d, i) {

  cur_objective_index = i;
  //Decrease opacity to all
  svg.selectAll("path.chord")
      .transition()
      .style("opacity", 0.1);
  //Show hovered over chord with full opacity
  svg.selectAll("path.chord[source='" + i + "']")
      .transition()
      .style("opacity", 0.5);
  svg.selectAll("path.chord[target='" + i + "']")
      .transition()
      .style("opacity", 0.5);

  if((d.endAngle-d.startAngle)*210-12>objectives[i].name.length*6)
    return;
  else
    showTooltip(objectives[i].name);
}

function mouseover_chord(d, i) {

  //Decrease opacity to all
  svg.selectAll("path.chord")
      .transition()
      .style("opacity", 0.1);
  //Show hovered over chord with full opacity
  svg.selectAll("path.chord[source='" + d.source.index + "']")
      .transition()
      .style("opacity", 0.5);
  svg.selectAll("path.chord[target='" + d.source.index + "']")
      .transition()
      .style("opacity", 0.5);
}

function mouseout_panel(d, i) {

  svg.selectAll("path.chord")
      .transition()
      .style("opacity", 0.5);
}



var centerX = 630;
var centerY = 330;

rect = document.getElementById("my_dataviz").getBoundingClientRect();
centerX = rect.x + rect.width/2;
centerY = rect.y + rect.height/2;

var body = document.getElementsByTagName("body")[0];
body.addEventListener('mousedown', startDrag);
body.addEventListener('mousemove', drag);
body.addEventListener('mouseup', endDrag);
body.addEventListener('mouseleave', endDrag);

var oldTick = 0;
var curTick = 0;
var dragging = false;

var cursorX;
var cursorY;

function startDrag(e) {
  dragX = e.clientX;
  dragY = e.clientY;

  cursorX = e.clientX;
  cursorY = e.clientY;

  ang = ticks[curTick].angle;

  py = centerY - 240 * Math.cos(ang*Math.PI/180);
  px = centerX + 240 * Math.sin(ang*Math.PI/180);


  distance = Math.sqrt((dragX-px)*(dragX-px)+(dragY-py)*(dragY-py));
  if(distance > 100)
    return;

  distance = Math.sqrt((dragX-centerX)*(dragX-centerX)+(dragY-centerY)*(dragY-centerY));
  if(distance <240)
    return;

  dragging = true;
}



function drag(e) {

  cursorX = e.clientX;
  cursorY = e.clientY;

  if(dragging){
    var dragX = e.clientX;
    var dragY = e.clientY;
    var diffX = dragX-centerX;
    var diffY = dragY-centerY;
    var distance = Math.sqrt(diffX*diffX + diffY*diffY);

    if(distance >= 240){
      var tarang = 90;
      if(diffY != 0)
        tarang = Math.atan(Math.abs(diffX/diffY)) * 180 / Math.PI ;
      if(diffX>0 && diffY>0)
        tarang = 180 - tarang;
      else if(diffY>0 && diffX<0)
        tarang = 180 + tarang;
      else if(diffY<0 && diffX<0)
        tarang = 360 - tarang;
      else if(diffX==0 && diffY>0)
        tarang = 180;
      else if(diffY==0 && diffX <0)
        tarang = 270;

      tk = nearest_tick(tarang, curTick);

      if(tk != curTick){
        curTick = tk;
        ang = ticks[tk].angle;
        ppy = - 240 * Math.cos(ang*Math.PI/180);
        ppx = 240 * Math.sin(ang*Math.PI/180);
        pointer.transition().attr("transform", "translate(" + (ppx) + "," + (ppy) + ") rotate(" + ang + ")");
      }

    }

  }
}

function endDrag(e) {
  if(dragging && (oldTick != curTick) ){
    var element = document.getElementById("g_arc");
    element.parentNode.removeChild(element);
    element = document.getElementById("g_chord");
    element.parentNode.removeChild(element);
    oldTick = curTick;
    gen_chord(svg, matrices[oldTick]);
  }

  dragging = false;
}

function nearest_tick(ang, cur_tick){

  /*diff1 = Math.abs(ticks[cur_tick].angle-ang);
diff2 = Math.abs(ticks[Math.min(cur_tick+1, 19)].angle-ang);
diff3 = Math.abs(ticks[Math.max(cur_tick-1, 0)].angle-ang);

  if( (diff1<=diff2) && (diff1<=diff3) )
return cur_tick;
  if( (diff2<diff1) && (diff2<=diff3) )
return Math.min(cur_tick+1, 19);

return Math.max(cur_tick-1, 0);*/

  if(ang>=355)
    return 0;
  for(i=0; i<20; i++)
    if(Math.abs(ticks[i].angle-ang)<=5)
      return i;
  return cur_tick;
}

function showTooltip(text) {
  tooltip = document.getElementById("tooltip");
  tooltip.innerHTML = text;
  tooltip.style.display = "block";
  tooltip.style.left = cursorX + 10 + 'px';
  tooltip.style.top = cursorY + 10 + 'px';
  tooltip.style.opacity = 0.7;
}

function hideTooltip() {
  var tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
}