import './currenciesListItem.scss';

function CurrenciesListItem({currency, currentCurrency, onChangeCurrency, currencyType}) {
  const inputName = `currency-${currencyType}`;

  return (
    <label className="radio-label">
      <input className="radio-input" type="radio" 
                                     name={inputName} 
                                     defaultValue={currency} 
                                     onChange={onChangeCurrency} 
                                     checked={currency === currentCurrency} />
      <span className="radio-custom"></span>
      <span className="radio-txt">{currency}</span>
    </label>
  )
}

export default CurrenciesListItem;