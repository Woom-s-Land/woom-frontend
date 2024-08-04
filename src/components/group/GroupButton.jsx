const GroupButton = ({ buttonText, onClickEventHandler }) => {
  return (
    <button className='mx-16 whitespace-nowrap active:bg-group-button-active bg-group-button bg-contain bg-no-repeat bg-center p-5 text-center text-2xl text-base-color'>
      {buttonText}
    </button>
  );
};

export default GroupButton;
