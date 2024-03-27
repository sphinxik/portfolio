import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleDataCredits } from "../../slices/singleDataSlice";

import SimpleBar from 'simplebar-react';

import ErrorMessage from "../appErrorMessage/AppErrorMessage";
import Spinner from "../appSpinner/AppSpinner";

import 'simplebar-react/dist/simplebar.min.css';
import "./mediaCardActors.scss";

function MediaCardActors({dataType, id}) {
  const singleDataCredits = useSelector(state => state.singleData.singleDataCredits);
  const singleDataCreditsLoadingStatus = useSelector(state => state.singleData.singleDataCreditsLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleDataCredits({dataType, id}));
  }, [dataType, id]);

  const renderActors = () => {
    return singleDataCredits.map(({id, photo, name, character}) => {
      return (
        <Link to={`/actor-${id}`} className="media-card__actor" key={id}>
          <div className="media-card__actor-photo">
            {photo ? <img src={photo} alt={name} /> : null}
          </div>
          <div className="media-card__actor-info">
            <div className="media-card__actor-name">{name}</div>
            <div className="media-card__actor-character">{character}</div>
          </div>
        </Link>
      )
    })
  };

  let actorsList =  'Actors not found...';
  if (singleDataCreditsLoadingStatus === "loading") {
    actorsList = <Spinner/>;
  } else if (singleDataCreditsLoadingStatus === "error") {
    actorsList = <ErrorMessage />;
  } else if (singleDataCredits.length) {
    actorsList = renderActors();
  }

  return (
    <div className="media-card__actors _animateIn">
      <div className="container">
        <div className="media-card__actors-title title">Cast</div>
        <SimpleBar className="simplebar media-card__actors-list-wrapper" forceVisible="y" autoHide={false}>
          <div className="media-card__actors-list">{actorsList}</div>
        </SimpleBar>
      </div>
    </div>
  );
}

export default MediaCardActors;
