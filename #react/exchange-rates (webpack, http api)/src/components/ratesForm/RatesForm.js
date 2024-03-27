import { useState, useEffect } from "react";
import CurrenciesList from "../currenciesList/CurrenciesList";
import "./ratesForm.scss";

function RatesForm(props) {
  const [currencySell, setCurrencySell] = useState("UAH");
  const [currencyBuy, setCurrencyBuy] = useState("USD");
  const [currencyValue, setCurrencyValue] = useState('');
  const [result, setResult] = useState(0);

  useEffect(() => {
    calcResult();
  }, [currencyValue, currencySell, currencyBuy]);

  const onChangeCurrency = (e) => {
    const currentCurrency = e.target.value;
    (e.target.name === 'currency-sell') ? setCurrencySell(currentCurrency) : setCurrencyBuy(currentCurrency);
  }

  const onChangeCurrencyValue = (e) => {
    setCurrencyValue(e.target.value.replace(/\D/gim, ''));
  };

  const calcResult = () => {
    const currentCurrencySellRate = props.data.filter(item => item.cc === currencySell)[0].rate;
    const currentCurrencyBuyRate = props.data.filter(item => item.cc === currencyBuy)[0].rate;
    const currentResult = currencyValue * currentCurrencySellRate / currentCurrencyBuyRate;

    setResult(currentResult.toFixed(2));
  };

  return (
    <form className="rates-form">
      <div className="rates-form__item">
        <CurrenciesList currentCurrency={currencySell} 
                        onChangeCurrency={onChangeCurrency} 
                        currencyType="sell" />

        <input className="rates-form__input" type="text" name="input-currency-value" value={currencyValue} onChange={onChangeCurrencyValue} />
      </div>

      <div className="rates-form__item">
        <CurrenciesList currentCurrency={currencyBuy} 
                        onChangeCurrency={onChangeCurrency} 
                        currencyType="buy" />

        <input className="rates-form__input rates-form__input--readonly" type="text" name="input-result" value={result} tabIndex="-1" readOnly />
      </div>
    </form>
  )
}

export default RatesForm;