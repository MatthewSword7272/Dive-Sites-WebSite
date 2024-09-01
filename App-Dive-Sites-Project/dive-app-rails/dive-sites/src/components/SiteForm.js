import React, {useEffect, useState} from "react";

function SiteForm(props) {
    const siteAccess = [
        {
            name: 'Boat',
        },
        {
            name: 'Shore',
        },
        {
            name: 'Pier',
        },
    ]
    const initialDiveFeatures = [
        {
            name: 'Reef Dive',
        },
        {
            name: 'Bommie Dive',
        },
        {
            name: 'Drift Dive',
        },
        {
            name: 'Wall Dive',
        },
        {
            name: 'Wreak Dive',
        },
        {
            name: 'Night Dive',
        },
    ]
    const certifications = [
        {
            name: "Open Water"
        },
        {
            name: "Advanced Open Water"
        },
        {
            name: "Deep Water"
        },
        {
            name: "Technical"
        }
    ]

    const [enteredName, setName] = useState('');
    const [, setNameIsValid] = useState(undefined);
    const [enteredMinDepth, setMinDepth] = useState(1);
    const [enteredMaxDepth, setMaxDepth] = useState(10);
    const [enteredCoordinate, setCoordinate] = useState('');
    const [enteredFeatures, setFeatures] = useState({features: []});
    const [enteredAccess, setAccess] = useState('');
    const [, setAccessIsValid] = useState(undefined);
    const [, setFeaturesIsValid] = useState(undefined);
    const [enteredCert, setCert] = useState('');
    const [, setCertIsValid] = useState(undefined);
    const [enteredPort, setPort] = useState('');
    const [, setPortIsValid] = useState(undefined);
    const [enteredSpear, setSpear] = useState('');
    const [, setSpearIsValid] = useState(undefined);
    const [enteredDescription, setDescription] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [enteredImage, setImage] = useState('');
    const [enteredVideo, setVideo] = useState('');
    const [descriptionCount, setCount] = useState(0);

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                enteredName.length > 3 && enteredName.length <= 30 && enteredFeatures.features.length > 0
                && enteredCert !== "" && enteredPort !== "" && enteredSpear !== ""
            );
        }, 100);

        return () => {
            clearTimeout(identifier);
        };

    }, [enteredName, enteredFeatures, enteredCert, enteredPort, enteredSpear]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleValidateName = () => {
        setNameIsValid(enteredName.length > 3 && enteredName.length <= 30);
    };

    const handleMinDepthChange = (event) => {
        setMinDepth(parseInt(event.target.value));
    };
    const handleMaxDepthChange = (event) => {
        setMaxDepth(parseInt(event.target.value));
    };

    const handleCoordinateChange = (event) => {
        setCoordinate(event.target.value);
    };

    const handleFeatureChange = (event) => {
        const {value, checked} = event.target;
        const {features} = enteredFeatures;

        if (checked) {
            setFeatures({features: [...features, value]});
        } else {
            setFeatures({
                features: features.filter((event) => event !== value)
            });
        }
    };

    const handleValidateFeatures = () => {
        setFeaturesIsValid(enteredFeatures.features.length > 0);
    };

    const handleAccessChange = (event) => {
        setAccess(event.target.value);
    }

    const handleValidateAccess = () => {
        setAccessIsValid(enteredAccess !== "");
    }

    const handleCertChange = (event) => {
        setCert(event.target.value);
    };

    const handleValidateCert = () => {
        setCertIsValid(enteredCert !== "");
    };

    const handlePortChange = (event) => {
        setPort(event.target.value);
    };

    const handleValidatePort = () => {
        setPortIsValid(enteredPort !== "");
    };

    const handleSpearChange = (event) => {
        setSpear(event.target.value);
    };

    const handleValidateSpear = () => {
        setSpearIsValid(enteredSpear !== "");
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setCount(event.target.value.length);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleVideoChange = (event) => {
        setVideo(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let errMsg = "";
        let coordinates;
        let videoID = getYouTubeID(enteredVideo.trim());

        function getYouTubeID(url) {
            if (url !== "") {
                url = url.replace(/([><])/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                if (url[2] !== undefined) {
                    return (url[2].split(/[^\da-z_-]/i))[0];
                }
                errMsg += "Video Link must be a YouTube Video URL\n";
                return null;
            }
            return "";
        }

        if (enteredCoordinate.match(/^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?(180(\.0+)?|((1[0-7]\d)|[1-9]?\d))(\.\d+)?$/)) {
            coordinates = enteredCoordinate.split(',');
        } else {
            errMsg += "Please enter the coordinates in this format: `Latitude, Longitude` in Decimal Degrees\n" +
                "Latitude must be Less than or Equal to 90 or More than or Equal to 90 Degrees\n" +
                "Longitude must be Less or Equal to 180 and More or Equal to -180 Degrees\n";
        }

        if (enteredMinDepth > enteredMaxDepth) {
            errMsg += "Minimum depth must be less than the Maximum depth\n";
        }

        if ((enteredMinDepth > 18 && enteredCert === 'Open Water') ||
            ((enteredMinDepth > 30 || enteredMinDepth <= 18) && enteredCert === 'Advanced Open Water') ||
            ((enteredMinDepth > 40 || enteredMinDepth <= 30) && enteredCert === 'Deep Water')) {
            errMsg += `Invalid Certification and Depth Input\n`;
        }

        if (descriptionCount > 350) {
            errMsg += "Description is too long\n";
        }

        if (errMsg !== "") {
            alert(errMsg);
            setName(enteredName);
            setMinDepth(enteredMinDepth);
            setMaxDepth(enteredMaxDepth);
            setCoordinate(enteredCoordinate);
            setFeatures(enteredFeatures);
            setAccess(enteredAccess);
            setCert(enteredCert);
            setPort(enteredPort);
            setSpear(enteredSpear);
            setDescription(enteredDescription);
            setImage(enteredImage);
            setVideo(enteredVideo);
        } else {
            const siteData = {
                id: Math.random().toString(),
                name: enteredName,
                min_depth: enteredMinDepth,
                max_depth: enteredMaxDepth,
                latitude: coordinates[0].trim(),
                longitude: coordinates[1].trim(),
                features: enteredFeatures.features,
                site_access: enteredAccess,
                certification: enteredCert,
                port_phillip: enteredPort,
                spearfishing: enteredSpear,
                description: enteredDescription.trim(),
                image_url: enteredImage.trim(),
                video_id: videoID
            };

            props.onAddSite(siteData);

            setName('');
            setMinDepth(1);
            setMaxDepth(10);
            setCoordinate('');
            setFeatures({features: []});
            setAccess('');
            setCert('');
            setPort('');
            setSpear('');
            setDescription('');
            setImage('');
            setVideo('');
            setCount(0);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Enter Dive Site Here...</h2>
            <div className={"input-form"}>
                <label htmlFor="site-name" className="form-label">Site Name</label>
                <input id="site-name" type="text" className={'form-control'} onChange={handleNameChange}
                       onBlur={handleValidateName}
                       value={enteredName} required/>
                <label className="form-label" htmlFor="site-depth">Depth (in metres, between 0 and 110)</label>
                <div className={"depth"}>
                    <label>Minimum Depth</label>
                    <input id="site-depth" type="range" className={'form-range'} onChange={handleMinDepthChange}
                           min="1" max="110"
                           value={enteredMinDepth}/>
                    <input type="number" min="1" max="110" value={enteredMinDepth} onChange={handleMinDepthChange}
                           className="form-control output"/>
                    <label>Maximum Depth</label>
                    <input id="site-depth" type="range" className={'form-range'} onChange={handleMaxDepthChange}
                           min="1" max="110"
                           value={enteredMaxDepth}/>
                    <input type="number" min="1" max="110" value={enteredMaxDepth} onChange={handleMaxDepthChange}
                           className="form-control output"/>
                </div>
                <label className={'form-label'}>Coordinates of Site (in Decimal Degrees)</label>
                <input type="text" placeholder="Latitude, Longitude" className={'form-control'}
                       onChange={handleCoordinateChange} id={'coordinates'}
                       value={enteredCoordinate} required/>
                <label className="form-label">Features of Site (select one or more)</label>
                <div className="checkbox-container">
                    {initialDiveFeatures.map((diveFeature, index) => (
                        <div key={diveFeature.name + index} className={"form-check"}>
                            <input type="checkbox" className={'form-check-input'} id={diveFeature.name.toLowerCase()}
                                   value={diveFeature.name}
                                   name="diveFeature" onChange={handleFeatureChange} onBlur={handleValidateFeatures}
                                   checked={enteredFeatures.features.includes(diveFeature.name)}/>
                            <label htmlFor={diveFeature.name.toLowerCase()}
                                   className={'form-check-label'}>{diveFeature.name.split(' ')[0]}</label>
                        </div>
                    ))}
                </div>
                <label className="form-label">Site Access</label>
                <div className="radio-form" id={"site-access-form"}>
                    {siteAccess.map((siteAccess, index) => (
                        <div className="radio" key={siteAccess.name + index}>
                            <input type="radio" className={'form-check-input'} id={siteAccess.name.toLowerCase()}
                                   value={siteAccess.name}
                                   name="diveFeature" onChange={handleAccessChange} onBlur={handleValidateAccess}
                                   checked={enteredAccess.includes(siteAccess.name)}/>
                            <label htmlFor={siteAccess.name.toLowerCase()}
                                   className={'form-check-label'}>{siteAccess.name.split(' ')[0]}</label>
                        </div>
                    ))}
                </div>
                <label className="form-label" htmlFor="certification">Lowest Certification Required</label>
                <select name="certification" className={'form-select'} onChange={handleCertChange} value={enteredCert}
                        onBlur={handleValidateCert} id={'certification'}
                        required>
                    <option value="" disabled>--Select Certification--</option>
                    {certifications.map((certification, index) => (
                        <option value={certification.name} key={index}>{certification.name}</option>
                    ))}
                </select>
            </div>
            <h5>Can Spearfish?</h5>
            <div className="radio-form">
                <div className="form-check">
                    <input type="radio" className="form-check-input" value="Yes" name="spearfish" id="spearfish_true"
                           checked={enteredSpear === "Yes"} onChange={handleSpearChange} onBlur={handleValidateSpear}
                           required/>
                    <label htmlFor="spearfish_true" className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" value="No" name="spearfish" id="spearfish_false"
                           checked={enteredSpear === "No"} onChange={handleSpearChange} onBlur={handleValidateSpear}/>
                    <label htmlFor="spearfish_false" className="form-check-label">No</label>
                </div>
            </div>
            <br/>
            <h5><u>Inside</u> Or <u>Outside</u> Port Phillip Bay?</h5>
            <div className="radio-form">
                <div className="form-check">
                    <input id="inside" className="form-check-input"
                           type="radio" value="Inside" onChange={handlePortChange} onBlur={handleValidatePort}
                           name="port-phillip" checked={enteredPort === "Inside"} required/>
                    <label className="form-check-label" htmlFor="inside">Inside Port Phillip</label>
                </div>
                <div className="form-check">
                    <input id="outside" className="form-check-input"
                           type="radio" value="Outside" onChange={handlePortChange} onBlur={handleValidatePort}
                           name="port-phillip" checked={enteredPort === "Outside"}/>
                    <label className="form-check-label" htmlFor="outside">Outside Port Phillip</label>
                </div>
            </div>
            <div className='textarea'>
                <h5>Site Description</h5>
                <textarea onChange={handleDescriptionChange} className={'form-control'}/>
                <figcaption className='figure-caption text-center'>Maximum 350 characters</figcaption>
                <figcaption className='figure-caption text-center'>{descriptionCount}/350 Characters</figcaption>
            </div>
            <div className='input-form'>
                <label htmlFor="site-image" className="form-label">Add an Image of Site (Optional)</label>
                <input id='site-image' className='form-control' placeholder="Paste Image URL Here" size='50' type="url"
                       value={enteredImage} onChange={handleImageChange}/>
            </div>
            <div className='input-form'>
                <label htmlFor="site-video" className="form-label">Add a YouTube Video about Site (Optional)</label>
                <input id='site-video' className='form-control' placeholder="Paste Image URL Here" size='50' type="url"
                       value={enteredVideo} onChange={handleVideoChange}/>
            </div>
            <div>
                <button type="submit" className={"btn btn-primary"} disabled={!formIsValid}>Add Site</button>
            </div>
        </form>
    );
}

export default SiteForm;