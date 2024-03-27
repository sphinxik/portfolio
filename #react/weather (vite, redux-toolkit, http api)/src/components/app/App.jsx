import { Toaster } from 'react-hot-toast';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';
import CitiesList from '../citiesList/CitiesList';

import './app.scss';

function App() {
  return (
    <div className='wrapper'>
      <div className="wrapper__background"></div>
      <AppHeader />

      <div className="main">
        <section className="cities">
          <div className="container">
            <h1 className="cities__title section__title">Weather</h1>
            <CitiesList />
          </div>
        </section>
      </div>

      <AppFooter />
      <Toaster />
    </div>
  )
}

export default App;