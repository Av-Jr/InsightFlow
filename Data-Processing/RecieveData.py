from flask import Flask, request
from flask_cors import CORS
import pandas as pd
from datetime import datetime as dt
from flask import jsonify

app = Flask("__name__")
CORS(app)
import os
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "processedData", "Revenue", "totRev.csv")

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


if __name__ == "__main__":
    app.run(debug=True)