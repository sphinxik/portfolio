import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from "../../slices/dataSlice";

import "./appPagination.scss";

function AppPagination(props) {
  const currentPage = useSelector(state => state.data.currentPage);
  const totalPages = useSelector(state => state.data.totalPages);
  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if(totalPages <= 6) {
      const arr = [];
      for(let i = 1; i <= totalPages; i++) {
        arr.push(i);
      }
      setPages(arr);
    } else {
      if (currentPage <= 3) {
        setPages([1, 2, 3, 4, "...", totalPages]);
      } else if ((currentPage + 4) >= totalPages) {
        setPages([1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
      } else {
        setPages([1, '...', currentPage, currentPage + 1, currentPage + 2, '...', totalPages]);
      }
    }
  }, []);

  const onBtnClick = (e) => {
    const action = e.target.dataset.action;

    switch (action) {
      case "prev":
        updatePage(currentPage - 1);
        break;
      case "next":
        updatePage(currentPage + 1);
        break;
    }
  };

  const onPageBtnClick = (e) => {
    updatePage(Number(e.target.textContent))
  };

  const updatePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const renderItems = () => {
    return pages.map((item, index) => {
      const activeClass = (currentPage === item) ? "_current" : '';

      if (item === "...") {
        return <li key={index}><span>...</span></li>
      } else {
        return (
          <li key={index}>
            <button className={`pagination-btn ${activeClass}`} type="button" onClick={onPageBtnClick}>
              {item}
            </button>
          </li>
        );
      }
    });
  };

  return (
    <div className="pagination">
      {
        (currentPage > 1) ? <button className="pagination-btn pagination-btn--prev" type="button" data-action="prev" onClick={onBtnClick}>
                              &#5176;
                            </button> : null
      }
      
      <ul className="pagination-list">
        {
          renderItems()
        }
      </ul>

      {
        (currentPage < totalPages) ? <button className="pagination-btn pagination-btn--next" type="button" data-action="next" onClick={onBtnClick}>
                                      &#5171;
                                    </button>: null
      }
    </div>
  );
}

export default AppPagination;
