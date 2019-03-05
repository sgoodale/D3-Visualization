//
//
// (function(global, factory) {
//   typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("d3-scale")) :
//       typeof define === "function" && define.amd ? define(["exports", "d3-scale"], factory) :
//           (factory(global.d3 = global.d3 || {}, global.d3));
// }(this, function(exports, d3Scale) {
//   'use strict';
//
//   function square(x) {
//     return x * x;
//   }
//
//   function radial() {
//     var linear = d3Scale.scaleLinear();
//
//     function scale(x) {
//       return Math.sqrt(linear(x));
//     }
//
//     scale.domain = function(_) {
//       return arguments.length ? (linear.domain(_), scale) : linear.domain();
//     };
//
//     scale.nice = function(count) {
//       return (linear.nice(count), scale);
//     };
//
//     scale.range = function(_) {
//       return arguments.length ? (linear.range(_.map(square)), scale) : linear.range().map(Math.sqrt);
//     };
//
//     scale.ticks = linear.ticks;
//     scale.tickFormat = linear.tickFormat;
//
//     return scale;
//   }
//
//   exports.scaleRadial = radial;
//
//   Object.defineProperty(exports, '__esModule', {value: true});
// }));
//
//
//
//
// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height"),
//     innerRadius = 180,
//     outerRadius = Math.min(width, height) * 0.77,
//     g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height * 0.78 + ")");
//
// var x = d3.scaleBand()
//     .range([0, 2 * Math.PI])
//     .align(0);
//
// var y = d3.scaleRadial()
//     .range([innerRadius, outerRadius]);
//
// var z = d3.scaleOrdinal()
//     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
// d3.csv("data.csv", function(d, i, columns) {
//   for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
//   d.total = t;
//   return d;
// }, function(error, data) {
//   if (error) throw error;
//
//   weave(data, function(a, b) { return b[data.columns[6]] -  a[data.columns[6]]; });
//   x.domain(data.map(function(d) { return d.State; }));
//   y.domain([0, d3.max(data, function(d) { return d.total; })]);
//   z.domain(data.columns.slice(1));
//
//   g.append("g")
//       .selectAll("g")
//       .data(d3.stack().keys(data.columns.slice(1))(data))
//       .enter().append("g")
//       .attr("fill", function(d) { return z(d.key); })
//       .selectAll("path")
//       .data(function(d) { return d; })
//       .enter().append("path")
//       .attr("d", d3.arc()
//           .innerRadius(function(d) { return y(d[0]); })
//           .outerRadius(function(d) { return y(d[1]); })
//           .startAngle(function(d) { return x(d.data.State); })
//           .endAngle(function(d) { return x(d.data.State) + x.bandwidth(); })
//           .padAngle(0.01)
//           .padRadius(innerRadius));
//
//   var label = g.append("g")
//       .selectAll("g")
//       .data(data)
//       .enter().append("g")
//       .attr("text-anchor", "middle")
//       .attr("transform", function(d) { return "rotate(" + ((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)"; });
//
//   label.append("line")
//       .attr("x2", -5)
//       .attr("stroke", "#000");
//
//   label.append("text")
//       .attr("transform", function(d) { return (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-9)"; })
//       .text(function(d) { return d.State; });
//
//   var yAxis = g.append("g")
//       .attr("text-anchor", "end");
//
//   var yTick = yAxis
//       .selectAll("g")
//       .data(y.ticks(10).slice(1))
//       .enter().append("g");
//
//   yTick.append("circle")
//       .attr("fill", "none")
//       .attr("stroke", "#000")
//       .attr("stroke-opacity", 0.5)
//       .attr("r", y);
//
//   yTick.append("text")
//       .attr("x", -6)
//       .attr("y", function(d) { return -y(d); })
//       .attr("dy", "0.35em")
//       .attr("fill", "none")
//       .attr("stroke", "#fff")
//       .attr("stroke-linejoin", "round")
//       .attr("stroke-width", 3)
//       .text(y.tickFormat(10, "s"));
//
//   yTick.append("text")
//       .attr("x", -6)
//       .attr("y", function(d) { return -y(d); })
//       .attr("dy", "0.35em")
//       .text(y.tickFormat(10, "s"));
//
//   yAxis.append("text")
//       .attr("x", -6)
//       .attr("y", function(d) { return -y(y.ticks(10).pop()); })
//       .attr("dy", "-1em")
//       .text("Population");
//
//   var legend = g.append("g")
//       .selectAll("g")
//       .data(data.columns.slice(1).reverse())
//       .enter().append("g")
//       .attr("transform", function(d, i) { return "translate(-40," + (i - (data.columns.length - 1) / 2) * 20 + ")"; });
//
//   legend.append("rect")
//       .attr("width", 18)
//       .attr("height", 18)
//       .attr("fill", z);
//
//   legend.append("text")
//       .attr("x", 24)
//       .attr("y", 9)
//       .attr("dy", "0.35em")
//       .text(function(d) { return d; });
// });
//
// function weave(array, compare) {
//   var i = -1, j, n = array.sort(compare).length, weave = new Array(n);
//   while (++i < n) weave[i] = array[(j = i << 1) >= n ? (n - i << 1) - 1 : j];
//   while (--n >= 0) array[n] = weave[n];
// }
//
//
//

let dataset = [];
let xScale = null;
let xScaleBandwidth = null;

// ****************************
//         SET UP GRID
// ****************************

// format svg space
const svg = d3.select('svg');

const margin = 60;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);


// change dimensions of svg
const svgHTMLTag = document.getElementById("svg");

const svgWidth = 1000 + 2 * margin;
const svgHeight = 600 + 2 * margin;

svgHTMLTag.style.height = svgHeight.toString();
svgHTMLTag.style.width = svgWidth.toString();


// y-axis
const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

chart.append('g')
    .call(d3.axisLeft(yScale));


// horizontal grid lines
const makeYLines = () => d3.axisLeft()
    .scale(yScale);

chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
    );



// ****************************
//         ADD DATA
// ****************************

// import data
d3.csv("./IllnessesDataset - Aggregated.csv", function(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;

  dataset = data.map((s) => s['Disease']);

  // add x-axis with column titles
  xScale = d3.scaleBand()
      .range([0, width])
      .domain(data.map((s) => s['Disease']))
      .padding(0.2);

  xScaleBandwidth = xScale.bandwidth();

  chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));


  updateGlobalData(data);

  updateGraph();


});


function updateGlobalData(data) {
  dataset = data;
}

function updateGraph() {

  // add bars: Male
  chart.selectAll()
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (s) => xScale(s['Disease']))
      .attr('y', (s) => yScale(s['Male']))
      .attr('height', (s) => height - yScale(s['Male']))
      .attr('width', xScaleBandwidth/2)
      .attr('fill', 'blue');


  // add bars: Female
  chart.selectAll()
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (s) => xScale(s['Disease'])+xScaleBandwidth/2)
      .attr('y', (s) => yScale(s['Female']))
      .attr('height', (s) => height - yScale(s['Female']))
      .attr('width', xScaleBandwidth/2)
      .attr('fill', 'red');
}

