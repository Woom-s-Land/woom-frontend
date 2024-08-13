// ChatBox.jsx
import React, { useState, useRef, useLayoutEffect } from 'react';
// import EmojiPicker from 'emoji-picker-react';
import inputEmoji from '../../assets/common/inputEmoji.png';
import emojiIcon from '../../assets/common/emoji.png';

const ChatBox = ({ stompClient, connected, nickname, token }) => {
  const [chattings, setChattings] = useState([]);
  const [content, setContent] = useState('');
  const chatContainerRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendChat();
    }
  };

  useLayoutEffect(() => {
    if (!stompClient || !connected) return;

    // 채팅 메시지 구독 설정
    const chatSubscription = stompClient.subscribe(
      '/ws/wooms/chat/' + token,
      (message) => {
        try {
          const parseMessage = JSON.parse(message.body);
          console.log(parseMessage);
          setChattings((prevChattings) => [...prevChattings, parseMessage]);
        } catch (err) {
          console.log('Failed to parse chat message:', err);
        }
      }
    );

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      chatSubscription.unsubscribe();
    };
  }, [stompClient, connected, token]);

  useLayoutEffect(() => {
    // 새로운 채팅이 추가될 때마다 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chattings]);
  const togglePicker = () => {};
  const sendChat = () => {
    // console.log('send', stompClient, connected, nickname, content);
    if (stompClient && connected && content) {
      stompClient.publish({
        destination: '/ws/send/chat/' + token,
        body: JSON.stringify({
          nickname: nickname,
          content: content,
        }),
      });
      setContent('');
    }
  };

  return (
    <div className='absolute bottom-0 flex flex-col justify-center items-center w-[439px] h-[280px] p-2'>
      <div
        ref={chatContainerRef}
        style={{ display: connected ? 'block' : 'none' }}
        className='w-full h-[calc(100%-48px)] overflow-auto bg-black bg-opacity-20  rounded-lg p-2 scrollbar'
      >
        <div className='flex flex-col items-start'>
          {chattings.map((chatting, index) => (
            <div key={index} className='w-full bg-transparent'>
              <p className='whitespace-pre-wrap text-left text-white'>
                {chatting.nickname}: {chatting.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-1 w-full flex items-center justify-between bg-black bg-opacity-20 rounded-lg p-1'>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyPress}
          className='flex-grow py-1 px-2 text-white rounded-lg bg-black bg-opacity-0 focus:outline-none'
        />
        <button onClick={togglePicker}>
          <img src={emojiIcon} alt='emojiIcon' className='w-6 h-6' />
        </button>
        <button
          onClick={sendChat}
          disabled={!connected}
          className='ml-2 p-1 rounded-lg'
        >
          <img src={inputEmoji} alt='inputEmoji' className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
