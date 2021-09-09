import React, { useEffect, useState } from 'react';
import CollapsibleTable from './components/Table/Table'
import './App.css'

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(true)

  // establish socket connection
  useEffect(() => {
    setSocket(new WebSocket('wss://amos-sor.io'))
  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return null;
    socket.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }
    socket.onmessage = evt => {
      setLoading(false)
      // listen to data sent from the websocket server
      setMessage(JSON.parse(evt.data))
    }
  }, [socket]);


  return (
    <div className="app">
      <CollapsibleTable message={message} loading={loading} />
    </div>
  );
}

export default App;