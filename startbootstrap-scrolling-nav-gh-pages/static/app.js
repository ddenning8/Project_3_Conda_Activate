// from data.js
var tableData = hdata;
var tbody = d3.select("tbody");

// display data from data.js
function firstTable(alienSightings) {
  var tbody = d3.select("tbody");
  alienSightings.forEach((alien) => {
    var row = tbody.append("tr");
    Object.entries(alien).forEach(([key, value]) => {
        console.log(key,value);
        var cell = row.append("td");
        cell.text(value);
    });
  });
};


   console.log(tableData);
   firstTable(tableData);
   
   var filterButton = d3.select("#filter-btn");
   
   // filter table data on datetime
   filterButton.on("click", function() {
       d3.event.preventDefault();
       d3.select("tbody").selectAll("tr").remove().selectAll("td").remove();
       var inputValue = d3.select("#country").property("value");
       console.log(inputValue) 
       if (inputValue === "" ) {
           // display the whole database if the date field has no date
           var newData = tableData;
   
       } else {
           // otherwise, display the filtered dataset on datetime 
           var newData = tableData.filter(alienSighting => 
             alienSighting.Bedroom == inputValue)
           }
   
      //  if (newData.length == 0) {
      //      alert("There are no houses with this number of bedrooms!");
      //  };
   
     console.log(newData);
     firstTable(newData);
   });

