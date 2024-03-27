import ReactDOM from 'react-dom';

function VideoModal({ isOpen, onClose, videoID }) {
  const onBodyClick = (e) => {
    if(e.target.classList.contains('popup-body')) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={`popup ${ isOpen ? '_open' : ''}`}>
      <div className="popup-body" onClick={onBodyClick}>
        <div className="popup-content">
          <button className="popup-close btn-close" onClick={onClose}></button>

          <div className="popup-video">
            {isOpen ? <iframe src={`https://www.youtube.com/embed/${videoID}?rel=0&showinfo=0&autoplay=1`} allowFullScreen allow="autoplay" /> : null}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default VideoModal;