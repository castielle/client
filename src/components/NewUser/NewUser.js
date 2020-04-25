import React, {useEffect} from 'react';
import queryString from "query-string";
import io from "socket.io-client";
import {Link} from "react-router-dom";

import './NewUser.css';

let socket;

const NewUser = ({location}) => {
    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
    const {name, room} = queryString.parse(location.search);
    console.log('name', name, room);

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);


        const ENDPOINT = 'localhost:5000';
        // const ENDPOINT = 'https://chat-server-bangkok.herokuapp.com/';
        // const ENDPOINT = 'http://3.1.221.3/';

        socket = io(ENDPOINT);

        socket.emit('newUser', {name, room}, (error) => {
            if (error) {
                alert(error);
            }
        });

        // socket.emit('who', {name:"joe"});
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [location.search]);

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Welcome New User</h1>
                <Link to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Go Chat Room</button>
                </Link>
            </div>
        </div>
    );

}

export default NewUser;