from flask import Flask, request
from flask_cors import CORS
import pandas as pd
from datetime import datetime as dt
from flask import jsonify

app = Flask("__name__")
CORS(app)
now = dt.now()
import os
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "processedData", "Revenue", "totRev.csv")
QuanCSV_PATH = os.path.join(BASE_DIR, "processedData", "QuantitySold", "totQuanSold.csv")
ProdCSV_PATH = os.path.join(BASE_DIR, "processedData", "QuantitySold", f"{now.month}.csv")
LPCSV_PATH = os.path.join(BASE_DIR, "processedData", "LatestSoldProds", f"{now.month}.csv")

@app.route("/upload", methods=["POST"])
def upload_files():
    files = request.files.getlist("files")
    for f in files:
        f.save(os.path.join(UPLOAD_FOLDER, f.filename))
    print("Files saved to:", UPLOAD_FOLDER)
    return {"message": f"{len(files)} file(s) received"}

@app.route("/getRev", methods=["GET"])
def getRev():
    RevFile = pd.read_csv(CSV_PATH)
    RevFile["Date"] = pd.to_datetime(RevFile["Date"])
    latestEntry = RevFile.loc[RevFile["Date"] == RevFile["Date"].max(), "TotalRev"].values[0]
    return jsonify({"LatestRevenue" : int(latestEntry)})

@app.route("/getQuan", methods=["GET"])
def getQuan():
    QuanFile = pd.read_csv(QuanCSV_PATH)
    QuanFile["Date"] = pd.to_datetime(QuanFile["Date"])
    latestEntry = QuanFile.loc[QuanFile["Date"] == QuanFile["Date"].max(), "quantity"].values[0]
    return jsonify({"LatestQuantity" : int(latestEntry)})

@app.route("/getProdTot", methods=["GET"])
def ProductsSold():
    totProd = pd.read_csv(ProdCSV_PATH)
    data = totProd.to_dict(orient="records")
    return jsonify(data)

@app.route("/getAOV", methods=["GET"])
def AOV():
    QuanFile = pd.read_csv(QuanCSV_PATH)
    QuanFile["Date"] = pd.to_datetime(QuanFile["Date"])
    latestEntryQ = QuanFile.loc[QuanFile["Date"] == QuanFile["Date"].max(), "quantity"].values[0]
    RevFile = pd.read_csv(CSV_PATH)
    RevFile["Date"] = pd.to_datetime(RevFile["Date"])
    latestEntryR = RevFile.loc[RevFile["Date"] == RevFile["Date"].max(), "TotalRev"].values[0]
    return jsonify({"LatestAOV" : int(latestEntryR / latestEntryQ)})

@app.route("/getLatProd", methods=["GET"])
def LatProd():
    LPfile = pd.read_csv(LPCSV_PATH)
    data = LPfile.to_dict(orient="records")
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)