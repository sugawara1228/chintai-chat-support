import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './pages/Chat';
import Cancellation from './pages/Cancelation';
import './App.css';
import Complete from './pages/Complete';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="chintai-chat-support" element={<Chat />} />
            <Route path="chintai-chat-support/cancellation" element={<Cancellation />} />
            <Route path="chintai-chat-support/complete" element={<Complete />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
