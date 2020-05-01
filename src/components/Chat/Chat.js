import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


let socket;


const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    // const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [clientId, setClientId] = useState(0);
    const [groupId, setGroupId] = useState([]);
    const ENDPOINT = 'localhost:5000';
    // const ENDPOINT = '18.140.101.64';

    // setClientId(73);
    // console.log('client id ' + clientId);
    // console.log('group id ' + groupId);
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        console.log(name, room);

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        socket.emit('join', {name, room}, (error) => {
            if (error) {
                alert(error);
            }
        });


        return () => {
            socket.emit('disconnect', clientId, groupId);
            socket.off();
        }

    // }, [ENDPOINT, location.search, clientId, groupId]);
    }, [ENDPOINT, location.search]);



    useEffect(() => {


        // listen for server
        // get message from server that was sent to whole room
        // message from server
        socket.on('message', message => {
            // adding every new message from everyone else to array; can't mutate original array
            setMessages(messages => [...messages, message]);
            console.log('got message');

        });

        socket.on('clientId', (data) => {
            setClientId(data.clientId);
            setGroupId(data.groupId);
        });

        // var time =

    }, []);



    // onKeyPress input enter handler
    const sendMessage = (event) => {
        // don't refresh whole page
        event.preventDefault();
        // socket.emit('join', { name, room }, (error) => {
        //     if(error) {
        //         alert(error);
        //     }
        // });
        if (message) {
            // console.log(message);
            switch (message) {

                case '#logout':
                    socket.emit('disconnect');
                    socket.off();
                    break;

                case '#usersInRoom':
                    socket.emit('usersInRoom', room, () => setMessage(''));
                    break;

                case '#leaveGroup':
                    socket.emit('leaveGroup', clientId, groupId, () => setMessage(''));
                    break;

                case '#serverId':
                    socket.emit('serverId', () => setMessage(''));
                    break;

                case '#whatGroups':
                    socket.emit('whatGroups', () => setMessage(''));
                    break;

                case '#myGroups':
                    socket.emit('myGroups', clientId, () => setMessage(''));
                    break;

                case '#myId':
                    socket.emit('myId', clientId, () => setMessage(''));
                    break;

                case '#myGroupIds':
                    socket.emit('myGroupIds', clientId, () => setMessage(''));
                    break;

                default:
                    socket.emit('sendMessage', message, clientId, groupId, () => setMessage(''));
            }
            // after sending message, input field clears
            // socket.emit('sendMessage', message, clientId, groupId, () => setMessage(''));

        }

    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    );
}

export default Chat;