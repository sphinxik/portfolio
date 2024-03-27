import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleData } from "../../actions";
import useFreeToGamesService from "../../services/FreeToGameService";

import CardInner from "../cardInner/CardInner";
import "./card.scss";

const Card = () => {
  const { getGame } = useFreeToGamesService();
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(state => state.singleData);

  useEffect(() => {
    dispatch(fetchSingleData(getGame, Number(id.slice(5))));
  }, [id]);


  let cardBG = null;
  if (data) {
    cardBG = data.screenshots.length ? { backgroundImage: `url(${data.screenshots[0].image})` } : null;
  }

  return (
    <section className="card page-section">
      <div className="card__bg" style={cardBG}></div>
      <div className="container">
        {
          data ? <CardInner data={data} /> : 'There is no info about this game...'
        }
      </div>
    </section>
  );
};
export default Card;