import './appFooter.scss';

function AppFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-body">
          <div className="footer-item">
            <div className="footer-item__title">Data from:</div>
            <a className="footer-item__link" href="https://www.themoviedb.org/" target="_blank">themoviedb.org</a>
          </div>
          
          <div className="footer-item">
            <div className="footer-item__title">Developer:</div>
            <a className="footer-item__link" href="mailto:ig.khoruzhenko@gmail.com">ig.khoruzhenko@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter;