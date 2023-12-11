import React from 'react';
import './index.css';

interface CarInfo {
  descricao: string;
  preco: number;
  urlImagem: string;
}

interface CarCardProps {
  carInfo: CarInfo;
}

const CarCard: React.FC<CarCardProps> = ({ carInfo }) => {
  const { descricao, preco, urlImagem } = carInfo;

  return (
    <div className="car-card">
      <img src={urlImagem} alt={urlImagem} className="car-image" />
      <div className="car-details">
        <h2>{'Adicionar nome'}</h2>
        <p>
          <strong>Price:</strong> R$ {preco}
        </p>
        <p>
          <strong>Descrição:</strong> {descricao}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
