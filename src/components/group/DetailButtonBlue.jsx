const DetailButtonBlue = ({ buttonText, handleClick }) => {
  return (
    <button
      style={{
        backgroundSize: '100% 100%', // 세로 높이를 100%로 고정하고 가로 폭에 맞게 조정
        backgroundColor: 'transparent',
      }}
      className='active:bg-gr-btn-md-blue-active bg-gr-btn-md-blue bg-contain whitespace-nowrap text-xxs bg-no-repeat bg-center py-2 px-2 mr-1'
    >
      {buttonText}
    </button>
  );
};
export default DetailButtonBlue;
