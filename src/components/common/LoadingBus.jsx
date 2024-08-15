import loadingBus from '../../assets/common/loading_bus.gif';

const LoadingBus = () => {
  return (
    <div className='fixed w-full h-full bg-map-all bg-cover'>
      <div className='absolute inset-0 bg-black opacity-80 z-10' />
      <img src={loadingBus} alt='이동중' className='w-full z-50 relative' />
    </div>
  );
};

export default LoadingBus;
