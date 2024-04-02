import React, {useEffect, useState} from 'react';
import './App.css';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';

function App() {

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [clikedIds, setClikedIds] = useState([]);
  const [gameover, setGameover] = useState(false);

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
      setScore(prevScore => prevScore + 1)
    } else {
      if (score > bestScore) {
        setBestScore(score)
      }
      setGameover(true)
    }
    setCards(prevCards => {
      let shuffle = [...prevCards];
      for (let i = prevCards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
      }
      return shuffle;
    });
  }
  
  const handleRestart = () => {
    setGameover(false)
    setScore(0)
    setClikedIds([])
  }
  

  return (
    <div className="App">
      <header>
        <h2>Memory Card Game</h2>
        <Scoreboard score={score} bestScore={bestScore}/>
      </header>
      <main className={gameover ? 'blur' : ''}>
        <CardGrid cards={cards} onCardClick={handleClick}/>
      </main>
      {gameover ?
      <div className='gameover'>
        <h3>Game Over</h3>
        <h5>Score: {score}</h5>
        <h5>Best Score: {bestScore}</h5>
        <button onClick={handleRestart}>Restart</button>
      </div> :
      null}
      
      
    </div>
  );
}

export default App;
