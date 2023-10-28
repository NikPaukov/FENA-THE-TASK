import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {sendRequest} from "./services/httpService";
import {connectSocket} from "./services/socketService";

export const socket = (async () => {
    const sessionId = await sendRequest({url: 'session', method: 'get'});

    return  connectSocket(sessionId.data);
})()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);