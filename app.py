from flask import Flask, jsonify, render_template
import csv
import pandas as pd
import numpy as np

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('home.html')

@app.route("/getData")
def getData():

    return jsonify([1,2,3])
if __name__ == '__main__':
        app.run(debug=True)