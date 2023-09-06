import React, {useState} from "react";
import Navbar from "../Navbar/Navbar";
import { getUser } from "../../service/AuthService";
import './ProfilePage.css'
function ProfilePage() {
    
    const user = getUser();
    console.log(user);
    const [username, setUsername] = useState("Guest")
    if(user){
      setUsername(user.username);
    }
    const name = username

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