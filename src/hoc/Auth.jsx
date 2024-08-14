import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import basicAxios from '../libs/axios/basicAxios';
import { alertActions } from '../store/alertSlice';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @param specificComponent - 감쌀 컴포넌트
 * @param option            - null: 아무나 출인이 가능한 페이지, true: 로그인한 유저만 출입가능, false: 로그인한 유저는 접속불가능항 페이지
 * @returns {*}
 *
 */
export default function (SpecificComponent, option) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.auth.isAuthenticated);

  function AuthenticationCheck() {
    useEffect(() => {
      if (option) {
        if (!isLogin) {
          basicAxios({
            method: 'get',
            url: `/authorization/users`,
          }).catch(() => {
            dispatch(
              alertActions.showAlert({
                message:
                  '사용자 정보를 인증할 수 없습니다. 로그인 해주시길 바랍니다.',
                type: 'ERROR',
              })
            );
            navigate('/');
          });
        }
      }
    });

    return <SpecificComponent />;
  }

  return <AuthenticationCheck />;
}
