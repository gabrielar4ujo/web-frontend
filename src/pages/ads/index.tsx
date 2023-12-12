import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importa o ícone de lupa
import CarCard from '../../components/car_card';
import { useAdsRepository } from '../../repositories/ads.repository';
import './index.css';
import { AdsModel } from '../../domain/models/ads.model';
import toast from 'react-hot-toast';

const AdsPage = () => {
  const [ads, setAds] = useState<Array<AdsModel>>();
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para armazenar o termo de pesquisa
  const { listAds } = useAdsRepository();
  const [minValue, setMinValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
  const [invalidMessage, setInvalidMessage] = useState<string>(''); // Estado para armazenar o termo de pesquisa

  useEffect(() => {
    listAds()
      .then((res) => setAds(res!))
      .catch(() => toast.error('Ocorreu algum erro ao listar anúncios'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (
    name?: string,
    minValue?: string,
    maxValue?: string
  ) => {
    listAds(name, minValue, maxValue)
      .then((res) => setAds(res!))
      .catch(() => toast.error('Ocorreu algum erro ao listar anúncios'));
  };

  const validateRangeInput = (min: string, max: string) => {
    if (min !== '' && max === '') {
      setInvalidMessage(
        'Se o valor mínimo estiver preenchido, o valor máximo também deve ser preenchido.'
      );
      return false;
    }

    if (min === '' && max !== '') {
      setInvalidMessage(
        'Se o valor máximo estiver preenchido, o valor mínimo também deve ser preenchido.'
      );
      return false;
    }
    setInvalidMessage('');
    return true;
  };

  return (
    <div>
      <div className="filter-container">
        <span className="filter-text">Filtros</span>
        <div className="text-input-container">
          <input
            className="input"
            type="text"
            placeholder="Pesquisar pelo nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="value-container">
          <div className="value-filter">
            <input
              className="number-input"
              type="number"
              placeholder="Valor Mínimo (Ex: 3000)"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              min={maxValue}
            />
            <input
              className="number-input"
              type="number"
              placeholder="Valor Máximo (Ex: 10000)"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              min={minValue}
            />
          </div>
          <p className="invalid-message">{invalidMessage}</p>
        </div>
        <button
          onClick={() => {
            if (validateRangeInput(minValue, maxValue))
              handleSearch(searchTerm, minValue, maxValue);
          }}
          className="search-button"
        >
          <FaSearch />
        </button>
      </div>
      <div className="car-list-container">
        <h1>Nossos Anúncios</h1>
        <div className="car-list-box ">
          <div className="car-list">
            {ads &&
              ads.map((carInfo, index) => (
                <CarCard key={index} carInfo={carInfo} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
