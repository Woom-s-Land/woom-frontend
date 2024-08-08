// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from '../../common/Modal';
// import Button from '../../common/Button'; // assuming you have a Button component

// const baseUrl = 'https://i11e206.p.ssafy.io';

// function Comment({ woomsId, onClose }) {
//   const [comments, setComments] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}/api/wooms/${woomsId}`, {
//           params: { page }
//         });
//         setComments(response.data.content);
//         setTotalPages(response.data.totalPages);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();
//   }, [woomsId, page]);

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (inputValue.trim()) {
//       const newComment = {
//         nickname: "사용자 이름",
//         content: inputValue,
//         costume: 0,
//         createdDate: new Date().toISOString(),
//       };

//       try {
//         const response = await axios.post(`${baseUrl}/api/comments/${woomsId}`, newComment);
//         setComments([response.data, ...comments]);
//         setInputValue("");
//       } catch (error) {
//         console.error('Error posting comment:', error);
//       }
//     }
//   };

//   const handleNextPage = () => {
//     if (page < totalPages - 1) {
//       setPage(page + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };

//   return (
//     <Modal onClose={onClose}>
//       <div className="px-4">
//         <h2 className="text-2xl mt-4 mb-4">방명록</h2>
//         <form onSubmit={handleSubmit} className="items-center">
//           <div
//             className="relative ml-20 mb-5 bg-center bg-no-repeat flex items-center justify-between"
//             style={{
//               backgroundImage: `url('src/assets/comment/input-box.png')`,
//               backgroundSize: 'contain',
//               backgroundPosition: 'center',
//               height: '50px',
//               width: '500px',
//             }}
//           >
//             <input
//               type="text"
//               value={inputValue}
//               onChange={handleInputChange}
//               placeholder="댓글을 입력하세요"
//               className="w-[350px] h-[30px] ml-9 text-sm placeholder-white"
//               style={{ fontSize: '12px', border: 'none', background: 'transparent' }}
//             />
//             <Button
//               label="작성"
//               type="submit"
//               className="h-[30px] text-sm"
//               style={{ marginLeft: '20px' }} // 왼쪽 여백 추가
//             />
//           </div>
//         </form>
//         <ul className="list-none">
//           {comments.map((comment, index) => (
//             <li key={index} className="relative flex items-start mb-1">
//               <div className="flex-col items-center mt-1 ml-5">
//                 <img
//                   src={`src/assets/profile/profile-${comment.costume}.png`}
//                   alt="프로필 이미지"
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <span className="text-xs mt-1">{comment.nickname}</span>
//               </div>
//               <div
//                 className="absolute ml-20 bg-center bg-no-repeat rounded overflow-hidden mr-10"
//                 style={{
//                   backgroundImage: `url('src/assets/comment/dialoge-box.png')`,
//                   backgroundSize: 'contain',
//                   backgroundPosition: 'center',
//                   width: '500px',
//                   height: '50px',
//                 }}
//               >
//                 <div className="relative flex flex-col ml-1 pl-3">
//                   <div className="text-xs text-left ml-5 mt-4">
//                     {comment.content}
//                   </div>
//                   <span className="text-xs text-right mr-3">
//                     {new Date(comment.createdDate).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//         <div className="relative flex justify-between items-center mt-4">
//           <button
//             className={`w-8 h-8 bg-left-bt bg-cover ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//             onClick={handlePreviousPage}
//             disabled={page === 0}
//           />
//           <button
//             className={`w-8 h-8 bg-right-bt bg-cover ${page >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
//             onClick={handleNextPage}
//             disabled={page >= totalPages - 1}
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default Comment;

import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button'; // assuming you have a Button component

// 임의의 댓글 데이터
const mockComments = [
  {
    nickname: 'User1',
    content: '아아아아아아아아아아아아아아아아아아아아아아아',
    costume: 1,
    createdDate: '2024-08-01T01:08:58.677Z',
  },
  {
    nickname: 'User2',
    content: 'This is a comment 2',
    costume: 2,
    createdDate: '2024-08-01T02:08:58.677Z',
  },
  {
    nickname: '마늘입니다람쥐',
    content: 'This is a comment 3',
    costume: 4,
    createdDate: '2024-08-01T03:08:58.677Z',
  },
  {
    nickname: 'User4',
    content: 'This is a comment 4',
    costume: 1,
    createdDate: '2024-08-01T04:08:58.677Z',
  },
  {
    nickname: 'User5',
    content: 'This is a comment 5',
    costume: 2,
    createdDate: '2024-08-01T05:08:58.677Z',
  },
  {
    nickname: 'User6',
    content: 'This is a comment 6',
    costume: 3,
    createdDate: '2024-08-01T06:08:58.677Z',
  },
  {
    nickname: 'User7',
    content: 'This is a comment 7',
    costume: 4,
    createdDate: '2024-08-01T07:08:58.677Z',
  },
  // {
  //   nickname: 'User8',
  //   content: 'This is a comment 8',
  //   costume: 2,
  //   createdDate: '2024-08-01T08:08:58.677Z',
  // },
];

const Comment = ({ onClose }) => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // 임의의 데이터를 페이지네이션으로 설정
    const fetchComments = () => {
      const pageSize = 4;
      const offset = page * pageSize;
      const paginatedComments = mockComments.slice(offset, offset + pageSize);
      setComments(paginatedComments);
      setTotalPages(Math.ceil(mockComments.length / pageSize));
    };

    fetchComments();
  }, [page]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      const newComment = {
        nickname: '사용자 이름',
        content: inputValue,
        costume: 0,
        createdDate: new Date().toISOString(),
      };

      // 임의의 데이터에 새 댓글 추가
      mockComments.unshift(newComment);
      setInputValue('');
      setPage(0);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className='px-4'>
        <h2 className='text-2xl mt-4 mb-4 text-base-color'>방명록</h2>
        <form onSubmit={handleSubmit} className='items-center'>
          <div
            className='relative ml-32 mb-5 bg-center bg-no-repeat flex items-center justify-between'
            style={{
              backgroundImage: `url('src/assets/comment/input-box.png')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              height: '50px',
              width: '470px',
            }}
          >
            <input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
              placeholder='댓글을 입력하세요'
              className='w-[350px] h-[30px] ml-9 text-sm placeholder-white outline-none'
              style={{
                fontSize: '12px',
                border: 'none',
                background: 'transparent',
              }}
            />
            <Button label='작성' type='submit' className='h-[30px] text-sm' />
          </div>
        </form>
        <ul className='list-none'>
          {comments.map((comment, index) => (
            <li
              key={index}
              className='flex items-center mb-1'
              style={{ height: '70px' }}
            >
              <div className='flex justify-center items-center basis-1/5'>
                <div className='flex flex-col items-center'>
                  <img
                    src={`src/assets/profile/profile-${comment.costume}.png`}
                    alt='프로필 이미지'
                    className='w-9 h-9 rounded-full'
                  />
                  <span className='text-xs mt-1'>{comment.nickname}</span>
                </div>
              </div>
              <div
                className='absolute ml-32 bg-center bg-no-repeat rounded overflow-hidden mr-10'
                style={{
                  backgroundImage: `url('src/assets/comment/dialoge-box.png')`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  width: '470px',
                  height: '50px',
                }}
              >
                <div className='relative flex flex-col ml-1 pl-3'>
                  <div className='text-xs text-left ml-5 mt-4'>
                    {comment.content}
                  </div>
                  <span className='text-xs text-right mr-3'>
                    {new Date(comment.createdDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className='absolute left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2'>
          <button
            className={`w-8 h-8 bg-left-bt bg-cover ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePreviousPage}
            disabled={page === 0}
          />
          <button
            className={`w-8 h-8 bg-right-bt bg-cover ${page >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Comment;
