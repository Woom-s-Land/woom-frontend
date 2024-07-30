import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = (url) => () => {
    navigate(url);
  };

  return (
    <div>
      <button onClick={handleClick('/home')}>마이홈으로</button>
      <br />
      <button onClick={handleClick('/map')}>그룹 공간으로</button>
      <br />
      <button onClick={handleClick('/login')}>로그인</button>
    </div>
  );
};

export default MainPage;
