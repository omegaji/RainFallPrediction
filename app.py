from flask import Flask, jsonify, render_template,request
import csv
import pandas as pd
import numpy as np
import json
from some_funcs import *

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
modelobj=Forecast()
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
    #GetYMD(date_val)
    return jsonify(to_send)
if __name__ == '__main__':
        app.run(debug=True)