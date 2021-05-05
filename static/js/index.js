
function precise(x) {
    return Number.parseFloat(x).toPrecision(2);
  }
function LoadData(){
    console.log("OVER HERE")
    let date=$("#DateInput").val()
    let district=$("#DistrictInput").val()

    let flaskdata={"date":date,"dis":district}

    $.ajax({
        type:"POST",
        url:"/getData",
        contentType: 'application/json;charset=UTF-8',
        data:JSON.stringify(flaskdata),
        success:function(data) {
            d3.json("/getData").then((d)=>{
               let x=precise( d)
               let out=String(x)+"mm"
               $("#forecastOutput").text(out)
               if(parseFloat(out)<1){
                 console.log("done")
                 $("#fimg").addClass("fadeout")
                 $("#fimg").attr("src","/static/images/sunny.svg")
                 $("#fimg").addClass("fadein")
                 $("#fimg").addClass("sun")

                 $("#fimg").removeClass("fadeout")


               }
               else{
                $("#fimg").addClass("fadeout")
                $("#fimg").attr("src","/static/images/rainy.svg")
                $("#fimg").addClass("fadein")
                $("#fimg").removeClass("sun")

                $("#fimg").removeClass("fadeout")

               }
            })
          }
    }) 
   
   
}

//###############################################HERE ARE THE GRAPHS
function PlotYearly(data){
  
  d3.selectAll(".headerg").remove()
  d3.selectAll(".bar").remove()
  if(data.length==0){

  }
var svg=d3.select("#BasicGraph")
  
 margin = 20,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin;
  var xScale = d3.scaleBand().range([0, width]).padding(0.3),
      yScale = d3.scaleLinear().range([height, 0]);
      xScale.domain(data.map(function(d) { return d[2]; }));
      yScale.domain([0, d3.max(data, function(d) { return d[3]; })]);
var g=svg.append("g").attr("class","headerg")
g.append("g")
  .attr("transform", "translate(20," + height + ")")
  .call(d3.axisBottom(xScale))
g.append("g")
  .attr("transform", "translate(24,10)")
  .call(d3.axisLeft(yScale))

  g.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return xScale(d[2]); })
  .attr("y", function(d) { return yScale(d[3]); })
  .attr("width", xScale.bandwidth())
  .attr("fill","#f5ec42")
  .attr("transform", "translate(20,0)")

  .attr("height", function(d) {return height - yScale(d[3]); });
}

function PlotYearly3(data){

  d3.selectAll(".headerg3").remove()
  d3.selectAll(".bar3").remove()
  if(data.length==0){

  }
var svg=d3.select("#Graph3")
  
 margin = 20,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin;
  var xScale = d3.scaleBand().range([0, width]).padding(0.3),
      yScale = d3.scaleLinear().range([height, 0]);
      xScale.domain(data.map(function(d) { return d[2]; }));
      yScale.domain([0, d3.max(data, function(d) { return d[3]; })]);
var g=svg.append("g").attr("class","headerg3")
g.append("g")
  .attr("transform", "translate(20," + height + ")")
  .call(d3.axisBottom(xScale))
g.append("g")
  .attr("transform", "translate(24,10)")
  .call(d3.axisLeft(yScale))

  g.selectAll(".bar3")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar3")
  .attr("x", function(d) { return xScale(d[2]); })
  .attr("y", function(d) { return yScale(d[3]); })
  .attr("width", xScale.bandwidth())
  .attr("fill","#f5ec42")
  .attr("transform", "translate(20,0)")

  .attr("height", function(d) {return height - yScale(d[3]); });
}

function PlotDistrictYearly(data){

  d3.selectAll(".headerg2").remove()
  d3.selectAll(".bar2").remove()
  if(data.length==0){

  }
  var svg=d3.select("#Graph2")
      margin = 20,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin;
  var xScale = d3.scaleBand().range([0, width]).padding(0.3),
      yScale = d3.scaleLinear().range([height, 0]);
      xScale.domain(data.map(function(d) { return d[1]; }));
      yScale.domain([0, d3.max(data, function(d) { return d[2]; })]);
var g=svg.append("g").attr("class","headerg2")
g.append("g")
  .attr("transform", "translate(20," + height + ")")
  .call(d3.axisBottom(xScale))
g.append("g")
  .attr("transform", "translate(25,10)")
  .call(d3.axisLeft(yScale))

  g.selectAll(".bar2")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar2")
  .attr("x", function(d) { return xScale(d[1]); })
  .attr("y", function(d) { return yScale(d[2]); })
  .attr("width", xScale.bandwidth())
  .attr("fill","#f5ec42")
  .attr("transform", "translate(20,0)")

  .attr("height", function(d) {return height - yScale(d[2]); });

}


