import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/home');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handlePhotoClick = () => {
    navigate('/photo');  
  };
  return (
    <div>
      <button onClick={handleHomeClick}>마이홈으로</button>
      <br />
      <button onClick={handleLoginClick}>로그인</button>
      <br />
      <button onClick={handlePhotoClick}>사진</button>
    </div>
  );
};

export default MainPage;
