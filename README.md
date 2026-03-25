# InsightFlow

Business Insights Tracker is an automated data analysis platform that transforms raw business CSV files into actionable financial and inventory insights. The project features a React-based interactive dashboard and a Flask-powered Python backend for robust data processing.

**Deployed URL**: [https://deft-kulfi-a1904d.netlify.app](https://deft-kulfi-a1904d.netlify.app)

## Features
* **Dynamic File Upload**: Support for drag-and-drop or manual selection of business data files (e.g., `sales.csv`, `products.csv`) which are automatically saved to the backend for processing.
* **Real-time Analytics Dashboard**:
    * **Revenue Tracking**: Visualizes total daily revenue based on processed sales.
    * **Quantity Sold**: Monitors the total volume of products sold.
    * **Category breakdown**: Provides a detailed list of quantities sold per product category.
    * **Average Order Value (AOV)**: Automatically calculates and displays the average value of transactions.
    * **Recent Sales Log**: Lists the latest transactions including date, product name, quantity, and price.
* **Automated Data Processing**: Uses Python and Pandas to merge disparate datasets and maintain historical records in the `processedData` directory.

## Tech Stack

### Frontend
* **Core**: React 19, Vite
* **Styling**: CSS3 with custom components for data cards and upload zones

### Backend
* **Server**: Flask (Python)
* **Security**: Flask-CORS for cross-origin resource sharing
* **Analysis Engine**: Pandas for CSV manipulation and data merging

## API Endpoints
* `POST /upload`: Receives and saves business data files to the `uploads/` folder.
* `GET /getRev`: Returns the latest total revenue entry.
* `GET /getQuan`: Returns the latest total quantity sold entry.
* `GET /getProdTot`: Returns quantities sold summarized by category.
* `GET /getAOV`: Returns the calculated Average Order Value.
* `GET /getLatProd`: Returns the 40 most recent transaction records.

## Project Structure
* **Data-Processing/**: Contains Python scripts (`DataProcessing.py`, `RecieveData.py`) and processed CSV data stores.
* **src/**: React source files including `FileUpload.jsx` for data input and `DisplayCards.jsx` for the metrics dashboard.

## Setup and Installation

### Backend
1. Navigate to the `Data-Processing` folder.
2. Install dependencies:
   ```bash
   pip install flask flask-cors pandas
