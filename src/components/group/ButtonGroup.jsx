const ButtonGroup = ({ buttonText, onClickEventHandler }) => {
  return (
    <button
      onClick={onClickEventHandler}
      className='mx-12 whitespace-nowrap active:bg-gr-btn-active bg-gr-btn bg-contain bg-no-repeat bg-center p-5 text-center text-2xl text-base-color'
    >
      {buttonText}
    </button>
  );
};

export default ButtonGroup;
