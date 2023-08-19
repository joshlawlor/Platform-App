import React from "react";
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";
import './ProfilePage.css'
function ProfilePage() {
    if(getUser() === undefined){
        console.log(getUser())
        console.log('NO USER')
        window.location.replace('/');
      }
    const user = getUser();
    const name = user.username;
    return(
        <div className="profile-page">
            <Navbar></Navbar>
            <div className="profile-container">
                <h1>Welcome {name}</h1>
            </div>

        </div>
    )


}

export default ProfilePage