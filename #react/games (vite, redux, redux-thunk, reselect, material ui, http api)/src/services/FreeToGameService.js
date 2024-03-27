import useHttp from "../hooks/http.hook";

function useFreeToGamesService() {
  const _apiBase = "https://free-to-play-games-database.p.rapidapi.com/api/";
  const _apiHeaders = {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "9b518864c9msh420f4e1608a5746p190321jsnb06fee980ac8",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  };
  
  const { request } = useHttp();

  const getGamesList = async () => {
    return await request(`${_apiBase}games?platform=pc`, 'GET', _apiHeaders);
  };

  const getGame = async (id) => {
    return await request(`${_apiBase}game?id=${id}`, 'GET', _apiHeaders);
  };

  return { getGamesList, getGame };
}

export default useFreeToGamesService;