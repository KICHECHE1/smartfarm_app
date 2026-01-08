// Express backend for Smart Farming Advisory App
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// MySQL connection (update with your credentials)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nixa.Said1',
    database: 'smartfarm'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
});

// Weather endpoint (NASA POWER/NOAA data imported to MySQL)
app.get('/api/weather', (req, res) => {
    db.query('SELECT * FROM weather ORDER BY date DESC LIMIT 1', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0]);
    });
});

// Soil endpoint (ISRIC SoilGrids data imported to MySQL)
app.get('/api/soil', (req, res) => {
    db.query('SELECT * FROM soil ORDER BY date DESC LIMIT 1', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0]);
    });
});

// Crop advice endpoint (FAOSTAT/MoA Kenya data imported to MySQL)
app.get('/api/crop-advice', (req, res) => {
    db.query('SELECT * FROM crop_advice ORDER BY date DESC LIMIT 5', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Market prices endpoint (Kenya Open Data imported to MySQL)
app.get('/api/market-prices', (req, res) => {
    db.query('SELECT * FROM market_prices ORDER BY date DESC LIMIT 10', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Knowledge endpoint (CSV/Manual import)
app.get('/api/knowledge', (req, res) => {
    db.query('SELECT * FROM knowledge', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Farm records endpoint
app.get('/api/farm-records', (req, res) => {
    db.query('SELECT * FROM farm_records ORDER BY date DESC LIMIT 20', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Pest alerts endpoint
app.get('/api/pest-alerts', (req, res) => {
    db.query('SELECT * FROM pest_alerts ORDER BY date DESC LIMIT 10', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Crop tracking endpoint
app.get('/api/crops', (req, res) => {
    db.query('SELECT * FROM crops', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Map data endpoint (OpenStreetMap data imported to MySQL or static GeoJSON)
app.get('/api/maps', (req, res) => {
    db.query('SELECT * FROM maps', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

// Example MySQL table creation for CSV imports
// Run these in MySQL Workbench or CLI before importing CSVs
/*
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  role VARCHAR(50)
);
CREATE TABLE farms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100),
  location VARCHAR(100),
  size FLOAT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE crops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT,
  name VARCHAR(100),
  stage VARCHAR(50),
  health VARCHAR(50),
  harvest_date DATE,
  FOREIGN KEY (farm_id) REFERENCES farms(id)
);
CREATE TABLE weather_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  temp FLOAT,
  rainfall FLOAT,
  humidity FLOAT,
  wind FLOAT,
  description VARCHAR(255)
);
CREATE TABLE alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50),
  message VARCHAR(255),
  urgency VARCHAR(20),
  date DATE
);
CREATE TABLE ai_recommendations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT,
  recommendation TEXT,
  date DATE,
  FOREIGN KEY (farm_id) REFERENCES farms(id)
);
CREATE TABLE pest_disease_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT,
  pest VARCHAR(100),
  severity VARCHAR(20),
  advice TEXT,
  date DATE,
  FOREIGN KEY (farm_id) REFERENCES farms(id)
);
CREATE TABLE knowledge_base (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  summary TEXT,
  date DATE
);
CREATE TABLE farm_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT,
  crop VARCHAR(100),
  planted DATE,
  harvested DATE,
  yield FLOAT,
  reviewed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (farm_id) REFERENCES farms(id)
);
CREATE TABLE market_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  crop VARCHAR(100),
  price VARCHAR(50),
  market VARCHAR(100),
  date DATE
);
*/