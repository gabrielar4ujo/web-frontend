import React, { useState } from 'react';
import './index.css';
import { useAdsRepository } from '../../repositories/ads.repository';
import toast from 'react-hot-toast';
import { IAxiosError } from '../../repositories/util.repository';

const AdsFormPage: React.FC = () => {
  const [title, setTitle] = useState<string | undefined>();
  const [titleError, setTitleError] = useState<string | undefined>('');
  const [description, setDescription] = useState<string | undefined>();
  const [descriptionError, setDescriptionError] = useState<string | undefined>(
    ''
  );
  const [price, setPrice] = useState<string | undefined>();
  const [urlImage, setUrlImage] = useState<string | undefined>();
  const [urlImageError, setUrlImageError] = useState<string | undefined>('');

  const { createAds } = useAdsRepository();

  const handleCreateAds = () => {
    createAds({
      descricao: description!,
      preco: price!,
      titulo: title!,
      urlImagem: urlImage!,
    })
      .then(() => {
        toast.success('Sucesso ao criar anúncio!');
        [setDescription, setPrice, setUrlImage, setTitle].forEach((setter) =>
          setter('')
        );
      })
      .catch((error: IAxiosError) => {
        toast.error(error.response.data['message']);
      });
  };

  const validate = (
    input: string,
    setter: React.Dispatch<React.SetStateAction<string | undefined>>,
    errorSetter: React.Dispatch<React.SetStateAction<string | undefined>>
  ): void => {
    if (!input.trim().length) {
      setter(undefined);
      errorSetter('Campo obrigatório');
    } else {
      setter(input);
      errorSetter('');
    }
  };

  const validateUrlImage = (input: string): void => {
    const urlRegex =
      // eslint-disable-next-line no-useless-escape
      /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    if (!urlRegex.test(input)) {
      setUrlImage(undefined);
      setUrlImageError('URL da imagem inválida');
    } else {
      setUrlImage(input);
      setUrlImageError('');
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateAds();
  };

  return (
    <div className="main-container">
      <div className="contact-us-container">
        <h2>Criar Anúncio</h2>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="title">Título:</label>
          <input
            placeholder="Título do anúncio"
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              validate(e.target.value, setTitle, setTitleError);
            }}
          />
          {titleError && <p className="error-message">{titleError}</p>}

          <label htmlFor="description">Descrição:</label>
          <input
            placeholder="Descrição do anúncio"
            type="text"
            id="description"
            value={description}
            onChange={(e) => {
              validate(e.target.value, setDescription, setDescriptionError);
            }}
          />
          {descriptionError && (
            <p className="error-message">{descriptionError}</p>
          )}

          <label htmlFor="price">Preço:</label>
          <input
            placeholder="Preço do item anunciado"
            type="number"
            id="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />

          <label htmlFor="url">URL da imagem:</label>
          <input
            placeholder="www.image.com"
            type="url"
            id="url"
            value={urlImage}
            onChange={(e) => {
              validateUrlImage(e.target.value);
            }}
          />
          {urlImageError && <p className="error-message">{urlImageError}</p>}

          <br />

          <button
            type="submit"
            className={
              !title || !description || !price || !urlImage
                ? 'disable-button'
                : undefined
            }
            disabled={!title || !description || !price || !urlImage}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdsFormPage;
