import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActorInfo } from "../../slices/actorDataSlice";
import { goTo } from "../../utils/Utils";

import ErrorMessage from "../appErrorMessage/AppErrorMessage";
import Spinner from "../appSpinner/AppSpinner";

import "./actor.scss";
import ActorFilmography from "../actorFilmography/ActorFilmography";

function Actor(props) {
  const { id } = useParams();
  const actorInfoLoadingStatus = useSelector((state) => state.actorData.actorInfoLoadingStatus);
  const actorInfo = useSelector((state) => state.actorData.actorInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActorInfo(Number(id.slice(6))));
    goTo();
  }, [id]);

  if (actorInfoLoadingStatus === "loading") {
    return <Spinner />;
  } else if (actorInfoLoadingStatus === "error") {
    return <ErrorMessage />;
  } else if (!actorInfo) {
    return "Nothing found...";
  }

  return (
    <section className="actor">
      <div className="container">
        <h2 className="actor-title">{actorInfo.name}</h2>

        <div className="actor-inner">
          <div className="actor-info">
            <div className="actor-photo">
              {actorInfo.photo ? <img src={actorInfo.photo} alt={actorInfo.name} /> : null}
            </div>

            <div className="actor-info__inner">
              <div className="actor-info__item">
                <span>Birthday</span>
                <span>{actorInfo.birthday || 'No info...'}</span>
              </div>

              {actorInfo.deathday ? (
                <div className="actor-info__item">
                  <span>Day of Death</span>
                  <span>{actorInfo.deathday}</span>
                </div>
              ) : null}

              <div className="actor-info__item">
                <span>Place of Birth</span>
                <span>{actorInfo.placeOfBirth || 'No info...'}</span>
              </div>
            </div>
          </div>

          <div className="actor-content">
            <div className="actor-content__item">
              <h2 className="actor-content__title">Biography</h2>
              <p>{actorInfo.biography || 'No info...'}</p>
            </div>

            <div className="actor-content__item">
              <h2 className="actor-content__title">Filmography</h2>
              <ActorFilmography id={Number(id.slice(6))} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Actor;
