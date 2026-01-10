import mysql from 'mysql2/promise';

export async function getWeatherData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nixa.Said1',
    database: 'smartfarm',
  });
  const [rows] = await connection.execute('SELECT * FROM weather_data ORDER BY date DESC LIMIT 1');
  await connection.end();
  // rows is RowDataPacket[]
  return (Array.isArray(rows) ? rows[0] : null) || null;
}
