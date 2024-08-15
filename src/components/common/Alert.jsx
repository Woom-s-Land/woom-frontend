import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from '../../store/alertSlice';
import ReactDOM from 'react-dom';

const Alert = () => {
  const dispatch = useDispatch();
  const { show, message, type } = useSelector((state) => state.alert);

  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    show ? {} : {};
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        dispatch(alertActions.hideAlert());
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500);

      return () => clearTimeout(exitTimer);
    }
  }, [show, dispatch]);

  if (!isVisible) return null;

  const bgColor = type === 'SUCCESS' ? 'bg-green-600' : 'bg-red-600';
  const elementColor = type === 'SUCCESS' ? 'bg-green-700' : 'bg-red-700';
  const borderColor = type === 'SUCCESS' ? 'bg-green-800' : 'bg-red-800';
  const textColor = type === 'SUCCESS' ? 'text-white' : 'text-white';

  const commonErrorMessage =
    message === undefined
      ? '알 수 없는 오류가 발생했습니다. 다시 시도해주세요'
      : message;

  const portalRoot = document.getElementById('portal-root');

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 right-0 flex items-center justify-center z-50 p-4 transition-transform duration-500 ${show ? 'alert-enter' : 'alert-exit'}`}
    >
      <div
        className={`text-center py-4 px-6 rounded-lg shadow-lg opacity-100 ${bgColor}`}
      >
        <div
          className={`p-2 ${elementColor} text-white leading-none rounded-full flex items-center`}
          role='alert'
        >
          <span
            className={`flex rounded-full ${borderColor} uppercase px-2 py-1 text-xs font-bold mr-3 ${textColor}`}
          >
            {type}
          </span>
          <span className='font-semibold mr-2 text-left flex-auto'>
            {commonErrorMessage}
          </span>
        </div>
      </div>
    </div>,
    portalRoot
  );
};

export default Alert;
