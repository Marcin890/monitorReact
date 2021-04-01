import React from 'react'
const UserItem = ({user}) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">{user.name}</div>
                    <div className="col-md-4">{user.email}</div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
     );
}
 
export default UserItem;