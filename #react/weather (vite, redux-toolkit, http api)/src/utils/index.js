export const addDataToLocalStorage = (data) => {
  localStorage.setItem('ikcWeather', JSON.stringify(data));
};

export const getDate = (cityTimezone = 0) => {
  const currentDate = new Date();
  const currentDateTimezoneOffset = currentDate.getTimezoneOffset() * 60000;
  const currentDateTimestamp = currentDate.getTime() + currentDateTimezoneOffset + cityTimezone * 1000;

  const today = new Date(currentDateTimestamp);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }

  const date = today.toLocaleDateString("en-US", options);
  const day = days[today.getDay()];
  const time = today.toLocaleTimeString().slice(0,-3);

  return {date, day, time};
};


export const getDateFromTimestamp = (temestamp) => {
  const fullDate = new Date(temestamp * 1000);
  const date = fullDate.toLocaleDateString("en-US");
  const time = fullDate.toLocaleTimeString().slice(0,-3);
  return {date, time};
};