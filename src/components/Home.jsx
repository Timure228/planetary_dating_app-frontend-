import ad from "../../public/ad.png"

export default function Home() {

    return (
        <>
            <div className="profile-wrap">
                <div className="profile-card">
                    <div className="profile-banner">
                        <i className="ti ti-planet"/>
                    </div>
                    <div className="profile-photo-wrap">
                        <img
                            className="profile-photo"
                            src={localStorage.getItem("profile_image")}
                            alt="profile"
                        />
                    </div>
                    <div className="profile-body">
                        <p className="profile-username">{localStorage.getItem("username")}</p>
                        <p className="profile-label">Member since 2026</p>
                    </div>
                </div>
            </div>
            <img src={ad} width={256} style={{display: "block", marginLeft: "auto"}} />
        </>
    )

}