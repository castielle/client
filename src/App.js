import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import NewUser from './components/NewUser/NewUser';

const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
        <Route path="/newuser" component={NewUser} />
    </Router>
);

export default App;

