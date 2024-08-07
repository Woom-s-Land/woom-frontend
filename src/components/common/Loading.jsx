import spinner from '../../assets/common/spinner.gif';

const Loading = () => {
  return (
    <div className='absolute w-full h-full flex flex-col items-center bg-black bg-opacity-30 justify-center'>
      <div className='text-lg text-center'>잠시만 기다려 주세요.</div>
      <img src={spinner} alt='로딩중' className='w-20' />
    </div>
  );
};

export default Loading;
