import {useEffect, useState} from "react";

export default function Messages() {
    const token = localStorage.getItem('token');

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch("https://planetary-dating-app-backend.onrender.com/api/messages", {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`}
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMessages(data);
            })
            .catch(err => console.log("Profile load notice:", err.message));
    }, []);

    return (
        <>
            <div style={{ maxHeight: "500px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px"}}>
                {[...messages].reverse().map((message) => (
                    <div key={message.id} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        background: "pink",
                        border: "0.5px solid var(--color-border-tertiary)",
                        borderRadius: "12px",
                        padding: "10px 12px"
                    }}>
                        <img src={message.image_url} alt={message.message_sender} style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            flexShrink: 0
                        }}/>
                        <div>
                            <span style={{fontSize: "14px", fontWeight: "500"}}>{message.message_sender}</span>
                            <div style={{fontSize: "13px", color: "#555"}}>{message.message}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}