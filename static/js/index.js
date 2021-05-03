
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
            })
          }
    }) 
   
   
}
function PlotYearly(data){
  var svg=d3.select("#BasicGraph")
      margin = 20,
      svg.attr("z-index",5);
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin;
  var xScale = d3.scaleBand().range ([0, width]).padding(0.3),
      yScale = d3.scaleLinear().range ([height, 0]);
      xScale.domain(data.map(function(d) { return d.year; }));
      yScale.domain([0, d3.max(data, function(d) { return d.rain; })]);
var g=svg.append("g")
g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale))
}
d3.csv("../static/DataNotebooks/converted.csv").then((d)=>{
  console.log(d)
  PlotYearly(d)
})
// $("#DateSubmit").on("click",function(){
    
//     LoadData()
// })

// var TheData= "{{ url_for('getData') }}"