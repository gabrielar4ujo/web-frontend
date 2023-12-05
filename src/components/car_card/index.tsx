import React from 'react';
import './index.css';

interface CarInfo {
  name: string;
  brand: string;
  photo: string;
  price: number;
  advertiser: string;
}

interface CarCardProps {
  carInfo: CarInfo;
}

const CarCard: React.FC<CarCardProps> = ({ carInfo }) => {
  const { name, brand, photo, price, advertiser } = carInfo;

  return (
    <div className="car-card">
      <img src={photo} alt={name} className="car-image" />
      <div className="car-details">
        <h2>{name}</h2>
        <p>
          <strong>Brand:</strong> {brand}
        </p>
        <p>
          <strong>Price:</strong> R$ {price}
        </p>
        <p>
          <strong>Advertiser:</strong> {advertiser}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
