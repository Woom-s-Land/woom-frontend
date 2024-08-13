const MenuButton = ({ buttonText, onClickEventHandler }) => {
  return (
    <button
      onClick={onClickEventHandler}
      className='mx-3 mt-2 whitespace-nowrap active:bg-gr-btn-active bg-gr-btn bg-contain bg-no-repeat bg-center px-5 py-3 text-center text-2xl text-base-color'
    >
      {buttonText}
    </button>
  );
};

export default MenuButton;
