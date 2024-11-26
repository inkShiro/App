import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-scroll";
import { useScrollPosition } from "../Hooks/scrollPosition";

const Navbar = () => {
  const [navBarOpen, setNavBarOpen] = useState(false);
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
    if (windowDimension.width > 800) setNavBarOpen(false);
    return () => {
      window.removeEventListener("resize", detectDimension);
    };
  }, [windowDimension]);

  const links = [
    { id: 1, links: "Inicio" },
    { id: 2, links: "Servicios" },
    { id: 3, links: "Mantenimiento" },
    { id: 4, links: "Beneficios" },
    { id: 5, links: "Ingresar" },
  ];

  const scrollPosition = useScrollPosition();

  return (
    <div
      className={
        navBarOpen
          ? `${styles.navOpen}`
          : scrollPosition > 0
          ? `${styles.navOnScroll}`
          : `${styles.navBar}`
      }
    >
      <div className={styles.logoContainer}>
        <p className={styles.logo}>DISO | Digital Solutions</p>
        {windowDimension.width < 800 && (
          <div
            className={styles.menuIcon}
            onClick={() => setNavBarOpen(!navBarOpen)}
          >
            {navBarOpen ? (
              <AiOutlineClose color="#fff" size={30} />
            ) : (
              <AiOutlineMenu color="#fff" size={30} />
            )}
          </div>
        )}
      </div>

      {navBarOpen || windowDimension.width > 800 ? (
        <ul className={styles.linksContainer}>
          {links.map((x) => (
            <li key={x.id} className={styles.navItem}>
              <Link
                to={x.links}
                smooth
                duration={500}
                className={styles.navLink}
                onClick={() => setNavBarOpen(false)}
              >
                {x.links}
              </Link>
              <div className={styles.border}></div>
            </li>
          ))}
          {windowDimension.width > 800 && (
            <li className={styles.navItem}>
              <Link
                to="Contact"
                smooth
                duration={500}
                className={styles.contactLink}
                onClick={() => setNavBarOpen(false)}
              >
                Contact
              </Link>
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default Navbar;
