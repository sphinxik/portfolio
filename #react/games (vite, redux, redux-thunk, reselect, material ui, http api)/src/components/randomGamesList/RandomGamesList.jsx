import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from 'react-redux';

import Spinner from "../appSpinner/AppSpinner";
import GameCard from "../gameCard/GameCard";
import "./randomGamesList.scss";

const RandomGamesList = () => {
  const data = useSelector(state => state.data);
  const dataLoadingStatus = useSelector(state => state.singleDataLoadingStatus);
  const [randomData, setRandomData] = useState([]);
  const randomGamesRef = useRef();

  useEffect(() => {
    updateGamesList();
  }, [data]);

  const onRefreshRandomGamesList = () => {
    window.scrollTo({
      top: randomGamesRef.current.getBoundingClientRect().top + window.pageYOffset - 60,
      behavior: 'smooth'
    });

    updateGamesList();
  };

  const updateGamesList = useCallback(() => {
    if (data.length) {
      const randomIndexesArr = [];
      const randomGamesArr = [];

      while (randomIndexesArr.length < 4) {
        const randomIndex = Math.floor(Math.random() * data.length);

        if (!randomIndexesArr.includes(randomIndex)) {
          randomIndexesArr.push(randomIndex);
        }
      }

      randomIndexesArr.forEach(index => {
        randomGamesArr.push(data[index]);
      });

      setRandomData(randomGamesArr);
    }
  }, [data]);

  const renderContent = () => {
    return (
      <>
        <div className="random-games__list games__list">
          {randomData.map(item => <GameCard key={item.id} data={item} />)}
        </div>

        <button className="random-games__btn btn" type="button" onClick={onRefreshRandomGamesList}>
          <span>Refresh</span>
        </button>
      </>
    )
  };

  let content = 'There are no games...';
  if (dataLoadingStatus === 'error') {
    content = 'Error !!!';
  } else if (dataLoadingStatus === 'loading') {
    content = <Spinner />;
  } else if (data.length) {
    content = renderContent();
  }

  return (
    <section ref={randomGamesRef} className="random-games">
      <div className="container">
        <h2 className="random-games__title title">Random Games</h2>
        {content}
      </div>
    </section>
  );
};
export default RandomGamesList;