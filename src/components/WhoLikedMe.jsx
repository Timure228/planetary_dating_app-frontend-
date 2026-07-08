import {useEffect, useState} from "react";

export default function WhoLikedMe() {
    const [swiper_username, setSwiper_Username] = useState("");
    const [swiper_photo, setSwiper_Photo] = useState("");
    const token = localStorage.getItem('token');

    const [likes, setLikes] = useState([]);

    useEffect(() => {
        fetch("https://planetary-dating-app-backend.onrender.com/api/likes", {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`}
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLikes(data);
            })
            .catch(err => console.log("Profile load notice:", err.message));
    }, []);

    return (
        <>
            <h1>Likes</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
                {likes.map((like) => (
                    <div key={like.swiper_username} style={{ background: "pink", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "12px", overflow: "hidden" }}>
                        <img src={like.image_url} alt={like.swiper_username} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
                        <div style={{ padding: "10px 12px" }}>
                            <span style={{ fontSize: "14px", fontWeight: "500" }}>{like.swiper_username}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}