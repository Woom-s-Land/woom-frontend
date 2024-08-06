const MemberInfo = ({ member }) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-12 h-12 bg-sky-500'>캐릭터 얼굴</div>
      <div>{member.nickname}</div>
      <div className='text-xs'>({member.name})</div>
    </div>
  );
};
export default MemberInfo;
