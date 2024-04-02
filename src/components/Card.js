import React from 'react'

const Card = ({card, onCardClick}) => {
  return (
    <div className='card' onClick={() => onCardClick(card.id)}>
      <img src={card.image} alt={card.name} />
      <h4>{card.name}</h4>
    </div>
  )
}

export default Card
