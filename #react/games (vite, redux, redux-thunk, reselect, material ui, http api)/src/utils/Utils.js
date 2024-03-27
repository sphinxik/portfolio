export function addFavoritesToLocalStorage(data) {
  localStorage.setItem('ikcgames_favorites', JSON.stringify(data));
}