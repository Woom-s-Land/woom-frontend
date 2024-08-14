import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import basicAxios from '../libs/axios/basicAxios';
import { alertActions } from '../store/alertSlice';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 *
 * @param specificComponent - 감쌀 컴포넌트
 * @param option            - null: 아무나 출인이 가능한 페이지, true: 로그인한 유저만 출입가능, false: 로그인한 유저는 접속불가능한 페이지
 * @returns {*}
 *
 */
export default function (SpecificComponent, option) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const isInMap = location.pathname.startsWith('/map');
  const woomsId = location.pathname.split('/')[2];

  const showAlertAndRedirect = (message, redirectTo) => {
    dispatch(alertActions.showAlert({ message, type: 'ERROR' }));
    navigate(redirectTo);
  };

  function AuthenticationCheck() {
    useEffect(() => {
      if (option) {
        if (!isLogin) {
          basicAxios({
            method: 'get',
            url: `/authorization/users`,
          }).catch(() => {
            showAlertAndRedirect(
              '사용자 정보를 인증할 수 없습니다. 로그인 해주시길 바랍니다.',
              '/'
            );
          });
        } else if (isLogin && isInMap) {
          basicAxios({
            method: 'get',
            url: `/wooms/${woomsId}/info`,
          }).catch(() => {
            showAlertAndRedirect(
              '잘못된 접근입니다. 그룹 목록을 통해 이동해주세요',
              '/home'
            );
          });
        }
      }
    });

    return <SpecificComponent />;
  }

  return <AuthenticationCheck />;
}
