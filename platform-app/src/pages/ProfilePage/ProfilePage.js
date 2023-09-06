import React, {useState} from "react";
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";
import './ProfilePage.css'
function ProfilePage() {
    
    const user = getUser();
    const username = user ? user.username : "Guest";
    return(
        <div className="profile-page">
            <Navbar></Navbar>
            <div className="profile-container">
                <h1>Welcome {username}</h1>
            </div>

        </div>
    )


}

export default ProfilePage