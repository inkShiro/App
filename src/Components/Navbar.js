import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useEffect } from "react";
import { useScrollPosition } from "../Hooks/scrollPosition";
import { Link } from "react-scroll";

const Navbar = () => {
    const [navBarOpen, setnavBarOpen] = useState(false);
    const [windowDimension, setWindowDimension] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const detectDimension = () => {
        setWindowDimension({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      useEffect(() => {
        window.addEventListener("resize", detectDimension);
        windowDimension.width > 800 && setnavBarOpen(false);
        return () => {
          window.removeEventListener("resize", detectDimension);
        };
      }, [windowDimension]);

      const links = [
        {
          id: 1,
          links: "Inicio",
        },
        {
          id: 2,
          links: "Servicios",
        },
        {
          id: 3,
          links: "Mantenimiento",
        },
        {
          id: 4,
          links: "Beneficios",
        },
        {
          id: 5,
          links: "Ingresar",
        },
      ];

      const scrollPosition = useScrollPosition(); 

      return (
        <div
          className={
            navBarOpen
              ? styles.navOpen
              : scrollPosition > 0
              ? styles.navOnScroll
              : styles.navBar
          }

        >
            {!navBarOpen && <p className={styles.logo}> DISO | Digitals Solutions</p>}
      {!navBarOpen && windowDimension.width < 800 ?  (//en esta parte identifica si el ancho de la pantalla es menor a 800px para poder mostrar el icono de menu
        <AiOutlineMenu
          color="#f1f1f1"
          onClick={() => setnavBarOpen(!navBarOpen)}
          size={25}
        />
      ) : (
        windowDimension.width < 800 && ( //en esta parte identifica si el ancho de la pantalla es menor a 800px para poder mostrar el icono de cerrar menu
          <AiOutlineClose
            onClick={() => setnavBarOpen(!navBarOpen)}
            color="#f1f1f1"
            size={25}
          />
        )
      )//se utiliza un operador ternario para poder mostrar el icono de menu o de cerrar dependiendo de si esta abierto o cerrado el menu, si la pantalla es menor a 800px
      } 
      
      {navBarOpen && (
        <ul className={styles.linksContainer}>
          {links.map((x) => (
            <div>
              <Link
                onClick={() => setnavBarOpen(false)}
                to={x.links}
                smooth
                duration={500}
                className={styles.navLink}
              >
                {x.links === "HoWeWork" ? "How We Work" : x.links}
              </Link>
              <div className={styles.border}></div>
            </div>
          ))}
        </ul>
      )// se utiliza un operador ternario para poder mostrar los links de navegacion dependiendo de si esta abierto o cerrado el menu
      }
      {windowDimension.width > 800 && (
        <ul className={styles.linksContainer}>
          {links.map((x) => (
            <div>
              <Link
                onClick={() => setnavBarOpen(false)}
                to={x.links} // to = es la seccion a la que se va a dirigir al hacer click en el link
                smooth // smooth es una propiedad de react-scroll que permite hacer un scroll suave al hacer click en un link
                duration={500}
                className={styles.navLink}// se utiliza un operador ternario para poder mostrar los links de navegacion dependiendo de si la pantalla es mayor a 800px ademas de cerrar el menu al hacer click en un link
              >
                {x.links === "HoWeWork" ? "How We Work" : x.links// se utiliza un operador ternario para poder cambiar el nombre de un link en especifico
                }
              </Link>
              <div className={styles.border}></div>
            </div>
          ))}
          <Link 
          onClick={() => setnavBarOpen(false)}
          to="Contact"
          smooth
          duration={500}
          className={styles.contactLink}>Contact</Link>
        </ul>
      )}

    </div>
  );
};

export default Navbar