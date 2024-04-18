import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeatmapGrid from 'react-heatmap-grid';
import Ventana from './ventana'; // Asumiendo que el nombre del archivo y el componente es Ventana con mayúscula inicial

function App() {
  const [habitacion1Data, setHabitacion1Data] = useState([]);
  const [habitacion2Data, setHabitacion2Data] = useState([]);
  const [habitacion3Data, setHabitacion3Data] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response1 = await axios.get('http://localhost:3001/habitacion1');
        const response2 = await axios.get('http://localhost:3001/habitacion2');
        const response3 = await axios.get('http://localhost:3001/habitacion3');
        setHabitacion1Data(response1.data);
        setHabitacion2Data(response2.data);
        setHabitacion3Data(response3.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    // Llama a la función para obtener datos al cargar la página
    obtenerDatos();

    // Establece un temporizador para actualizar los datos cada 10 segundos
    const interval = setInterval(() => {
      obtenerDatos();
    }, 10000);

    // Retorna una función de limpieza para detener el temporizador cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []); 

   // Se ejecuta solo al montar el componente
  // Función para calcular el porcentaje de registros para cada posición de una habitación
    const calcularPorcentaje = (habitacionData, posicion) => {
    const totalRegistros = habitacionData.length;
    const conteo = habitacionData.reduce((total, item) => total + parseInt(item[posicion]), 0);
    return (conteo / totalRegistros) * 100;
  };

  // Función para asignar colores basados en el porcentaje de registros para cada posición
  const asignarColor = (porcentaje) => {
    // Asignar colores basados en los rangos de porcentajes especificados
    if (porcentaje === 0 || undefined) {
      return 'green';
    }else if (porcentaje <= 10) {
      return 'lightgreen'; // 0-10%: verde claro
    } else if (porcentaje <= 20) {
      return 'yellow'; // 11-20%: amarillo
    } else if (porcentaje <= 40) {
      return 'orange'; // 21-40%: naranja
    } else if (porcentaje <= 60) {
      return 'red'; // 41-60%: rojo
    } else if (porcentaje <= 80) {
      return 'maroon'; // 61-80%: morado
    } else if (porcentaje <= 100){
      return 'purple'; // 81-100%: rojo oscuro
    }else {
      return 'green';
    }
    
  };

  // Estructurar los datos para la cuadrícula 6x6 de la habitación 1
  const dataHabitacion1 = [
    [
      calcularPorcentaje(habitacion1Data, 'posicion1'),
      calcularPorcentaje(habitacion1Data, 'posicion2'),
      calcularPorcentaje(habitacion1Data, 'posicion3'),
      calcularPorcentaje(habitacion1Data, 'posicion4')
    ],
    [
      calcularPorcentaje(habitacion1Data, 'posicion5'),
      calcularPorcentaje(habitacion1Data, 'posicion6'),
      calcularPorcentaje(habitacion1Data, 'posicion7'),
      calcularPorcentaje(habitacion1Data, 'posicion8')
    ],
    [
      calcularPorcentaje(habitacion1Data, 'posicion9'),
      calcularPorcentaje(habitacion1Data, 'posicion10'),
      calcularPorcentaje(habitacion1Data, 'posicion11'),
      calcularPorcentaje(habitacion1Data, 'posicion12')
    ],
    [
      calcularPorcentaje(habitacion1Data, 'posicion13'),
      calcularPorcentaje(habitacion1Data, 'posicion14'),
      calcularPorcentaje(habitacion1Data, 'posicion15'),
      calcularPorcentaje(habitacion1Data, 'posicion16')
    ]
  ];

  // Estructurar los datos para la cuadrícula 6x6 de la habitación 2
  const dataHabitacion2 = [
    [
      calcularPorcentaje(habitacion2Data, 'posicion1'),
      calcularPorcentaje(habitacion2Data, 'posicion2'),
      calcularPorcentaje(habitacion2Data, 'posicion3'),
      calcularPorcentaje(habitacion2Data, 'posicion4')
    ],
    [
      calcularPorcentaje(habitacion2Data, 'posicion5'),
      calcularPorcentaje(habitacion2Data, 'posicion6'),
      calcularPorcentaje(habitacion2Data, 'posicion7'),
      calcularPorcentaje(habitacion2Data, 'posicion8')
    ],
    [
      calcularPorcentaje(habitacion2Data, 'posicion9'),
      calcularPorcentaje(habitacion2Data, 'posicion10'),
      calcularPorcentaje(habitacion2Data, 'posicion11'),
      calcularPorcentaje(habitacion2Data, 'posicion12')
    ],
    [
      calcularPorcentaje(habitacion2Data, 'posicion13'),
      calcularPorcentaje(habitacion2Data, 'posicion14'),
      calcularPorcentaje(habitacion2Data, 'posicion15'),
      calcularPorcentaje(habitacion2Data, 'posicion16')
    ]
  ];
  const dataHabitacion3 = [
    [
      calcularPorcentaje(habitacion3Data, 'posicion1'),
      calcularPorcentaje(habitacion3Data, 'posicion2'),
      calcularPorcentaje(habitacion3Data, 'posicion3'),
      calcularPorcentaje(habitacion3Data, 'posicion4')
    ],
    [
      calcularPorcentaje(habitacion3Data, 'posicion5'),
      calcularPorcentaje(habitacion3Data, 'posicion6'),
      calcularPorcentaje(habitacion3Data, 'posicion7'),
      calcularPorcentaje(habitacion3Data, 'posicion8')
    ],
    [
      calcularPorcentaje(habitacion3Data, 'posicion9'),
      calcularPorcentaje(habitacion3Data, 'posicion10'),
      calcularPorcentaje(habitacion3Data, 'posicion11'),
      calcularPorcentaje(habitacion3Data, 'posicion12')
    ],
    [
      calcularPorcentaje(habitacion3Data, 'posicion13'),
      calcularPorcentaje(habitacion3Data, 'posicion14'),
      calcularPorcentaje(habitacion3Data, 'posicion15'),
      calcularPorcentaje(habitacion3Data, 'posicion16')
    ]
  ];
  return (
  


    <div className="App">
    <h1>Mapa de Calor de Habitaciones</h1>
    <form>
      <label htmlFor="startDate">Fecha de inicio:</label>
      <input type="date" id="startDate"   />
      <label htmlFor="endDate">Fecha de fin:</label>
      <input type="date" id="endDate"   />
      <label htmlFor="habitacion">Selecciona una habitación:</label>
      <select id="habitacion">
      <option value="habitacion1">Habitación 1</option>
          <option value="habitacion2">Habitación 1</option>
          <option value="habitacion2">Habitación 2</option>
          <option value="habitacion2">Habitación 3</option>
          <option value="habitacion2">Habitación 4</option>
          <option value="habitacion2">Habitación 5</option>
      <button type="submit">Buscar</button>
      </select>
    </form>
       <h1>Mapa de Calor de Habitaciones</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <h2>Habitación 1</h2>
          {/* <div style={{ width: '500px', height: '300px' }}> */}
            <HeatmapGrid
              data={dataHabitacion1}
              background="#ffffff" // Color de fondo para las celdas sin datos
              xLabels={['1', '2', '3', '4']} // Etiquetas de las columnas
              yLabels={['1', '2', '3', '4']} // Etiquetas de las filas
              cellStyle={(background, value, min, max, data, x, y) => ({
                background: asignarColor(value),
                fontSize: '0px',
                width: '100px', // Establece el ancho de la celda
                height: '90px', // Establece la altura de la celda
              })}
              cellRender={(value) => value && `${value.toFixed(2)}%`}
              xLabelWidth={15}
              yLabelWidth={15}
              square
              // height={65}
              // width={40}
            />
          {/* </div> */}
        </div>
        <div>
          <h2>Habitación 2</h2>
            <HeatmapGrid
              data={dataHabitacion2}
              background="#ffffff" // Color de fondo para las celdas sin datos
              xLabels={['1', '2', '3', '4']} // Etiquetas de las columnas
              yLabels={['1', '2', '3', '4']} // Etiquetas de las filas
              cellStyle={(background, value, min, max, data, x, y) => ({
                background: asignarColor(value),
                fontSize: '0px',
                width: '100px', // Establece el ancho de la celda
                height: '90px', // Establece la altura de la celda
              })}
              cellRender={(value) => value && `${value.toFixed(2)}%`}
              xLabelWidth={15}
              yLabelWidth={15}
            />
          </div>
      <div>
          <h2>Habitación 3</h2>
            <HeatmapGrid
              data={dataHabitacion3}
              background="#ffffff" // Color de fondo para las celdas sin datos
              xLabels={['1', '2', '3', '4']} // Etiquetas de las columnas
              yLabels={['1', '2', '3', '4']} // Etiquetas de las filas
              cellStyle={(background, value, min, max, data, x, y) => ({
                background: asignarColor(value),
                fontSize: '0px',
                width: '100px', // Establece el ancho de la celda
                height: '90px', // Establece la altura de la celda
              })}
              cellRender={(value) => value && `${value.toFixed(2)}%`}
              xLabelWidth={15}
              yLabelWidth={15}
            />
          </div>
      </div>
      </div>


  );
}

export default App;
