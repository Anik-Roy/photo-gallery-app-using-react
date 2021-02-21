import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Header from './Header';
import Home from './Home';
import { auth } from '../firebase';

const Main = props => {
    const [user, setUser] = useState(null);
    // console.log("Main: props", props);

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if(authUser) {
                console.log("Main: logged in user", authUser);
                // console.log(authUser.uid);
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
    }, [user])

    let routes = null;
    {
        routes = user ? (
            <Switch>
                <Route exact path="/" render={()=>(<Home user={user} />)}/>
                <Redirect to="/" />
            </Switch>) : (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route exact path="/" component={Home}/>
                <Redirect to="/" />
            </Switch>)
    }
    
    return (
        <div>
            <Header user={user} />
            { routes }
        </div>
    )
}

export default Main;