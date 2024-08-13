import { useNavigate } from 'react-router-dom';

import map from './assets/map/map.png';
import imgLogo from './assets/logo/imgLogo.png';
import letterLogo from './assets/logo/letterLogo.png';
import firstImg from './assets/mainPage/firstImg.png';
import secondImg from './assets/mainPage/secondImg.png';
import thirdImg from './assets/mainPage/thirdImg.png';

import letterImg from './assets/mainPage/letterImg.png';
import photoMapImg from './assets/mainPage/photoMapImg.png';

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate(url);
  };

  return (
    <div>
      <div className='flex h-full flex-col'>
        <header className='flex items-center justify-between border-b border-b-[#F4EFE6] px-10'>
          <div className='flex items-center gap-4 text-[#1C160C]'>
            <div className='w-28'>
              <img src={imgLogo} alt='imgLogo' />
            </div>
            <div className='w-48'>
              <img src={letterLogo} alt='imgLogo' />
            </div>
          </div>
          <div className='flex flex-1 justify-end gap-8'>
            <button
              onClick={() => handleClick('/login')}
              className='flex h-10 min-w-[84px] max-w-[480px] items-center justify-center px-4 font-bold leading-normal tracking-[0.015em] py-2 border border-transparent rounded-xl shadow-sm text-sm text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              <span className='truncate'>로그인</span>
            </button>
          </div>
        </header>
        <div className='px-40 flex flex-1 justify-center py-5'>
          <div className='flex flex-col max-w-[960px] flex-1'>
            <div className='@container'>
              <div className='@[480px]:p-4'>
                <div
                  className='flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10 rounded-xl'
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${map})`,
                  }}
                >
                  <h1 className='text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl text-center'>
                    WOOMS에서 따뜻함을 느껴보세요
                  </h1>
                  <button
                    onClick={() => handleClick('/signup')}
                    className='flex h-10 min-w-[84px] max-w-[480px] items-center justify-center px-4 font-bold leading-normal tracking-[0.015em] py-2 border border-transparent rounded-xl shadow-sm text-sm text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                    '
                  >
                    <span className='truncate'>회원가입</span>
                  </button>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-10 px-4 py-10 @container text-center'>
              <h1 className='text-[#1C160C] text-[32px] font-bold leading-tight @[480px]:text-4xl max-w-[720px] mx-auto'>
                WOOMS의 다양한 기능을 만나보세요!
              </h1>
              <div className='grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3'>
                {[
                  {
                    title: '사진 픽셀 변환',
                    description: '사진을 픽셀 아트로 변환해보세요',
                    image: photoMapImg,
                  },
                  {
                    title: '사진 지도',
                    description: '어디에서 사진을 많이 찍었을까요?',
                    image: photoMapImg,
                  },
                  {
                    title: '편지',
                    description: '따뜻한 마음을 전달해보세요',
                    image: letterImg,
                  },
                  {
                    title: '라디오',
                    description: '내 이야기를 사연으로 남겨보세요',
                    image: photoMapImg,
                  },
                ].map((feature, idx) => (
                  <div key={idx} className='flex flex-col gap-3 pb-3'>
                    <div
                      className='w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl'
                      style={{ backgroundImage: `url(${feature.image})` }}
                    ></div>
                    <div>
                      <p className='text-[#1C160C] text-base font-medium leading-normal'>
                        {feature.title}
                      </p>
                      <p className='text-[#A18249] text-sm font-normal leading-normal'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4'>
              {[firstImg, secondImg, thirdImg].map((image, idx) => (
                <div key={idx} className='flex flex-col gap-3'>
                  <div
                    className='w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl'
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className='flex justify-center border border-u-[#F4EFE6]'>
          <div className='flex max-w-[960px] flex-1 flex-col'>
            <footer className='flex flex-col gap-6 px-5 py-3 text-center @container'>
              <div className='flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around'>
                <span className='text-[#A18249] text-base font-normal leading-normal min-w-20'>
                  송도언
                </span>
                <span className='text-[#A18249] text-base font-normal leading-normal min-w-20'>
                  홍성우
                </span>
                <span className='text-[#A18249] text-base font-normal leading-normal min-w-20'>
                  이현수
                </span>
                <span className='text-[#A18249] text-base font-normal leading-normal min-w-20'>
                  김도예
                </span>
                <span className='text-[#A18249] text-base font-normal leading-normal min-w-20'>
                  정훈
                </span>
                <span className='text-[#A18249] text-base font-normal leading-normal min-w-20'>
                  윤대영
                </span>
              </div>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;
