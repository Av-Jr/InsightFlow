import pandas as pd
from datetime import datetime as dt

salesDf = pd.read_csv('./uploads/sales.csv', usecols=['product_id', 'quantity'])
prodsDf = pd.read_csv('./uploads/products.csv', usecols=['Product_ID', 'Price'])
totRev = pd.read_csv('./processedData/REVENUE/totRev.csv')

def revenueUpdate():
    global totRev
    mergedDf = pd.merge(salesDf, prodsDf, left_on="product_id", right_on="Product_ID")
    cleanDf = mergedDf[["Product_ID", "quantity", "Price"]]
    cleanDf["Revenue PP"] = cleanDf["quantity"]*cleanDf["Price"]
    totalRev = cleanDf["Revenue PP"].sum(axis=0)
    now = dt.now()
    totRevData = pd.DataFrame({
        "Date" : [now.date()],
        "Month" : [now.month],
        "TotalRev" : [totalRev]
    })
    mask = pd.to_datetime(totRev["Date"]).dt.date == now.date()
    if mask.any():
        if totRev.loc[mask, "TotalRev"].values[0] != totalRev:
            totRev.loc[mask, "TotalRev"] = totalRev
    else:
        totRev = pd.concat([totRev, totRevData])
    totRev.to_csv("./processedData/REVENUE/totRev.csv", index=False)

revenueUpdate()