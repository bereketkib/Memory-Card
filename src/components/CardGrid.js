import React from 'react';
import Card from './Card';

const CardGrid = ({ cards, onCardClick }) => {
  return (
    <div className='cardGrid'>
      {cards.map((card) => (
        <Card key={card.id} card={card} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default CardGrid;
