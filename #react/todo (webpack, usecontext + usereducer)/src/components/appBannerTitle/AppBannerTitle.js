import { stringTruncate } from "../../utils";
import "./appBannerTitle.scss";

const AppBannerTitle = ({ title }) => {
  return (
    <div className="app-banner__title">
      <div className="container">
        <h1 className="app-banner__title-text">
          { title.length <= 90 ? title : stringTruncate(title, 90) }
        </h1>
      </div>
    </div>
  );
};
export default AppBannerTitle;
