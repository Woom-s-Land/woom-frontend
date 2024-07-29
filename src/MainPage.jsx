import { useNavigate } from 'react-router-dom';
const MainPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  };
  return (
    <div>
      <button onClick={handleClick}>홈으로</button>
    </div>
  );
};

export default MainPage;
