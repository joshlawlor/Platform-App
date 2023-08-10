import React from "react";
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";
function ProfilePage() {
    const user = getUser();
    const name = user.username;
    return(
        <div className="profile-container">
            <Navbar></Navbar>
            <div>
                <h1>Welcome {name}</h1>
            </div>

        </div>
    )


}

export default ProfilePage