import like_icon from "../assets/love.png";
import dislike_icon from "../assets/no.png";

import {useEffect, useState} from "react";

export default function SwipePage() {

    const [username, setUsername] = useState("")
    const [age, setAge] = useState(0)
    const [profile_img, setProfile_img] = useState()
    const [description, setDescription] = useState("")
    const [interested_in, setInterested_in] = useState("")
    const [city, setCity] = useState("")

    const [noProfilesLeft, setNoProfilesLeft] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const viewed = []

    function like() {
        console.log("match")
        viewed.add
        location.reload()
    }

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch("http://localhost:5000/api/card-profile", {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`}
        })
            .then(res => {
                if (res.status === 404) {
                    setNoProfilesLeft(true);
                    throw new Error("No profiles left");
                }
                return res.json();
            })
            .then(data => {
                setUsername(data.username);
                setAge(data.age);
                setDescription(data.bio);
                setInterested_in(data.interested_in);
                setCity(data.city);

                // Safe fallback logic if image_url is missing or broken
                if (data.image_url) {
                    setProfile_img(data.image_url);
                } else if (data.image_name) {
                    setProfile_img("http://localhost:5000/uploads/" + data.image_name);
                }
            })
            .catch(err => alert(err.message));
    }, [refreshTrigger]);

    const handleSwipe = (action) => {
        fetch("http://localhost:5000/api/swipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                swiped_on_username: username,
                action: action // sends either 'like' or 'dislike'
            })
        }).then(() => {
            // Increments the numeric trigger state to smoothly load the next profile card
            setRefreshTrigger(prev => prev + 1);
        })

        if (noProfilesLeft) {
            return (
                <div className="card-container">
                    <h2>No new profiles left around you! Check back later.</h2>
                </div>
            );
        }
    }
    return (
        <>
            <div className="card-container">
                <img className="swap-card" src={profile_img}></img>
                <span className="card_profile_name">{username + " " + age}</span>
                <span className="card_profile_city">{"Located in " + city}</span>
                <span className="card_description">{description + "; interested in " + interested_in}</span>
            </div>
            <img alt="like" className="like" onClick={() => handleSwipe('like')} src={like_icon} width={128}/>
            <img alt="dislike" className="dislike" onClick={() => handleSwipe('dislike')} src={dislike_icon}
                 width={128}/>
        </>
    )
}