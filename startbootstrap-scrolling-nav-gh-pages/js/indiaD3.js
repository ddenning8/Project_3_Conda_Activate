// D3 for US States

// set the dimensions and margins of the graph
var width = 520;
var height = 520;

// append the svg object to the body of the page
var svg1 = d3.select("#D3_India_bubble_chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Read data
d3.csv("Resources/india.csv").then(function(data1) {
    for (var i = 0; i < data1.length; i++) {
        var d1 = data1[i];
        // console.log(d.id)
    }

    // Color palette for States?
    var color1 = d3.scaleOrdinal()
        .domain("States")
        .range(d3.schemeSet1);

    // Size scale for Visa Count
    var size1 = d3.scaleLinear()
        .domain([0, 40000])
        .range([3.5, 90]); 
     // create a tooltip
     var Tooltip1 = d3.select("#my_dataviz")
     .append("div")
     .style("opacity", 0)
     .attr("class", "tooltip")
     .style("background-color", "black")
     .style("border", "solid")
     .style("border-width", "5px")
     .style("border-radius", "2px")
     .style("padding", "2px")
    

 // Three function that change the tooltip when user hover / move / leave a cell
 var mouseover1 = function(d1) {
     Tooltip1
         .style("opacity", 1);
 }
 var mousemove1 = function(d1) {
     Tooltip1
         .html('<u>' + d1.id + '</u>' + "<br>" + d1.value + " Visa Requests")
         .style("left", (d3.mouse(this)[0] + 20) + "px")
         .style("top", (d3.mouse(this)[1]) + "px");
 }
 var mouseleave1 = function(d1) {
     Tooltip1
         .style("opacity", 0);
 }

    // Initialize the circle: all located at the center of the svg area
    var node1 = svg1.append("g")
        .selectAll("circle")
        .data(data1)
        .enter()
        .append("circle")
        .attr("class", "node1")
        .attr("r", function(d1) { return size1(d1.value) })
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", function(d1) { return color1(d1.id) })
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 1)
        .on("mouseover", mouseover1) // What to do when hovered
        .on("mousemove", mousemove1)
        .on("mouseleave", mouseleave1)
        .call(d3.drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Features of the forces applied to the nodes:
    var simulation1 = d3.forceSimulation()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.2).radius(function(d1) { return (size1(d1.value) + 3) }).iterations(1)); // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation1
        .nodes(data1)
        .on("tick", function(d1) {
            node1
                .attr("cx", function(d1) { return d1.x; })
                .attr("cy", function(d1) { return d1.y; })
        });

    // What happens when a circle is dragged?
    function dragstarted(d1) {
        if (!d3.event.active) simulation1.alphaTarget(.03).restart();
        d1.fx = d1.x;
        d1.fy = d1.y;
    }

    function dragged(d1) {
        d1.fx = d3.event.x;
        d1.fy = d3.event.y;
    }

    function dragended(d1) {
        if (!d3.event.active) simulation1.alphaTarget(.03);
        d1.fx = null;
        d1.fy = null;
    }

})

// D3 for California Cities
// set the dimensions and margins of the graph
var width = 520;
var height = 520;

// append the svg object to the body of the page
var svg2 = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Read data
d3.csv("Resources/citiesD3.csv").then(function(data2) {
    for (var i = 0; i < data2.length; i++) {
        var d = data2[i];
        // console.log(d.id)
    }


    // Color palette for States?
    var color2 = d3.scaleOrdinal()
        .domain("Cities")
        .range(d3.schemeSet1);

    // Size scale for Visa Count
    var size2 = d3.scaleLinear()
        .domain([0, 8000])
        .range([3.5, 75]);  

    // create a tooltip
    var Tooltip2 = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border", "solid")
        .style("border-width", "5px")
        .style("border-radius", "2px")
        .style("padding", "2px")
       

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover2 = function(d2) {
        Tooltip2
            .style("opacity", 1)
    }
    var mousemove2 = function(d2) {
        Tooltip2
            .html('<u>' + d2.id + '</u>' + "<br>" + d2.Count + " Visa Requests")
            .style("left", (d3.mouse(this)[0] + 20) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave2 = function(d2) {
        Tooltip2
            .style("opacity", 0)
    }

    // Initialize the circle: all located at the center of the svg area
    var node2 = svg2.append("g")
        .selectAll("circle")
        .data(data2)
        .enter()
        .append("circle")
        .attr("class", "node2")
        .attr("r", function(d2) { return size2(d2.Count) })
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", function(d2) { return color2(d2.id) })
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 1)
        .on("mouseover", mouseover2) // What to do when hovered
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave2)
        .call(d3.drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Features of the forces applied to the nodes:
    var simulation2 = d3.forceSimulation()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.2).radius(function(d2) { return (size2(d2.Count) + 3) }).iterations(1)); // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation2
        .nodes(data2)
        .on("tick", function(d) {
            node2
                .attr("cx", function(d2) { return d2.x; })
                .attr("cy", function(d2) { return d2.y; })
        });

    // What happens when a circle is dragged?
    function dragstarted(d2) {
        if (!d3.event.active) simulation2.alphaTarget(.03).restart();
        d2.fx = d2.x;
        d2.fy = d2.y;
    }

    function dragged(d2) {
        d2.fx = d3.event.x;
        d2.fy = d3.event.y;
    }

    function dragended(d2) {
        if (!d3.event.active) simulation2.alphaTarget(.03);
        d2.fx = null;
        d2.fy = null;
    }

})