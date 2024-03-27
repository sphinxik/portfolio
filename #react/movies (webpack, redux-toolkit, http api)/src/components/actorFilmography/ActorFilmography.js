import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchActorFilmography } from "../../slices/actorDataSlice";

import ErrorMessage from "../appErrorMessage/AppErrorMessage";
import Spinner from "../appSpinner/AppSpinner";

import './actorFilmography.scss';

function ActorFilmography({id}) {
  const actorFilmographyLoadingStatus = useSelector(state => state.actorData.actorFilmographyLoadingStatus);
  const actorFilmography = useSelector(state => state.actorData.actorFilmography);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActorFilmography(id));
  }, [id]);

  if(actorFilmographyLoadingStatus === 'loading') {
    return <Spinner/>;
  } else if (actorFilmographyLoadingStatus === 'error') {
    return <ErrorMessage/>;
  } else if (!actorFilmography.length) {
    return 'Nothing found...';
  }

  return (
    <table className="actor-filmography table">
      <tbody>
        <tr>
          <th>Year</th>
          <th>Title</th>
          <th>Character</th>
        </tr>

        {
          actorFilmography.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.year}</td>
                <td><Link to={`/movie/${item.id}`}>{item.title}</Link></td>
                <td>{item.character}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default ActorFilmography;
