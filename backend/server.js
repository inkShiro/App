// backend/server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000; // Puerto donde correrá tu servidor

// Permitir solicitudes de cualquier origen (modificar según el entorno de seguridad)
app.use(cors()); 

// Usar JSON para manejar solicitudes con cuerpo (si es necesario)
app.use(express.json()); 

// Ruta para la base de datos
const dbPath = path.join(__dirname, 'vehiculos.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Crear tablas si no existen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear la tabla de servicios:', err.message);
    }
  });

  // Insertar algunos datos iniciales si la tabla está vacía
  db.get("SELECT COUNT(*) AS count FROM services", (err, row) => {
    if (err) {
      console.error("Error al contar servicios:", err.message);
    } else if (row.count === 0) {
      // Solo insertar datos si no hay registros
      db.run(`
        INSERT INTO services (name, description, price) VALUES 
        ('Cambio de Aceite', 'Reemplazo de aceite y filtro', 50.00),
        ('Revisión de Frenos', 'Chequeo y reemplazo de frenos', 100.00),
        ('Cambio de Neumáticos', 'Reemplazo de neumáticos por nuevos', 300.00)
      `, (insertErr) => {
        if (insertErr) {
          console.error("Error al insertar los datos:", insertErr.message);
        } else {
          console.log("Datos iniciales insertados correctamente.");
        }
      });
    }
  });
});

// Ruta para obtener los servicios
app.get('/api/services', (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
