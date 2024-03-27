import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import Spinner from "../appSpinner/AppSpinner";
import GameCard from "../gameCard/GameCard";
import './catalogList.scss';

const CatalogList = () => {
  const filters = useSelector(state => state.filters);
  const data = useSelector(state => state.data);
  const dataLoadingStatus = useSelector(state => state.singleDataLoadingStatus);
  const [currentOffset, setCurrentOffset] = useState(12);
  const [filteredData, setFilteredData] = useState(data);
  const [currentGamesList, setCurrentGamesList] = useState([]);

  useEffect(() => {
    if (data.length) {
      filterData(data);
    }
  }, [data, filters]);

  const filterData = (data) => {
    let filteredData = data;

    // filter by years
    if (filters['years'].length) {
      filteredData = filteredData.filter(item => {
        const itemYear = new Date(item.release_date).getFullYear();
        if (itemYear >= filters['years'][0] && itemYear <= filters['years'][1]) {
          return item;
        }
      });
    }

    // filter by genres
    if (filters['genres'].length) {
      filteredData = filteredData.filter((item) => filters['genres'].includes(item.genre));
    }

    // sort by
    if (filters['sort_by'] !== '') {
      if (filters['sort_by'] === 'title_az' || filters['sort_by'] === 'title_za') {
        filteredData.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          }

          if (titleA > titleB) {
            return 1;
          }

          return 0;
        });

        if (filters['sort_by'] === 'title_za') {
          filteredData.reverse();
        }
      }

      if (filters['sort_by'] === 'date_desc' || filters['sort_by'] === 'date_asc') {
        filteredData.sort((a, b) => {
          const dateA = Date.parse(a.release_date);
          const dateB = Date.parse(b.release_date);

          return dateB - dateA;
        });

        if (filters['sort_by'] === 'date_asc') {
          filteredData.reverse();
        }
      }
    }

    setFilteredData(filteredData);
    updateGamesList(filteredData, 0, currentOffset);
  }

  const updateGamesList = (filteredData, from, to) => {
    const newList = (from === 0) ? filteredData.slice(from, to) : [...currentGamesList, ...filteredData.slice(from, to)];
    setCurrentGamesList(newList);
  };

  const loadMore = () => {
    updateGamesList(filteredData, currentOffset, currentOffset + 4);
    setCurrentOffset((offset) => offset + 4);
  };

  if(dataLoadingStatus === 'error') {
    return 'Error !!!';
  } else if (dataLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (data.length === 0) {
    return 'There are no games...';
  }

  return (
    <>
      <div className="catalog__list games__list">
        {
          currentGamesList.map((item) => <GameCard key={item.id} data={item} />)
        }
      </div>

      {
        filteredData.length > currentGamesList.length ?
          <button className="catalog__btn btn" type="button" onClick={loadMore}>
            <span>Loadmore</span>
          </button> : null
      }
    </>
  );
};

export default CatalogList;