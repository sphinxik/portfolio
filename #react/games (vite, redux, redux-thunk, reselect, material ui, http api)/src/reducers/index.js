const initialState = {
  dataLoadingStatus: "idle",
  singleDataLoadingStatus: "idle",
  data: [],
  filters: {
    sort_by: "",
    genres: [],
    years: [],
  },
  singleData: null,
  searchValue: "",
  favorites: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DATA_FETCHING":
      return {
        ...state,
        dataLoadingStatus: "loading",
      };
    case "DATA_FETCHING_ERROR":
      return {
        ...state,
        dataLoadingStatus: "error",
      };
    case "DATA_FETCHED":
      return {
        ...state,
        data: action.payload,
        dataLoadingStatus: "idle",
      };
    case "SINGLE_DATA_FETCHING":
      return {
        ...state,
        singleDataLoadingStatus: "loading",
      };
    case "SINGLE_DATA_FETCHING_ERROR":
      return {
        ...state,
        singleDataLoadingStatus: "error",
      };
    case "SINGLE_DATA_FETCHED":
      return {
        ...state,
        singleData: action.payload,
        singleDataLoadingStatus: "idle",
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };
    case "SET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.payload,
      };
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
