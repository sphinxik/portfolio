import CurrenciesListItem from '../currenciesListItem/CurrenciesListItem';
import './currenciesList.scss';

function CurrenciesList(props) {
  const currencies = ["UAH", "USD", "EUR", "GBP", "PLN", "RUB"];

  return (
    <div className="rates-form__currencies-list">
      {
        currencies.map((currency) => <CurrenciesListItem key={currency} 
                                                         currency={currency} 
                                                         {...props} />)
      }
    </div>
  )
}

export default CurrenciesList;