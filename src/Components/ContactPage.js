// src/Components/ContactPage.js
import React, { useState, useEffect } from 'react';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: '', // Nuevo campo para el teléfono
    address: '' // Nuevo campo para la dirección
  });

  // Estado para el user_id, se incrementa cada vez que se envía un formulario
  const [userId, setUserId] = useState(12345);

  // Estado para los usuarios
  const [users, setUsers] = useState([]);

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea el objeto de datos para el POST con los campos del formulario
    const requestData = {
      user_id: userId, // Se usa el valor de userId que se incrementa
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      name: formData.name,
      message: formData.message
    };

    try {
      const response = await fetch('https://opulent-succotash-449wj6xg64x2j7g4-5000.app.github.dev/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // Incrementa el userId para la próxima vez
        setUserId((prevId) => prevId + 1);
        // Limpia el formulario después de enviar
        setFormData({ name: '', email: '', message: '', phone: '', address: '' });

        // Actualiza la lista de usuarios
        fetchUsers();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un problema al enviar los datos. Inténtalo de nuevo.');
    }
  };

  // Función para obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://opulent-succotash-449wj6xg64x2j7g4-5000.app.github.dev/api/contacts');
      if (!response.ok) {
        throw new Error('Error al obtener los datos de los usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      alert('Hubo un problema al obtener los usuarios.');
    }
  };

  // Llama a fetchUsers al cargar el componente para obtener los datos iniciales
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.contactPage}>
      <h1>Contacto</h1>
      <p>Gracias por visitar nuestra página de contacto. Por favor, llena el formulario a continuación o comunícate con nosotros directamente.</p>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>

      <h2>Lista de Usuarios</h2>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactPage;
