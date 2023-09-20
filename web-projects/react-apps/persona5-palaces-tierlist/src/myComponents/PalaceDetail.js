import React from 'react';

function PalaceDetail({ palace }) {
  // Sostituisci i caratteri di nuova riga con tag <br /> nel testo della descrizione
  const formattedDescription = palace.description.replace(/\n/g, '<br />');

  return (
    <div id={palace.name}>
      <h3>{palace.rank}. {palace.name}</h3>
      <img src={palace.img} alt={`${palace.name} Palace`} />
      {/* Utilizza dangerouslySetInnerHTML per interpretare i tag <br /> */}
      <p dangerouslySetInnerHTML={{ __html: formattedDescription }} />
      <p className='votes'>Vote: {palace.vote}</p>
    </div>
  );
}

export default PalaceDetail;