function PlotDistrictYearly4(data){
  d3.selectAll(".headerg4").remove()
  d3.selectAll(".bar4").remove()
  if(data.length==0){

  }
  var svg=d3.select("#Graph4")
      margin = 20,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin;
  var xScale = d3.scaleBand().range([0, width]).padding(0.3),
      yScale = d3.scaleLinear().range([height, 0]);
      xScale.domain(data.map(function(d) { return d[1]; }));
      yScale.domain([0, d3.max(data, function(d) { return d[2]; })]);
var g=svg.append("g").attr("class","headerg4")
g.append("g")
  .attr("transform", "translate(20," + height + ")")
  .call(d3.axisBottom(xScale))
g.append("g")
  .attr("transform", "translate(25,10)")
  .call(d3.axisLeft(yScale))

  g.selectAll(".bar4")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar4")
  .attr("x", function(d) { return xScale(d[1]); })
  .attr("y", function(d) { return yScale(d[2]); })
  .attr("width", xScale.bandwidth())
  .attr("fill","#f5ec42")
  .attr("transform", "translate(20,0)")

  .attr("height", function(d) {return height - yScale(d[2]); });
}

//########################################################HERE ARE THE BUTTON EVENTS

$("#graph_1_submit").on("click",()=>{
  let district=$("#graph_district option:selected").text()
  let year=$("#graph_year option:selected").text()
  $.ajax({
    type:"POST",
    url:"/GraphYearlyMonthly",
    contentType: 'application/json;charset=UTF-8',
    data:JSON.stringify({"dis":district,"year":year}),
    success:function(data) {
      d3.json("/GraphYearlyMonthly").then((d)=>{
        console.log(JSON.parse(d))
      
        PlotYearly(JSON.parse(d).data)
        
      })
        
      }
}) 


  

})


$("#graph_2_submit").on("click",()=>{
  let district=$("#graph_district_2 option:selected").text()
  $.ajax({
    type:"POST",
    url:"/GraphDistrictYearly",
    contentType: 'application/json;charset=UTF-8',
    data:JSON.stringify({"dis":district}),
    success:function(data) {
      d3.json("/GraphDistrictYearly").then((d)=>{
        console.log(JSON.parse(d))
      
        PlotDistrictYearly(JSON.parse(d).data)
        
      })
        
      }
}) 


  

})

$("#graph_3_submit").on("click",()=>{
  let district=$("#graph_district_3 option:selected").text()
  let year=$("#graph_year_3 option:selected").text()
  $.ajax({
    type:"POST",
    url:"/GraphSumYearly",
    contentType: 'application/json;charset=UTF-8',
    data:JSON.stringify({"dis":district,"year":year}),
    success:function(data) {
      d3.json("/GraphSumYearly").then((d)=>{
        console.log(JSON.parse(d))
      
        PlotYearly3(JSON.parse(d).data)
        
      })
        
      }
}) 
})

$("#graph_4_submit").on("click",()=>{
  let district=$("#graph_district_4 option:selected").text()
  $.ajax({
    type:"POST",
    url:"/GraphSumDistrict",
    contentType: 'application/json;charset=UTF-8',
    data:JSON.stringify({"dis":district}),
    success:function(data) {
      d3.json("/GraphSumDistrict").then((d)=>{
        console.log(JSON.parse(d))
      
        PlotDistrictYearly4(JSON.parse(d).data)
        
      })
        
      }
}) 
})
// ############################################################### Some basic interactions
$(".wand-icon").on("click",()=>{
  console.log("its clicked  ")

  $(".tab1").toggleClass("tabinvisible")
  $(".tab2").toggleClass("tabinvisible")
  $(".tab1").toggleClass("tabvisible")

})

$(".graph-icon").on("click",()=>{
  console.log("its clicked  ")

  $(".tab1").toggleClass("tabinvisible")
  $(".tab2").toggleClass("tabinvisible")

 $(".tab2").toggleClass("tabvisible")
})

d3.json("/GraphYearlyMonthly").then((d)=>{
  console.log(JSON.parse(d))

  PlotYearly(JSON.parse(d).data)
  
})