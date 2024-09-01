import React from "react";
import SiteItem from "./SiteItem";

function SiteList(props) {
    return (
        <div>
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
                        image_url={site.image_url}
                        video_id={site.video_id}
                        date={site.created_at}
                    />
                )}
            </ul>
        </div>
    );
}

export default SiteList;