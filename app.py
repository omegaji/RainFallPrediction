from flask import Flask, jsonify, render_template,request
import csv
import pandas as pd
import numpy as np
import json
from some_funcs import *

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
modelobj=Forecast()

graph=Visualize()
graph.MonthlyRain(2010, "Arcot")
Districts=["ACS Mill","Alangayam","Ambur",
            "Arakkonam",
            "Arcot",
            "Gudiyatham",
          "Katpadi",
            "Kaveripakkam",
           "Melalathur",
            "Natrampalli",
            "Ponnai",
            "Sholingur",
            "TCS Mill",
            "Tirupattur",
            "VCS Mill",
            "Vaniyambadi",
            "Vellore",
            "Wallajah"]
@app.route('/')
def index():

    return render_template('home.html')

@app.route("/getData",methods = ['POST','GET'])
def getData():
    to_send=""
    if request.method=="POST":
        jsdata=request.json
        print(int(jsdata["dis"]))
        print(Districts[int(jsdata["dis"])])
        modelobj.GetYMD(jsdata["date"], Districts[int(jsdata["dis"])],int(jsdata["dis"]))
        modelobj.GetSparse()
        modelobj.CreateNForecast()
    else:
        to_send=float(modelobj.forecast)
    return jsonify(to_send)
@app.route("/GraphYearlyMonthly",methods = ['POST','GET'])
def graph_yearly_monthly():
    if request.method=="POST":
        jsdata=request.json
        graph.MonthlyRain(int(jsdata["year"]),jsdata["dis"])
        return jsonify("")
    if request.method=="GET":
        
        return jsonify(graph.df_grouped.to_json(orient="split"))

@app.route("/GraphDistrictYearly",methods = ['POST','GET'])
def graph_district_yearly():
    if request.method=="POST":
        jsdata=request.json
        graph.DistrictRain(jsdata["dis"])
        return jsonify("")
    if request.method=="GET":
        
        return jsonify(graph.df_grouped.to_json(orient="split"))

@app.route("/GraphSumYearly",methods = ['POST','GET'])
def graph_sum_yearly():
    if request.method=="POST":
        jsdata=request.json
        graph.SumMonthlyRain(int(jsdata["year"]), jsdata["dis"])
        return jsonify("")
    if request.method=="GET":
        return jsonify(graph.df_grouped.to_json(orient="split"))

@app.route("/GraphSumDistrict",methods = ['POST','GET'])
def graph_sum_district():
    if request.method=="POST":
        jsdata=request.json
        graph.SumDistrictRain(jsdata["dis"])
        return jsonify("")
    if request.method=="GET":
        
        return jsonify(graph.df_grouped.to_json(orient="split"))
if __name__ == '__main__':
        app.run(debug=True)