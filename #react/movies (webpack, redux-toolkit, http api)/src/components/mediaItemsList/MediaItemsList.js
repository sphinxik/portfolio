import { useRef } from "react";
import { useSelector } from 'react-redux';

import ErrorMessage from "../appErrorMessage/AppErrorMessage";
import Spinner from "../appSpinner/AppSpinner";
import MediaItem from "../mediaItem/MediaItem";
import AppPagination from "../appPagination/AppPagination";

import './mediaItemsList.scss';

function MediaItemsList(props) {
  const dataLoadingStatus = useSelector(state => state.data.dataLoadingStatus);
  const data = useSelector(state => state.data.dataList);
  const totalPages = useSelector(state => state.data.totalPages);
  const mediaItemsListRef = useRef();

  if (dataLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (dataLoadingStatus === "error") {
    return <ErrorMessage />;
  }

  const renderItems = () => {
    return data.map((item) => <MediaItem key={item.id} {...item} />)
  }

  const content = data.length ? renderItems() : 'Nothing found...';

  return (
    <>
      <div ref={mediaItemsListRef} className="media-items__list _animateIn">
        { content }
      </div>

      {
        (totalPages >= 2) ? <AppPagination /> : null
      }
    </>
  )
}

export default MediaItemsList;