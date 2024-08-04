const DetailButton = ({ buttonText, handleClick }) => {
  return (
    <button className='active:bg-gr-btn-md-active bg-gr-btn-md bg-contain text-sm bg-no-repeat bg-center p-5 text-base-color'>
      {buttonText}
    </button>
  );
};
export default DetailButton;
