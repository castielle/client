import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


let socket;


const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    // const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';
    // const ENDPOINT = 'https://chat-server-bangkok.herokuapp.com/';
    // const ENDPOINT = 'http://3.1.221.3/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        console.log(name,room);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });


        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {

        // listen for server
        // get message from server that was sent to whole room
        // message from server
        socket.on('message', message => {
            // adding every new message from everyone else to array; can't mutate original array
            setMessages(messages => [ ...messages, message ]);
        });

        // socket.on("roomData", ({ users }) => {
        //     setUsers(users);
        // });
    }, []);

    // onKeyPress input enter handler
    const sendMessage = (event) => {
        // don't refresh whole page
        event.preventDefault();

        if(message) {
            // after sending message, input field clears
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message,messages);

    return (
        <div className="outerContainer">
             <div className="container">
                 <InfoBar room = {room}/>
                 <Messages messages={messages} name={name} />
                 <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;