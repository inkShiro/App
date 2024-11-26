const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000; // Usar el puerto de la variable de entorno o 5000 por defecto

// Configuración de CORS para permitir solicitudes desde dominios específicos (ajustar según sea necesario)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://mi-dominio.com' : '*', // Ajusta el dominio según el entorno
};
app.use(cors(corsOptions));

// Usar JSON para manejar solicitudes con cuerpo
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
  // Crear tabla de servicios
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

  // Crear tabla de beneficios
  db.run(`
    CREATE TABLE IF NOT EXISTS benefits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear la tabla de beneficios:', err.message);
    }
  });

  // Crear tabla de contactos
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      message TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear la tabla de contactos:', err.message);
    }
  });

  // Insertar datos iniciales en la tabla de servicios si está vacía
  db.get("SELECT COUNT(*) AS count FROM services", (err, row) => {
    if (err) {
      console.error("Error al contar servicios:", err.message);
    } else if (row.count === 0) {
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

  // Insertar datos iniciales en la tabla de beneficios si está vacía
  db.get("SELECT COUNT(*) AS count FROM benefits", (err, row) => {
    if (err) {
      console.error("Error al contar beneficios:", err.message);
    } else if (row.count === 0) {
      db.run(`
        INSERT INTO benefits (name, description) VALUES 
        ('Beneficio 1', 'Descripción del beneficio 1'),
        ('Beneficio 2', 'Descripción del beneficio 2'),
        ('Beneficio 3', 'Descripción del beneficio 3')
      `, (insertErr) => {
        if (insertErr) {
          console.error("Error al insertar los datos de beneficios:", insertErr.message);
        } else {
          console.log("Datos iniciales de beneficios insertados correctamente.");
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

// Ruta para obtener los beneficios
app.get('/api/benefits', (req, res) => {
  db.all('SELECT * FROM benefits', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Ruta para obtener todos los contactos
app.get('/api/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: 'No se encontraron contactos' });
    }
  });
});

// Ruta para crear o actualizar los datos de contacto de un usuario
app.post('/api/contacts', (req, res) => {
  const { user_id, name, email, phone, address, message } = req.body;

  // Verificamos si el usuario ya tiene datos de contacto
  db.get('SELECT * FROM contacts WHERE user_id = ?', [user_id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      // Si ya existe, actualizamos los datos
      db.run(`
        UPDATE contacts SET name = ?, email = ?, phone = ?, address = ?, message = ? WHERE user_id = ?
      `, [name, email, phone, address, message, user_id], (updateErr) => {
        if (updateErr) {
          res.status(500).json({ error: updateErr.message });
        } else {
          res.json({ message: 'Datos de contacto actualizados correctamente' });
        }
      });
    } else {
      // Si no existe, insertamos un nuevo registro
      db.run(`
        INSERT INTO contacts (user_id, name, email, phone, address, message) VALUES (?, ?, ?, ?, ?, ?)
      `, [user_id, name, email, phone, address, message], (insertErr) => {
        if (insertErr) {
          res.status(500).json({ error: insertErr.message });
        } else {
          res.json({ message: 'Datos de contacto creados correctamente' });
        }
      });
    }
  });
});

// Servir los archivos estáticos de la aplicación React cuando está en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Cualquier otra ruta que no sea una API, se redirige al index.html de React
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
