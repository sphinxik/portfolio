import { useState, useEffect } from "react";
import useHttp from "../../hooks/http.hook";

import RatesForm from "../ratesForm/RatesForm";
import AppFooter from "../appFooter/AppFooter";

import "./app.scss";
import spinnerImg from '../../resources/img/loading.svg';

function App() {
  const bankAPI = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
  const {loading, request, error} = useHttp();
  const [data, setData] = useState();

  useEffect(() => {
    request(bankAPI).then(data => {
      data.push({   // добавляем гривну, так как это курс валют по отношению к гривне
        cc: 'UAH',
        rate: 1.0000
      })
      setData(data);
    });
  }, []);

  const errorMessage = error ? <div className="App-error">Error!!! Please try again later...</div> : null;
  const spinner = loading ? <img className="App-loading" src={spinnerImg} alt="loading" /> : null;
  const content = (error || loading || !data) ? null : <RatesForm data={data} />;

  return (
    <div className="App">
      <main className="App-main">
        <div className="App-body">
          <h1 className="App-title">Exchange rates</h1>
          {content}
          {errorMessage}
          {spinner}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

export default App;
