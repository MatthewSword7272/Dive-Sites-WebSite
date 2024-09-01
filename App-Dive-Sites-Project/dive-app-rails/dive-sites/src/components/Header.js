import React, {useState} from "react";
import logo from './images/scuba_diver.png';

function Header(props) {

    const {setViewMySites, viewMySites, user} = props;
    const [buttonText, setButtonText] = useState("View My Sites");

    const viewSites = () => {
        setViewMySites(!viewMySites);
        !viewMySites ? setButtonText("View Home Page") : setButtonText("View My Sites");
    };

    return (
        <header className="slide-in-top">
            <div>
                <img src={logo} alt={'logo'}/>
                <h1>Victorian Dive Sites</h1>
            </div>
            {!!user &&
                <div id={'navbar'}>
                    <span id='span' className='slide-in-left'>Current User: <b>{user.username}</b></span>
                    <nav>
                        <button className="btn btn-primary logout-button slide-in-right"
                                onClick={viewSites}>{buttonText}
                        </button>
                        <button className="btn btn-primary logout-button slide-in-right"
                                onClick={props.onLogout}>Logout
                        </button>
                    </nav>
                </div>
            }
        </header>
    );
}

export default Header;