import './appBanner.scss';

import imgBg from '../../assets/img/banner.jpg';
import videoSrc from '../../assets/video/01.mp4';

const AppBanner = () => {
  return (
    <section className="banner">
      <div className="banner__bg">
        <img src={imgBg} />
      </div>

      <video className="banner__video" preload="auto" autoPlay muted playsInline loop>
        <source src={videoSrc} type="video/mp4" />
      </video>

      <h1 className="banner__title">
        Free to play<br />
        games
        <span>for<br />PC</span>
      </h1>
    </section>
  );
};
export default AppBanner;