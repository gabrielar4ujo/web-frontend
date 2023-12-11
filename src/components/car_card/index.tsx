import React from 'react';
import './index.css';
import { AdsModel } from '../../domain/models/ads.model';

interface CarCardProps {
  carInfo: AdsModel;
}

const CarCard: React.FC<CarCardProps> = ({ carInfo }) => {
  const { descricao, preco, urlImagem, titulo, data, anunciante } = carInfo;

  return (
    <div className="car-card">
      <img src={urlImagem} alt={urlImagem} className="car-image" />
      <div className="car-details">
        <h2>{titulo}</h2>
        <p>
          <strong>Price:</strong> R$ {preco}
        </p>
        <p>
          <strong>Descrição:</strong> {descricao}
        </p>
        <p>
          <strong>Data do Anúncio:</strong> {data}
        </p>
        <p>
          <strong>Anunciante:</strong> {anunciante}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
