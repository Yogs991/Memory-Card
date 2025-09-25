/* 
    --Project Breakdown--
    `)use hooks useState and useEffect to fetch pokeapi pokemon
    2)limit should be 12, offset 0
    3)API should bring 12 random pokemon from the first 151
    4)pokemon cards should have a onClick attribute so it can shuffle and bring 12 random pokemon with duplicates allowed
    5)track current score
    6)track best score if(currentScore > bestScore){ bestScore = currentScore; }
    7)if you click the same pokemon twice currentScore = 0;
    8)reset Button to reset the game completely

    for the pokemon icon inside the card you should use "sprites.other.official-artwork.front_default"
    LINKS ON MY DISCORD SERVER #USEFUL-LINKS FOR TOMORROW
*/
import { useState, useEffect } from "react";


function Card(){
    const [cards, setCards] = useState([]);
    useEffect(()=>{
        
        const fetchData =  async ()=>{
            try{
                const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
                const data = await res.json();

                const detailedData = await Promise.all(
                    data.results.map(async(pokemon)=>{
                        const res = await fetch(pokemon.url);                      
                        return await res.json();
                    })
                );
                const shuffle = detailedData.sort(()=>0.5 - Math.random());
                const shuffledPokemon = shuffle.slice(0, 10);
                setCards(shuffledPokemon);
                console.log("Detailed Data:", detailedData);
            }catch(error){
                console.log(error);                
            }
        }
        fetchData();
    },[]);

    return(
        <div>
            <h1>Memory Card</h1>
            <div className="card-list">
            {cards.length > 0 ? (
                cards.map((card, index)=>(
                    <div key={index} className="card">
                        <h2>{card.name}</h2>
                        <img src={card.sprites.front_default} alt={card.name}/>
                    </div>                    
                ))
            ):(
                "Loading..."
            )}
            </div>
        </div>
    );

}

export default Card;