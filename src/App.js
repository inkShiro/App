// import logo from './logo.svg';
// import './App.css';
import styles from "./App.module.css";
import Home from "./Screens/Home";
import Navbar from "./Components/Navbar";
import News from "./Screens/News";
import Banner from "./Screens/Banner";

<link rel="preconnect" href="https://fonts.googleapis.com" />

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      {/* Agregar id a cada sección para coincidir con los enlaces de la barra de navegación */}
      <section id="Inicio">
        <Home />
      </section>

      <section id="Servicios">
        <News />
      </section>

      <section id="Mantenimiento">
        <Banner />
      </section>

      <section id="Beneficios">
        <News />
      </section>

      <section id="Ingresar">
        <Banner />
      </section>
    </div>
  );
}

export default App;
