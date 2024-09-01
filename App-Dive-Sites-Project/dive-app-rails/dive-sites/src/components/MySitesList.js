import React from "react";
import SiteItem from "./SiteItem";

function MySitesList(props) {
    return (
        <div>
            {props.sites.length === 0 ? <p className="no-sites">No Sites Entered</p> :
                <ul className="site-list">
                    {props.sites.map(site =>
                        <SiteItem
                            key={site.id}
                            id={site.id}
                            site_created_by={site.site_created_by}
                            name={site.name}
                            min_depth={site.min_depth}
                            max_depth={site.max_depth}
                            latitude={site.latitude}
                            longitude={site.longitude}
                            site_access={site.site_access}
                            features={site.features}
                            certification={site.certification}
                            port_phillip={site.port_phillip}
                            spearfishing={site.spearfishing}
                            description={site.description}
                            date={site.created_at}
                            image_url={site.image_url}
                            video_id={site.video_id}
                            onDelete={props.onDeleteItem}
                        />
                    )}
                </ul>
            }
        </div>
    );

}

export default MySitesList