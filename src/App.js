//import logo from './logo.svg';
//import './App.css';
import styles from "./App.module.css";
import Home from "./Screens/Home";
import Navbar from "./Components/Navbar";
import News from "./Screens/News";
import Banner from "./Screens/Banner";

<link rel="preconnect" href="https://fonts.googleapis.com" />


function App() {
  return (
    <div className={styles.App}>
      <Navbar/>
      <Home/>
      <News/>
      <Banner/>
      <News/>
      <Banner/>
    </div>
    
  );
}

export default App;
