import './ratingBadge.scss';

function RatingBadge({ rating }) {
  let ratingColor = {backgroundColor: '#008000'};

  if (rating === 0) {
    ratingColor.backgroundColor = "#686868";
  } else if(rating < 2.5) {
    ratingColor.backgroundColor = '#c20000';
  } else if (rating < 5) {
    ratingColor.backgroundColor = '#ffa500';
  } else if (rating < 7.5) {
    ratingColor.backgroundColor = '#d9dd00';
  }

  return (
    <div className="rating-badge" style={ratingColor}>
      <span>{rating}</span>
    </div>
  );
}

export default RatingBadge;
