export const fetchData = (fetchFunc) => (dispatch) => {
  dispatch(dataFetching());

  fetchFunc().then(data => dispatch(dataFetched(data)))
    .catch(() => dispatch(dataFetchingError()));
};

export const fetchSingleData = (fetchFunc, id) => (dispatch) => {
  dispatch(singleDataFetching());

  fetchFunc(id).then(data => dispatch(singleDataFetched(data)))
    .catch(() => dispatch(singleDataFetchingError()));
};

export const dataFetching = () => {
  return {
    type: 'DATA_FETCHING'
  };
};

export const dataFetchingError = () => {
  return {
    type: 'DATA_FETCHING_ERROR'
  };
};

export const dataFetched = (data) => {
  return {
    type: 'DATA_FETCHED',
    payload: data
  };
};

export const singleDataFetching = () => {
  return {
    type: 'SINGLE_DATA_FETCHING'
  }
};

export const singleDataFetchingError = () => {
  return {
    type: 'SINGLE_DATA_FETCHING_ERROR'
  }
};

export const singleDataFetched = (data) => {
  return {
    type: 'SINGLE_DATA_FETCHED',
    payload: data
  }
};

export const setFilters = (filters) => {
  return {
    type: 'SET_FILTERS',
    payload: filters
  }
};

export const setSearchValue = (value) => {
  return {
    type: 'SET_SEARCH_VALUE',
    payload: value
  }
};

export const setFavorites = (data) => {
  return {
    type: 'SET_FAVORITES',
    payload: data
  }
};