/* 
    --Project Breakdown--
    5)track current score
    6)track best score if(currentScore > bestScore){ bestScore = currentScore; }
    7)if you click the same pokemon twice currentScore = 0;
    8)reset Button to reset the game completely

    for the pokemon icon inside the card you should use "sprites.other.official-artwork.front_default"
    LINKS ON MY DISCORD SERVER #USEFUL-LINKS FOR TOMORROW
*/
import { useState, useEffect } from "react";


function Card({onCardClick}){
    const [cards, setCards] = useState([]);
    const [refresh, setRefresh] = useState(0);

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
                const shuffledPokemon = shuffle.slice(0, 8);
                setCards(shuffledPokemon);
                console.log("Detailed Data:", detailedData);
            }catch(error){
                console.log(error);                
            }
        }
        fetchData();
    },[refresh]);

    return(
        <div>
            <div className="card-list">
                {cards.length > 0 ? (
                    cards.map((card)=>(
                        <div key={card.id} className="card">
                            <h2>{card.name} #{card.id}</h2>
                            <img 
                            src={card.sprites.front_default} 
                            alt={card.name} 
                            onClick={()=>{
                                onCardClick(card.id);
                                setRefresh((prev)=>prev+1);
                            }}                            
                            />
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