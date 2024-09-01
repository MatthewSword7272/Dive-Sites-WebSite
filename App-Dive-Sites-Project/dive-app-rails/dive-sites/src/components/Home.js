import React from "react";
import SiteList from "./SiteList";
import Map from "./Map";
import axios from "axios";
import MySitesList from "./MySitesList";
import SiteForm from "./SiteForm";
import {useDispatch} from "react-redux";
import {notifyActions} from "./store/Notify-Slice";
import {GLOBAL_URL} from "../App";

function Home(props) {
    const {sites, setSites, viewMySites, mySites, setMySites, setNotify} = props;
    const dispatch = useDispatch();

    const handleAdded = () => {
        dispatch(notifyActions.added(undefined));
    };

    const handleDeleted = () => {
        dispatch(notifyActions.deleted(undefined));
    };

    async function handleAddSite(site) {
        axios.post(`${GLOBAL_URL}/my/sites`, site, {withCredentials: true}).then(response => {
            setSites(prevState => {
                return [...prevState, response.data];
            });
            setMySites(prevState => {
                return [...prevState, response.data];
            });
        }).then(() => {
            setNotify(true);
            handleAdded();
        }).catch(error => {
            console.log(error.response.data);
            alert(error);
        });
    }

    async function onDeleteItem(siteID) {
        axios.delete(`${GLOBAL_URL}/my/sites/${siteID}`, {withCredentials: true}).then(() => {
            deleteSite(setSites, siteID);
            deleteSite(setMySites, siteID);
        }).then(() => {
            setNotify(true);
            handleDeleted();
        }).catch(error => {
            console.log(error.response.data);
            alert(error);
        });
    }

    let content = <SiteList sites={mapSites(sites)}/>

    if (sites.length === 0) {
        content = <p className='no-sites'>No Sites Found</p>
    }

    return (
        <section>
            {viewMySites ?
                <>
                    <Map sites={mapSites(mySites)}/>
                    <MySitesList sites={mapSites(mySites)} onDeleteItem={onDeleteItem}/>
                </>
                :
                <>
                    <SiteForm onAddSite={handleAddSite}/>
                    {content}
                    <Map sites={mapSites(sites)}/>
                </>
            }
        </section>
    );
}

const mapSites = (sites, loadedSites = []) => {
    if (sites.length > 0) {
        loadedSites = sites.map(site => ({
            ...site,
            latitude: parseFloat(site.latitude),
            longitude: parseFloat(site.longitude),
        }))
    }
    return loadedSites;
};

const deleteSite = (setSites, siteID) => {
    setSites(prevState => {
        for (const item of prevState) {
            if (item.id === siteID) {
                return prevState = prevState.filter(i => i.id !== siteID)
            }
        }
    });
};

export default Home;