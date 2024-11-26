import React from 'react'
import styles from "./Ingreso.module.css";

const Ingreso = () => {
  return (
    <div>
        <div className={styles.container}>
      <div className={styles.formContent}>
        <h1 id="title">Registro</h1>

        <form action="">
          <div className={styles.inputGroup}>
            <div class="input-field" id="nameInput">
              <i class="fa-solid fa-user"></i>
              <input type="text" placeholder="Nombre" />
            </div>
            <div class="input-field">
              <i class="fa-solid fa-envelope"></i>
              <input type="Licencia" placeholder="Lincencia" />
            </div>
            <div class="input-field">
              <i class="fa-solid fa-lock"></i>
              <input type="password" placeholder="Contraseña" />
            </div>
            <p>Olvidaste tu contraseña <button onClick={() => { /* handle click */ }} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Click Aqui</button></p>
          </div>
          <div class="btn-field">
            <button id="signUp" type="button">Registro</button>
            <button id="signIn" type="button" class="disable">Login</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Ingreso