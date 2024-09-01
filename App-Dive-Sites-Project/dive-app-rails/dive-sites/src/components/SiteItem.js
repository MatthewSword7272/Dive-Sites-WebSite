import React from "react";
import Comments from "./Comments";

function SiteItem(props) {

    const ConvertDDToDMS = (dd, lngBool) => {
        const dir = dd < 0 ? (lngBool ? "W" : "S") : lngBool ? "E" : "N";
        const deg = 0 | (dd < 0 ? (dd = -dd) : dd);
        const min = 0 | ((dd += 1e-9) % 1) * 60;
        const sec = (0 | ((dd * 60) % 1) * 6000) / 100;

        return `${deg}°${min}' ${sec}" ${dir}`;
    };

    const handleDelete = () => props.onDelete(props.id);
    const convertToFeet = (depth) => (depth * 3.28084).toFixed(2);

    const dateDate = new Date(props.date).toLocaleString('en-AU', {
        timeZone: 'AET',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <li>
            <div className={"site-item"}>
                <h3><u>{props.name}</u></h3>
                <div>Date of Add: <b>{dateDate}</b></div>
                <div>Depth Range: <b>{props.min_depth}m ({convertToFeet(props.min_depth)}f) to {props.max_depth}m
                    ({convertToFeet(props.max_depth)}f)</b></div>
                <div>
                    Coordinates: <b>{ConvertDDToDMS(props.latitude, false)}, {ConvertDDToDMS(props.longitude, true)}</b>
                </div>
                <div>Site Access: <b>{props.site_access}</b></div>
                <div>Dive Features: <b>{props.features.join(', ')}</b></div>
                <div>Certification Required: <b>{props.certification}</b></div>
                <div>Spearfishing Site? <b>{props.spearfishing}</b></div>
                <div><b>{props.port_phillip}</b> Port Phillip Bay</div>
                {!!props.description &&
                    <div className="site-description-container">
                        <b>Site Description</b>
                        <p className="site-description">{props.description}</p>
                    </div>
                }
                <div>Entry Created By: <b>{props.site_created_by}</b></div>
                {!!props.image_url &&
                    <div className='image-container'>
                        <h4>Image of Site</h4>
                        <img className="img-fluid scale-in-center" alt='Dive Site' width="600" height="1800"
                             src={props.image_url}/>
                    </div>
                }
                {!!props.video_id &&
                    <div className='video-responsive'>
                        <h4>Video of Site</h4>
                        <iframe
                            width='550'
                            height='310'
                            src={`https://www.youtube.com/embed/${props.video_id}`}
                            allowFullScreen
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title="Video Player"
                        />
                    </div>
                }
                {!!props.onDelete ?
                    <button className={"btn btn-primary deleteButton"} onClick={handleDelete}>Delete Item</button> :
                    <Comments site_id={props.id}/>
                }
            </div>
        </li>
    );
}

export default SiteItem;