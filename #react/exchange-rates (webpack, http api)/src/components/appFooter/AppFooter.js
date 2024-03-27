import './appFooter.scss';

function AppFooter(props) {
  return (
    <footer className="footer">
      <div className="footer-body">
        <div className="footer-item">
          <div className="footer-item__title">Data from:</div>
          <a className="footer-item__link" href="https://bank.gov.ua/" target="_blank">bank.gov.ua</a>
        </div>
        
        <div className="footer-item">
          <div className="footer-item__title">Developer:</div>
          <a className="footer-item__link" href="mailto:ig.khoruzhenko@gmail.com">ig.khoruzhenko@gmail.com</a>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter;