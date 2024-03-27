import { Link } from 'react-router-dom';
import RatingBadge from '../ratingBadge/RatingBadge';

import './mediaItem.scss';

function MediaItem(props) {
  const {dataType, id, title, description, image, date, rating} = props;
  const linkUrl = `/${dataType}/${id}`;

  return (
    <div className="media-item">
      <Link to={linkUrl} className={`media-item__img ${image ? '' : '_no-image'}`}>
        <RatingBadge rating={rating} />
        {image ? <img src={image} /> : null}
      </Link>
      
      <div className="media-item__body">
        <Link to={linkUrl} className="media-item__title">{title}</Link>

        <div className="media-item__date">{date}</div>

        <div className="media-item__desr">
          {description.length > 90 ? description.substr(0, 87) + '...' : description}
        </div>
      </div>
    </div>
  )
}

export default MediaItem;