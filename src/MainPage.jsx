import { useNavigate } from 'react-router-dom';
const MainPage = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/home');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <div>
      <button onClick={handleHomeClick}>마이홈으로</button>
      <button onClick={handleLoginClick}>로그인</button>
    </div>
  );
};

export default MainPage;
