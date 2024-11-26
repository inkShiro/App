import React from "react";
import styles from "./Cards.module.css"; // Asegúrate de tener este archivo CSS para los estilos

const Cards = ({ img, title, text }) => {
  return (
    <div className={styles.newsCards}>
      <div>
        <img src={img} alt={title} />
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Cards;
