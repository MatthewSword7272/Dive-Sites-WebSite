import React, {useEffect, useState} from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import Notification from "./components/Notification";
import {useDispatch} from "react-redux";
import {changeUser} from "./components/store/User-Slice";

export const GLOBAL_URL = 'http://192.168.41.129:3000';

function App() {
    const [sites, setSites] = useState([]);
    const [mySites, setMySites] = useState([]);
    const [user, setUser] = useState(null);
    const [viewMySites, setViewMySites] = useState(false);
    const [notify, setNotify] = useState(false);

    const dispatch = useDispatch();

    //Get User
    useEffect(() => {
        axios.get(`${GLOBAL_URL}/user`, {withCredentials: true}).then(response => {
            if (response.data.user) {
                setUser(response.data.user);
                dispatch(changeUser(response.data.user.username));
            } else {
                setUser({});
            }
        }).catch(error => console.log('api errors:', error));
    }, [dispatch]);


    useEffect(() => {
        if (!!user) {
            let mounted = true;
            axios.get(`${GLOBAL_URL}/sites`).then((response) => response.data)
                .then(items => {
                    if (mounted) {
                        setSites(items);
                    }
                });
            axios.get(`${GLOBAL_URL}/my/sites`, {withCredentials: true}).then((response) => response.data)
                .then(items => {
                    if (mounted) {
                        setMySites(items);
                    }
                });
            return () => (mounted = false);
        } else {
            setSites([]);
            setMySites([]);
        }
    }, [user]);

    const handleLogin = (response) => {
        setUser(response.data.user);
        dispatch(changeUser(response.data.user.username));
    };

    const handleLogOut = () => {
        axios.post(`${GLOBAL_URL}/logout`, {}, {withCredentials: true}).then(() => {
            setUser(null);
        }).catch(error => console.log('api errors:', error));

        dispatch(changeUser(""));

        if (viewMySites) setViewMySites(false);
    };

    return (
        <React.Fragment>
            <Header user={user} onLogout={handleLogOut} viewMySites={viewMySites}
                    setViewMySites={setViewMySites}/>
            <Notification setNotify={setNotify} notify={notify}/>
            <main className={"slide-in-top"}>
                {!user && <Login onLogin={handleLogin}/>}
                {!!user &&
                    <Home setSites={setSites}
                          sites={sites}
                          setMySites={setMySites}
                          mySites={mySites}
                          viewMySites={viewMySites}
                          setNotify={setNotify}
                    />
                }
            </main>
            <Footer/>
        </React.Fragment>
    );
}

export default App;