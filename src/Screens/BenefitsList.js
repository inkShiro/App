import React, { useState, useEffect } from 'react';
import './BenefitsList.css'; // Importar el archivo CSS

const BenefitsList = () => {
  // Estado para almacenar los beneficios
  const [benefits, setBenefits] = useState([]);
  // Estado para manejar posibles errores
  const [error, setError] = useState(null);

  // Usar useEffect para hacer el fetch cuando el componente se monte
  useEffect(() => {
    // Hacer la solicitud al backend
    fetch('https://opulent-succotash-449wj6xg64x2j7g4-5000.app.github.dev/api/benefits')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los beneficios');
        }
        return response.json();
      })
      .then((data) => {
        setBenefits(data); // Almacenar los beneficios en el estado
      })
      .catch((err) => {
        setError(err.message); // Capturar cualquier error
      });
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="benefits-container">
      <h1>Lista de Beneficios</h1>
      <ul>
        {benefits.map((benefit) => (
          <li key={benefit.id} className="benefit-item">
            <h3>{benefit.name}</h3>
            <p>{benefit.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitsList;
