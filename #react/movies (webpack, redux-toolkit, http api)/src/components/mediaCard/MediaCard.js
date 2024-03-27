import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleData } from "../../slices/singleDataSlice";

import { goTo, numberWithSpaces } from '../../utils/Utils';

import ErrorMessage from "../appErrorMessage/AppErrorMessage";
import Spinner from "../appSpinner/AppSpinner";
import RatingBadge from "../ratingBadge/RatingBadge";
import MediaCardActors from "../mediaCardActors/MediaCardActors";
import VideosSlider from "../videosSlider/VideosSlider";

import "./mediaCard.scss";


function MediaCard({dataType}) {
  const { id } = useParams();
  const singleData = useSelector(state => state.singleData.singleDataInfo);
  const singleDataLoadingStatus = useSelector(state => state.singleData.singleDataLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleData({dataType, id}));
    goTo();
  }, [id]);

  if(singleDataLoadingStatus === 'loading') {
    return <Spinner/>;
  } else if (singleDataLoadingStatus === 'error') {
    return <ErrorMessage/>;
  } else if (!singleData) {
    return 'Nothing found...';
  }

  const { imageBg, image, title, date, genres, rating, runtime, description, budget, revenue } = singleData;

  const renderGenres = () => {
    if (genres.length) {
      return genres.map(({ id, name }) => <li key={id}>{name}</li>);
    } else {
      return <span>Nothing found...</span>;
    }
  };

  return (
    <div className="media-card">
      <div className="media-card__top _animateIn">
        <div className="media-card__bg">
          <img src={imageBg} alt="" />
        </div>

        <div className="container">
          <div className="media-card__title media-card__title--mobile">
            {title} <span>({new Date(date).getFullYear()})</span>
          </div>

          <div className="media-card__poster">
            <RatingBadge rating={rating} />
            {image ? <img src={image} alt="#" /> : null}
          </div>

          <div className="media-card__info">
            <h1 className="media-card__title media-card__title--desktop">
              {title} <span>({new Date(date).getFullYear()})</span>
            </h1>

            <div className="media-card__genres">
              <div className="media-card__subtitle">Genre:</div>

              <ul className="media-card__genres-list">
                { renderGenres() }
              </ul>
            </div>

            {runtime ? (
              <div className="media-card__runtime">
                <div className="media-card__subtitle">Runtime:</div>
                <span>{runtime} minutes</span>
              </div>
            ) : null}

            <div className="media-card__description">
              <div className="media-card__subtitle">Description:</div>
              <div className="media-card__txt">{description}</div>
            </div>

            <div className="media-card__info-row">
              {budget ? (
                <div className="media-card__info-row-item">
                  <div className="media-card__subtitle">Budget:</div>
                  <div className="media-card__txt">{numberWithSpaces(budget)} $</div>
                </div>
              ) : null}

              {revenue ? (
                <div className="media-card__info-row-item">
                  <div className="media-card__subtitle">Revenue:</div>
                  <div className="media-card__txt">{numberWithSpaces(revenue)} $</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <MediaCardActors dataType={dataType} id={id} />

      <VideosSlider dataType={dataType} id={id} />
    </div>
  );
}

export default MediaCard;