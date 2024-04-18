const mysql = require('mysql');
const cors = require('cors');
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'proyecto1'
});

const fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'

// Conexión a la base de datoss
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base sde datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Realizar consultas o ejecutar operaciones en la base de datos
// Ejemplo:
connection.query('SELECT id FROM habitacion1', (error, results, fields) => {
  if (error) {
    console.error('Error al realizar la consulta:', error);
    return;
  }
  console.log('Resultados de la consulta:', results);
});

// Cerrar la conexión a la base de datos cuando hayas terminado
// const newData = {
//   posicion1: '1',
//   posicion2: '0',
//   posicion3: '0',
//   posicion4: '0',
//   posicion5:'0',
//   posicion6: '0',
//   posicion7: '0',
//   posicion8: '0',
//   posicion9: '0',
//   posicion10: '0',
//   posicion11: '0',
//   posicion12: '0',
//   posicion13: '0',
//   posicion14: '0',
//   posicion15:'0',
//   posicion16: '0',
//   // Otros campos y valores
//   fecha: '2024-04-18', // Fecha actual o la que desees insertar
//   hora: '13:52:00' // Hora actual o la que desees insertar
// };

// // Realiza la inserción en la tabla Habitacion1
// connection.query('INSERT INTO habitacion1 SET ?', newData, (error, results, fields) => {
//   if (error) {
//     console.error('Error al realizar la inserción:', error);
//     return;
//   }
//   console.log('Datos insertados correctamente:', results);
// });

// Configuración de bodyParser para analizar el cuerpo de las solicitudes JSON
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(cors());

app.use(bodyParser.json());

// Ruta para manejar la solicitud desde el frontend
app.get('/habitacion1', (req, res) => {
  // Realiza la consulta a la base de datos y devuelve los datos de las habitaciones
  connection.query('SELECT * FROM habitacion1 WHERE fecha = ?', [fechaActual], (error, results, fields) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).send('Error al obtener los datos de las habitaciones');
      return;
    }
    res.json(results);
  });
});
// Ruta para manejar la solicitud desde el frontend

app.get('/habitacion2', (req, res) => {
  // Realiza la consulta a la base de datos y devuelve los datos de las habitaciones para el día de hoy
  connection.query('SELECT * FROM habitacion2 WHERE fecha = ?', [fechaActual], (error, results, fields) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).send('Error al obtener los datos de las habitaciones');
      return;
    }
    res.json(results);
  });
});

app.get('/habitacion3', (req, res) => {
  // Realiza la consulta a la base de datos y devuelve los datos de las habitaciones para el día de hoy
  connection.query('SELECT * FROM habitacion3 WHERE fecha = ?', [fechaActual], (error, results, fields) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).send('Error al obtener los datos de las habitaciones');
      return;
    }
    res.json(results);
  });
});

// Puerto en el que se ejecutará el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});



