const MemberInfo = ({ member }) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img
        src={`/src/assets/${member.costume}/h1.png`}
        alt='프로필 이미지'
        className='w-9 h-9 rounded-full'
      />
      <div>{member.nickname}</div>
      <div className='text-xs'>({member.name})</div>
    </div>
  );
};
export default MemberInfo;
