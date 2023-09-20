import React from 'react';
import Introduction from './Introduction';
import PalaceDetail from './PalaceDetail';
import palacesData from '../data/palaces.json'; // Assicurati di utilizzare un percorso relativo
import Conclusion from "./Conclusion";

function Main() {
  // Ordina l'array palacesData in base al rank (in ordine decrescente)
  const sortedPalaces = palacesData.sort((a, b) => {
    // Converto rank in numeri per l'ordinamento
    const rankA = parseInt(a.rank, 10);
    const rankB = parseInt(b.rank, 10);

    // Confronta i rank come numeri in ordine decrescente
    return rankB - rankA;
  });

  return (
    <div className="main">
      <Introduction />
      <section className='sections' id="palaces-tier">
        {sortedPalaces.map((palace, index) => (
          <PalaceDetail key={index} palace={palace} />
        ))}
      </section>
      <Conclusion />
    </div>
  );
}

export default Main;
