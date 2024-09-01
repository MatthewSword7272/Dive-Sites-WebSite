import React from "react";
import {useSelector} from "react-redux";

function Notification(props) {

    const notifyAction = useSelector(state => state.action.action_name);

    const onClick = () => {
        props.setNotify(false);
    };

    let style;

    if (props.notify) {
        document.body.style.overflow = "hidden";
        style = {opacity: 1, visibility: 'visible'};
    } else {
        document.body.style.overflow = "initial";
        style = {opacity: 0, visibility: 'hidden'};
    }
    return (
        <div className={'notification-container'} style={style}>
            <div className={'alert alert-success notification'}>
                <h3>Site {notifyAction}</h3>
                <button className='btn btn-success' onClick={onClick}>Close</button>
            </div>
        </div>
    );
}

export default Notification;