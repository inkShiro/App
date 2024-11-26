import React from 'react'
import styles from './News.module.css';
import Cards from '../Components/Cards';

const cards = [

    {
    img: require("../assets/img1.jpg"),  
    title: "lorem ipsum",
    text: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: require("../assets/IMG2.jpg"),
    title: "lorem ipsum",
    text: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: require("../assets/IMG3.jpg"),
    title: "lorem ipsum",
    text: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: require("../assets/IMG4.jpg"),
    title: "lorem ipsum",
    text: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
]


const News = () => {
  return (
    <div className={styles.HowWeWork}>
      {
        cards.map((x) => (
          <Cards img={x.img} title= {x.title } text = {x.text}/>
        ))
      }
    </div>
  )
}

export default News