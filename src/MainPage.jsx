import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate(url);
  };

  return (
    <div>
      <div className='flex h-full flex-col'>
        <header className='flex items-center justify-between border-b border-b-[#F4EFE6] px-10 py-3'>
          <div className='flex items-center gap-4 text-[#1C160C]'>
            <div className='h-4 w-4'>
              <svg
                viewBox='0 0 48 48'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z'
                  fill='currentColor'
                ></path>
              </svg>
            </div>
            <h2 className='text-lg font-bold leading-tight tracking-[-0.015em]'>
              Wooms
            </h2>
          </div>
          <div className='flex flex-1 justify-end gap-8'>
            <button
              onClick={() => handleClick('/login')}
              className='flex h-10 min-w-[84px] max-w-[480px] items-center justify-center rounded-xl px-4 bg-[#019863] text-white text-sm font-bold leading-normal tracking-[0.015em]'
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
                  className='flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10'
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/1c6e5bdb-a3c7-4455-b61b-2f00a079ab63.png")`,
                  }}
                >
                  <h1 className='text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl text-center'>
                    WOOMS에서 따뜻함을 느껴보세요
                  </h1>
                  <button
                    onClick={() => handleClick('/signup')}
                    className='flex h-10 min-w-[84px] max-w-[480px] items-center justify-center rounded-xl px-4 @[480px]:h-12 @[480px]:px-5 bg-[#019863] text-white text-sm font-bold leading-normal tracking-[0.015em]'
                  >
                    <span className='truncate'>회원가입</span>
                  </button>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-10 px-4 py-10 @container'>
              <h1 className='text-[#1C160C] text-[32px] font-bold leading-tight @[480px]:text-4xl max-w-[720px]'>
                Features
              </h1>
              <div className='grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3'>
                {[
                  {
                    title: '사진 픽셀 변환',
                    description: '사진을 픽셀 아트로 변환해보세요',
                    image:
                      'https://cdn.usegalileo.ai/sdxl10/4be7f934-a1be-467c-980a-b7fff7c05ca4.png',
                  },
                  {
                    title: '사진 지도',
                    description: '어디에서 사진을 많이 찍었을까요?',
                    image:
                      'https://cdn.usegalileo.ai/sdxl10/cc17603a-613b-4cf2-a00c-1340792d5660.png',
                  },
                  {
                    title: '편지',
                    description: '따뜻한 마음을 전달해보세요',
                    image:
                      'https://cdn.usegalileo.ai/sdxl10/13905a44-6032-487d-a1a4-cc73dc4c272f.png',
                  },
                  {
                    title: '라디오',
                    description: '내 이야기를 사연으로 남겨보세요',
                    image:
                      'https://cdn.usegalileo.ai/sdxl10/e45856cc-bf86-4cf2-806c-768769c31dd8.png',
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
              {[
                'https://cdn.usegalileo.ai/sdxl10/1de62192-826e-42e9-96f0-90cde09cd511.png',
                'https://cdn.usegalileo.ai/sdxl10/6c218706-fad7-490e-8121-47a0d334cc05.png',
                'https://cdn.usegalileo.ai/sdxl10/516ba82c-89e1-4a94-b0c3-265bd1a9c0d7.png',
              ].map((image, idx) => (
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
        <footer className='flex justify-center border border-u'>
          <div className='flex max-w-[960px] flex-1 flex-col'>
            <footer className='flex flex-col gap-6 px-5 py-4 text-center @container'>
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
