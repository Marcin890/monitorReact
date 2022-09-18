import React from 'react'
const WebsiteItem = ({website}) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-3">
                        {website.name}
                    </div>
                    <div className="col-md-4">
                        <a target="_blank" href={website.url}>{website.url}</a>                        
                    </div>
                    <div className="col-md-3">
                        {website.selector}
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div>
      );
}
 
export default WebsiteItem;