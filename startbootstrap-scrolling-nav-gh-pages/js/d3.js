
// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10};
var width = 520 - margin.left - margin.right;
var height = 520 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#D3_bubble_chart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g");

    
// Read data
d3.csv("../Resources/certified_byregion_country.csv").then (function(data) {
  // console.log("reading csv file");
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
//  console.log(d.Region_Name);
  }
 // Color palette for continents?
 var regions = ["Africa", "North America", "Central America", "South America", "The Caribbean", "European Union", "Eastern Europe", "Asia", "Middle East", "Oceania"];
 var color = d3.scaleOrdinal()
 .domain(regions)
 .range(d3.schemeCategory10);

 // Size scale for countries
var size = d3.scaleLinear()
    .domain([0, 114953])
    .range([5,70]);  

 // create a tooltip
 var Tooltip = d3.select("#D3_bubble_chart")
 .append("div")
 .style("opacity", 0)
 .attr("class", "tooltip")
 .style("background-color", "black")
 .style("border", "solid")
 .style("border-width", "2px")
 .style("border-radius", "5px")
 .style("padding", "5px")
 .style("color", "white");

 // Three function that change the tooltip when user hover / move / leave a cell
 var mouseover = function(d) {
  Tooltip
    .style("opacity", 1);
}
var mousemove = function(d) {
  Tooltip
    .html("<u> Country of Citizenship: " + d.COUNTRY_OF_CITIZENSHIP + "</u>" + "<br>" + "<u> Name of Region: " + d.Region_Name + "</u>" +
    "<br>" + "<u> Number of Certified Cases: " + d.NUM_OF_CERTIFIED_CASES)
    .style("left", (d3.mouse(this)[0]+20) + "px")
    .style("top", (d3.mouse(this)[1]) + "px");
}
var mouseleave = function(d) {
  Tooltip
    .style("opacity", 0);
}
 // Initialize the circle: all located at the center of the svg area
var node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function(d) { return "node " + d.Region_Name})
      .attr("r", function(d){ return size(d.NUM_OF_CERTIFIED_CASES)})
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      // .style("fill", function(d){ return color(d.region)})
      .style("fill", function(d){ return color(d.Region_Name)})
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));
  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
      .force("", d3.forceCenter().x(width/3).y(height/1.5)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.NUM_OF_CERTIFIED_CASES)+3) }).iterations(1)); // Force that avoids circle overlapping

        // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
  .nodes(data)
  .on("tick", function(d){
    node
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; });
  });

  // What happens when a circle is dragged?
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }
  
// When Hovered Over: highlight
var highlight = function(d){
  // reduce opacity of all groups
  d3.selectAll(".node").style("opacity", .05);
 
  // except the one that is hovered
  d3.selectAll("."+d).style("opacity", 1);
}

// And when it is not hovered anymore
var noHighlight = function(d){
  d3.selectAll(".node").style("opacity", 1);
}


  // add legend for regions
var size = 20;
svg.selectAll("myrect")
.data(regions)
.enter()
.append("circle")
  .attr("cx", 350)
  .attr("cy", function (d,i) { return 130 + i*(size + 5)})
  .attr("r", 7)
  .style("fill", function(d){ return color(d)})
  .on("mouseover", highlight)
  .on("mouseleave", noHighlight);
  
svg.selectAll("mylabels")
  .data(regions)
  .enter()
  .append("text")
    .attr("x", 350 + size*.8)
    .attr("y", function(d,i){ return 120 + i*(size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight);

// Legend title
svg.append("text")
.attr('x', 350 + size)
.attr("y", height - 395)
.text("Regions")
.attr("text-anchor", "middle")
.style("font-weight", "bold")
.attr("font-size", "20px")
.style("text-decoration", "underline");

})






