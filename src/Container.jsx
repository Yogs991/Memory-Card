import Card from "./Card";
import { useState } from "react";

export default function Container(){

    const [score, setScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);

    const handleCardClick = (id)=>{
        if(!clickedCards.includes(id)){
            setScore((prev)=>prev + 1);
            setClickedCards((prev)=>[...prev, id]);
        }else{
            setScore(0);
            setClickedCards([]);
        }
    };

    return(
        <div>
            <h1>Memory Card</h1>            
            <h2>Score: {score}</h2>
            <Card onCardClick = {handleCardClick}/>
        </div>
    )
}