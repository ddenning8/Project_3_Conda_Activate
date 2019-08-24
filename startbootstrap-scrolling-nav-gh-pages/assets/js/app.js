// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = 960;
    var svgHeight = 600;
  
    var margin = {
      top: 50,
      bottom: 80,
      right: 50,
      left: 100
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
  
    // Append SVG element
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Read CSV
    d3.csv("startbootstrap-scrolling-nav-gh-pages/assets/data/data.csv")
      .then(function(healthData) {
  
  
        // parse data
        healthData.forEach(function(data) {
          data.testing = +data.testing;
          data.data = +data.data;
        });
  
        // create scales
        var xLinearScale = d3.scaleLinear()
            .domain([65, d3.max(healthData, d => d.testing)])
            .range([0, width]);
  
        var yLinearScale = d3.scaleLinear()
            .domain([d3.min(healthData, d => d.data), 4000])
            .range([height, 0]);
  
        // create axes
        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale);
  
        // append axes
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
  
        chartGroup.append("g")
            .call(yAxis);
  

        // append circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(healthData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.testing))
            .attr("cy", d => yLinearScale(d.data))
            .attr("r", "10")
            .attr("fill", "coral")
            // .attr("fill", function(d) {
            //   if (d.region == 0) {
            //     return "#1f77b4";
            //   } else if (d.region == 1) {
            //     return "#7f7f7f";
            //   } else if (d.region == 2) {
            //     return "#2ca02c";
            //   } else if (d.region == 3) {
            //     return "#e377c2";
            //   } else if (d.region == 4) {
            //     return "#8c564b";
            //   } else if (d.region == 5) {
            //     return "#bcbd22";
            //   } else if (d.region == 6) {
            //     return "#ff7f0e";
            //   } else if (d.region == 7) {
            //     return "#17becf";
            //   } else if (d.region == 8) {
            //     return "#d62728";
            //   } else if (d.region == 9) {
            //     return "#9467bd";
            //   }
            //   return "black";
            // })
            // .attr("stroke-width", "1")
            // .attr("opacity", "1")
            // .attr("stroke", "none");

        var circleLabels = chartGroup.selectAll(null).data(healthData).enter().append("text");

        circleLabels
            .attr("x", function(d) {
                return xLinearScale(d.testing);
            })
            .attr("y", function(d) {
                return yLinearScale(d.data);
            })
            // .text(function(d) {
            //     return d.abbr;
            // })
            // .attr("font-family", "sans-serif")
            // .attr("font-size", "12px")
            // .attr("dx", "-.65em")
            // .attr("dy", ".35em")
            // .attr("text-anchor", "center")
            // .attr("fill", "white");

        // Create axes labels
        chartGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left + 60)
          .attr("x", 0 - (height / 1.5))
          .attr("class", "axisText")
          .text("Data Count");

        chartGroup.append("text")
          .attr("transform", `translate(${width / 2 - 25}, ${height + margin.top})`)
          .attr("class", "axisText")
          .text("Testing Accuracy (%)");


        // Step 1: Initialize Tooltip
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
                return `<strong>${d.Country}</strong><br>Testing(%): ${d.testing}<br>Data Count: ${d.data}<br>`;
            });
  
        // Step 2: Create the tooltip in chartGroup.
        chartGroup.call(toolTip);
  
        // Step 3: Create "mouseover" event listener to display tooltip
        circlesGroup.on("mouseover", function(d) {
          toolTip.show(d, this);
        })
        // Step 4: Create "mouseout" event listener to hide tooltip
          .on("mouseout", function(d) {
            toolTip.hide(d);
          });

      });
  }
  
  // When the browser loads, makeResponsive() is called.
  makeResponsive();
  
  // When the browser window is resized, makeResponsive() is called.
  d3.select(window).on("resize", makeResponsive);
  