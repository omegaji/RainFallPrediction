import pandas as pd
import xgboost as xgb
import pickle
import numpy as np
def isRain(x):
    if x>100:
        return 5
    if x>50:
        return 4
    if x>25:
        return 3
    if x>2:
        return 2
    elif x!=0:
        return 1
 
    else:
        return 0
class Forecast():
    def __init__(self):
        self.forecast=0
        self.SparseArray=np.zeros(8)
        self.xgb=xgb.XGBRegressor(objective ='reg:squarederror',    
                  n_estimators =3, seed = 123,max_depth=35,eta=0.3)
        self.xgb.load_model("models/modelsxgb.json")
        with open("models/DayMon.json","rb") as fp:
            self.DayMonth=pickle.load(fp)
    def GetYMD(self,date_val,District,District_index):
        self.District=District
        self.DistrictIndex=District_index
        self.year=date_val.split("-")[0]
        self.day=date_val.split("-")[2]
        self.month=date_val.split("-")[1]
        if self.month[0]=="0":
            self.month=self.month[1]
        if self.day[0]=="0":
            self.day=self.day[1]
    def GetSparse(self):

        daymonth=str(self.District)+"_"+str(self.day)+"_"+str(self.month)
        for k in range(1,9):

            if k<len(self.DayMonth[daymonth]):
                val=self.DayMonth[daymonth][-k]
            else:
                val=0
            final=isRain(val)
            self.SparseArray[k-1]=final

    def CreateNForecast(self):
        self.Input=[int(self.month),int(self.day),int(self.year)]
        for i in self.SparseArray:
            self.Input.append(int(i))
        templist=[0]*18
        templist[self.DistrictIndex]=1
        self.Input.extend(templist)
        print(np.array([np.array(self.Input)]))
        self.forecast=self.xgb.predict(np.array([np.array(self.Input)]))[0]
        if self.forecast<0.18:
            self.forecast=0

class Visualize():
    def __init__(self):
        self.district=""
        self.year=0
        self.month=0
        self.day=0
        self.df=pd.read_csv("static/DataNotebooks/converted.csv")
    def MonthlyRain(self,year,district):
        print(district)
        self.df_grouped=self.df.groupby(["District","year","month"]).mean().reset_index()
        self.df_grouped=self.df_grouped[(self.df_grouped["year"]==year)&(self.df_grouped["District"]==district)]
    def DistrictRain(self,district):
        self.df_grouped2=self.df.groupby(["District","year"]).mean().reset_index()
        self.df_grouped2=self.df_grouped2[(self.df_grouped2["District"]==district)]
    def SumMonthlyRain(self,year,district):
        self.df_grouped3=self.df.groupby(["District","year","month"]).sum().reset_index()
        self.df_grouped3=self.df_grouped3[(self.df_grouped3["year"]==year)&(self.df_grouped3["District"]==district)]

    def SumDistrictRain(self,district):
        self.df_grouped4=self.df.groupby(["District","year"]).sum().reset_index()
        self.df_grouped4=self.df_grouped4[(self.df_grouped4["District"]==district)]

        