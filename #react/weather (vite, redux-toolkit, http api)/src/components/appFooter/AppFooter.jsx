import "./appFooter.scss";

const AppFooter = (props) => {
  return(
    <footer className="footer">
      <div className="container">
        <div className="footer__body">
          <div className="footer__item">
            <div className="footer__item-title">Data from:</div>
            <a className="footer__item-link" href="https://openweathermap.org/" target="_blank">openweathermap.org</a>
          </div>
          
          <div className="footer__item">
            <div className="footer__item-title">Developer:</div>
            <a className="footer__item-link" href="mailto:ig.khoruzhenko@gmail.com">ig.khoruzhenko@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default AppFooter;