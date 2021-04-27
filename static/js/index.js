function LoadData(){
    d3.json("getData").then((d)=>{
        console.log(d)
    })
}
LoadData()