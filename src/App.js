import React, {useEffect, useState} from 'react';
import './App.css';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';

function App() {

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [clikedIds, setClikedIds] = useState([]);

  useEffect(() => {
    fetchCards()
  }, []);

  const fetchCards = () => {
    let promises = []
    for (let i = 1; i <= 25; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()))
    }
    Promise.all(promises).then(results => {
      const pokemon = results.map(result => ({
        name: result.name,
        image: result.sprites.front_default,
        id: result.id
      }))
      setCards(pokemon)
    })
  }

  const handleClick = (id) => {
    if (!clikedIds.includes(id)) {
      setClikedIds((prevIds) => [...prevIds, id])
    } else {
      setClikedIds([])
    }
    console.log(clikedIds)
    
  }
  
  

  return (
    <div className="App">
      <header>
        <h2>Memory Card Game</h2>
        <Scoreboard score={score} bestScore={bestScore}/>
      </header>
      <main>
        <CardGrid cards={cards} onCardClick={handleClick}/>
      </main>
      
    </div>
  );
}

export default App;
