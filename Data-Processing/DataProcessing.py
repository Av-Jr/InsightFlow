import pandas as pd
from datetime import datetime as dt
now = dt.now()
salesDf = pd.read_csv('./uploads/sales.csv', usecols=['product_id', 'quantity'])
prodsDf = pd.read_csv('./uploads/products.csv', usecols=['Product_ID', 'Price'])
QSprods = pd.read_csv("./uploads/products.csv", usecols=['Product_ID', 'Category_ID'])
QScats = pd.read_csv("./uploads/category.csv", usecols=['category_id', 'category_name'])
LSsales = pd.read_csv("./uploads/sales.csv", usecols=["sale_date", "product_id", "quantity"])
LSprods = pd.read_csv("./uploads/products.csv", usecols=["Product_ID", "Product_Name", "Price"])

totRev = pd.read_csv('./processedData/REVENUE/totRev.csv')
totQS = pd.read_csv("./processedData/QuantitySold/totQuanSold.csv")


def revenueUpdate():
    global totRev
    mergedDf = pd.merge(salesDf, prodsDf, left_on="product_id", right_on="Product_ID")
    cleanDf = mergedDf[["Product_ID", "quantity", "Price"]]
    cleanDf["Revenue PP"] = cleanDf["quantity"]*cleanDf["Price"]
    totalRev = cleanDf["Revenue PP"].sum(axis=0)
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

def QuanSold():
    global totQS
    mergedDf = pd.merge(salesDf, QSprods, left_on="product_id", right_on="Product_ID")
    mergedDf = pd.merge(QScats, mergedDf.groupby("Category_ID")['quantity'].sum(), left_on="category_id", right_on="Category_ID")
    totQInt = mergedDf["quantity"].sum(axis=0)
    mergedDf.to_csv(f"./processedData/QuantitySold/{now.month}.csv")
    mask = pd.to_datetime(totQS["Date"]).dt.date == now.date()
    if mask.any():
        if totQS.loc[mask, "quantity"].values[0] != totQInt:
            totQS.loc[mask, "quantity"] = totQInt
    else:
        QSnewData = pd.DataFrame({
            "Date" : [now.date()],
            "quantity" : [totQInt]
        })
        totQS = pd.concat([totQS, QSnewData])
    totQS.to_csv("./processedData/QuantitySold/totQuanSold.csv", index=False)

QuanSold()


def latestSales():
    LSsales["sale_date"] = pd.to_datetime(LSsales["sale_date"])
    LSsales.sort_values(by="sale_date", ascending=False, inplace=True)
    LSsales.reset_index(drop=True, inplace=True)
    mergePrName = pd.merge(LSsales, LSprods, left_on="product_id", right_on="Product_ID", how="left")
    neededDf = mergePrName[["sale_date", "Product_Name", "quantity", "Price"]]
    neededDf = neededDf[0:40]
    neededDf.to_csv(f"./processedData/LatestSoldProds/{now.month}.csv")
    print(neededDf)

latestSales()