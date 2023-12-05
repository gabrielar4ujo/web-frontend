import CarCard from '../../components/car_card';
import './index.css';

const AdsPage = () => {
  const carList = Array.from(Array(30).keys()).map(() => ({
    name: 'Car Model Y',
    brand: 'Brand B',
    photo:
      'https://media.gazetadopovo.com.br/2020/01/17155825/lamborghini-huracan-Alexander-Migl-wikimedia-commons-960x540.jpg',
    price: 42000,
    advertiser: 'Advertiser XYZ',
  }));

  return (
    <div className="car-list-container">
      <h1>Car List</h1>
      <div className="car-list-box ">
        <div className="car-list">
          {carList.map((carInfo, index) => (
            <CarCard key={index} carInfo={carInfo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
