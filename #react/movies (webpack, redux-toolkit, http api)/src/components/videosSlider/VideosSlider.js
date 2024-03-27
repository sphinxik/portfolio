import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideosSliderData } from "../../slices/videosSliderSlice";

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ErrorMessage from "../appErrorMessage/AppErrorMessage";
import Spinner from "../appSpinner/AppSpinner";
import VideoModal from '../videoModal/VideoModal';

import 'swiper/scss';
import 'swiper/css/pagination';
import './videosSlider.scss';

function VideosSlider({ dataType, id }) {
  const dataLoadingStatus = useSelector(state => state.videosSlider.dataLoadingStatus)
  const data = useSelector(state => state.videosSlider.data);
  const dispatch = useDispatch();

  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [modalVideoID, setModalVideoID] = useState(null);
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();

  useEffect(() => {
    dispatch(fetchVideosSliderData({dataType, id}));
  }, [dataType, id]);

  const openVideoModal = (e) => {
    e.preventDefault();
    setVideoModalOpen(true);
    setModalVideoID(e.currentTarget.dataset.videoId);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
  };

  const renderSlides = () => {
    const slides = data.map(item => {
      return (
        <SwiperSlide className="videos-slider__slide" key={item.id}>
          <a href="#" className="videos-slider__slide-link" data-video-id={item.id} onClick={openVideoModal} target="_blank">
            <div className="videos-slider__slide-img">
              <img src={`//img.youtube.com/vi/${item.id}/sddefault.jpg`} alt={item.title} />
            </div>
            <div className="videos-slider__slide-title">
              {item.title}
            </div>
          </a>
        </SwiperSlide>
      )
    });

    return slides;
  }

  let content = 'Videos not found...';

  if (dataLoadingStatus === "loading") {
    content = <Spinner/>;
  } else if (dataLoadingStatus === "error") {
    content = <ErrorMessage />;
  } else if (data.length) {
    content = renderSlides();
  }

  return(
    <>
      <section className='videos-slider__section _animateIn'>
        <div className="container">
          <div className="videos-slider__top">
            <h2 className="videos-slider__title title">
              Videos
            </h2>

            <div className="videos-slider__nav swiper-top-nav">
              <button className="videos-slider__nav-btn swiper-nav__btn swiper-nav__btn--prev"
                      type="button"
                      ref={swiperPrevRef}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                          <path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
                        </svg>
              </button>
              <button className="videos-slider__nav-btn swiper-nav__btn swiper-nav__btn--next"
                      type="button"
                      ref={swiperNextRef}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                          <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                        </svg>
              </button>
            </div>
          </div>

          <Swiper
            className='videos-slider'
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              prevEl: swiperPrevRef.current,
              nextEl: swiperNextRef.current,
            }}
            pagination={{ clickable: true }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = swiperPrevRef.current;
              swiper.params.navigation.nextEl = swiperNextRef.current;
            }}
            breakpoints={{
              0: {
                spaceBetween: 20,
                slidesPerView: 1.3,
              },
              577: {
                spaceBetween: 20,
                slidesPerView: 2,
              },
              992: {
                spaceBetween: 20,
                slidesPerView: 3,
              },
              1201: {
                spaceBetween: 30,
                slidesPerView: 3,
              },
            }}
          >
            {content}
          </Swiper>
        </div>
      </section>
      <VideoModal isOpen={isVideoModalOpen} onClose={closeVideoModal} videoID={modalVideoID} />
    </>
  );
}

export default VideosSlider;