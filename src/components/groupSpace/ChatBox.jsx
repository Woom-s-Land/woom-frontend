import { useState, useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

import inputEmoji from '../assets/common/inputEmoji.png';

function App() {
  // 유저 정보 받아와서 채팅에 사용할 예정 (현재는 임시로 사용)
  // nickname: 유저 이름, content: 채팅 내용
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [nickname, setNickname] = useState('윤대영');
  const [content, setContent] = useState('');
  const [chattings, setChattings] = useState([]);
  const chatContainerRef = useRef(null);

  const token = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d';

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendChat();
    }
  };

  useEffect(() => {
    const client = new Client({
      brokerURL: 'wss://i11e206.p.ssafy.io/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        setConnected(true);
        console.log('Connected: ' + frame);

        // 메시지 구독
        client.subscribe('/ws/wooms/chat/' + token, (message) => {
          const parseMessage = JSON.parse(message.body);

          console.log(parseMessage);
          setChattings((prevChattings) => [...prevChattings, parseMessage]);
        });
      },
      onWebSocketError: (error) => {
        console.error('Error with websocket', error);
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    setStompClient(client);
    if (client) {
      client.activate();
    }

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    // 새로운 채팅이 추가될 때마다 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chattings]);

  const sendChat = () => {
    if (stompClient && connected && content) {
      stompClient.publish({
        destination: '/ws/wooms/chat/' + token,
        body: JSON.stringify({
          content: content,
        }),
      });
      setContent('');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-[439px] h-[280px] p-2'>
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
}

export default App;
