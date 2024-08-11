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
    <div className='flex flex-col justify-center items-center w-[439px] h-[280px] border border-black'>
      <div
        ref={chatContainerRef}
        style={{ display: connected ? 'block' : 'none' }}
        className='w-full h-full overflow-scroll scrollbar bg-transparent border border-black'
      >
        <table>
          <tbody>
            {chattings.map((chtting, index) => (
              <tr key={index}>
                <td>{chtting.nickname}</td>
                <td>{chtting.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-auto w-full'>
        <input
          placeholder='채팅 내용을 입력하세요'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyPress}
          className='w-11/12'
        />
        <button
          onClick={sendChat}
          disabled={!connected}
          className='w-1/12'
        ></button>
      </div>
    </div>
  );
}

export default App;
