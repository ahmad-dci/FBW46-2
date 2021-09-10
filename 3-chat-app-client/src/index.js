import {React, useState} from "react";
import ReactDOM from "react-dom";
import { io } from "socket.io-client";

const socket = io();


const App = () => {

    const [state, setState] = useState({msgValue: '', messages: ''});

    socket.on('connection', () => {
        console.log("connected");
    })
    socket.on('message', data => {
        console.log('data',data);
        setState({...state, messages: state.messages + '\n' + data.message})
    })



    const sendBtn = () => {
        socket.emit('message', {message: state.msgValue})
        setState({messages: state.messages + '\n' + state.msgValue, msgValue: ''});

    }
    const inputChange = e => {
        setState({...state, msgValue: e.target.value})
    }
    return (
        <div>
        <h1>chat app</h1>
        <textarea value={state.messages} style={{width: '500px', height: '500px'}} readOnly>
            
        </textarea>
        <br />
        <input onChange={inputChange} value={state.msgValue} type="text" placeholder="message text" />
        <button onClick={sendBtn}>send</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));