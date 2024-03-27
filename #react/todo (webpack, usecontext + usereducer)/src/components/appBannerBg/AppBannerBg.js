import "./appBannerBg.scss";
import bgImg from './bg.jpg';
import bgImgMob from './bg-mob.jpg';

const AppBannerBg = (props) => {
  return(
    <div className="app-banner__bg">
      <picture>
        <source srcset={bgImgMob} media="(max-width: 767.98px)" />
        <img src={bgImg} alt="banner" />
      </picture>
    </div>
  );
}

export default AppBannerBg;