import React, { useState, useEffect } from "react";
import styles from "./News.module.css";  // Asegúrate de tener este archivo CSS para los estilos
import Cards from "../Components/Cards"; // Componente de las tarjetas

const News = () => {
  const [services, setServices] = useState([]); // Estado para almacenar los servicios
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Función para obtener los servicios de la API
    const fetchServices = async () => {
      try {
        const response = await fetch("https://opulent-succotash-449wj6xg64x2j7g4-5000.app.github.dev/api/services"); // Asegúrate que la URL de la API sea correcta
        const data = await response.json();
        setServices(data); // Almacenar los servicios en el estado
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false); // Finalizar estado de carga
      }
    };

    fetchServices();
  }, []);

  // Si aún se están cargando los servicios, mostrar un mensaje de carga
  if (loading) {
    return <div>Cargando servicios...</div>;
  }

  return (
    <div className={styles.HowWeWork}>
      <h2>Servicios Disponibles</h2>
      
      {/* Tabla de servicios */}
      <table className={styles.servicesTable}>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>{`$${service.price}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Sección de tarjetas */}
      <div className={styles.CardsSection}>
        {services.map((service) => (
          <Cards
            key={service.id}
            img="defaultImage.png"  // Puedes cambiar esto si tienes imágenes específicas
            title={service.name}
            text={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default News;
