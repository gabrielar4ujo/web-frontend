import YouTube from 'react-youtube';
import './index.css';

const HomePage = () => {
  const opts = {
    height: '700px', // Altura do player
    width: '100%', // Largura do player
  };
  return (
    <div className="home-container">
      <div className="youtube-video">
        <YouTube videoId={'azz8NjJvp4Y'} opts={opts} />
      </div>
    </div>
  );
};

export default HomePage;
