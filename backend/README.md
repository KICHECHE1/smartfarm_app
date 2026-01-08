# Smart Farming Advisory App Backend

This backend provides REST API endpoints for the Smart Farming Advisory App, powered by MySQL and CSV imports from authoritative sources:

| Category      | Source              |
| ------------- | ------------------- |
| Weather       | NASA POWER, NOAA    |
| Soil          | ISRIC SoilGrids     |
| Crop Advice   | FAOSTAT, MoA Kenya  |
| Market Prices | Kenya Open Data     |
| Maps          | OpenStreetMap       |
| Backend       | MySQL + CSV Imports |

## Setup

1. Install dependencies:
   ```bash
   npm install express cors mysql2
   ```
2. Create a MySQL database named `smartfarm` and import CSV data into the respective tables:
   - `weather`, `soil`, `crop_advice`, `market_prices`, `knowledge`, `farm_records`, `pest_alerts`, `crops`, `maps`
3. Update the MySQL credentials in `server.js`.
4. Start the backend:
   ```bash
   node server.js
   ```

## Endpoints
- `/api/weather`
- `/api/soil`
- `/api/crop-advice`
- `/api/market-prices`
- `/api/knowledge`
- `/api/farm-records`
- `/api/pest-alerts`
- `/api/crops`
- `/api/maps`

## Data Import
- Use CSV files from NASA POWER, NOAA, ISRIC, FAOSTAT, MoA Kenya, Kenya Open Data, and OpenStreetMap.
- Import using MySQL Workbench, CLI, or scripts.

## Example Table Schema
```sql
CREATE TABLE weather (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  temp FLOAT,
  rainfall FLOAT,
  humidity FLOAT,
  wind FLOAT,
  description VARCHAR(255)
);
-- Repeat for other tables as needed
```

---
This backend is designed for local and cloud deployment. Update endpoints and security as needed for production.
