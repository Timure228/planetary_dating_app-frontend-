import {useState} from "react";
import axios from "axios";

export default function RegistryPage() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [city, setCity] = useState()
    const [interestedIn, setInterestedIn] = useState()
    const [image_name, setImage_name] = useState()
    const [bio, setBio] = useState()
    const [imageFile, setImageFile] = useState(null);

    async function save() {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('city', city);
        formData.append('interested_in', interestedIn);
        formData.append('image_name', image_name)
        formData.append('bio', bio)
        formData.append('image_file', imageFile)

        try {
            const response = axios.post('http://localhost:5000/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
             console.log("Error: " + error + " Occurred")
        }
        alert(username + " saved successfully")
    }

    return (
        <>
            <div className="form-wrap">
                <div className="form-card">
                    <div className="form-banner">
                        <i className="ti ti-planet"/>
                        <span>Create your profile</span>
                    </div>
                    <div className="form-body">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            save();
                        }}>

                            <div className="row2">
                                <div className="field">
                                    <label>Username</label>
                                    <input type="text" required maxLength={15} placeholder="max 15 chars"
                                           onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                                <div className="field">
                                    <label>Password</label>
                                    <input type="password" required maxLength={255} placeholder="••••••••"
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>

                            <div className="row2">
                                <div className="field">
                                    <label>Age</label>
                                    <input type="number" min="0" max="120" required 
                                           onChange={(e) => setAge(e.target.value)}/>
                                </div>
                                <div className="field">
                                    <label>City</label>
                                    <input type="text" required maxLength={18} placeholder="Your city"
                                           onChange={(e) => setCity(e.target.value)}/>
                                </div>
                            </div>

                            <div className="row2">
                                <div className="field">
                                    <label>Gender</label>
                                    <select required onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Interested in</label>
                                    <select required onChange={(e) => setInterestedIn(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="women">Women</option>
                                        <option value="men">Men</option>
                                        <option value="everyone">Everyone</option>
                                    </select>
                                </div>
                            </div>

                            <div className="field">
                                <label>Bio</label>
                                <textarea required maxLength={40} placeholder="Tell us a little about yourself..."
                                          onChange={(e) => setBio(e.target.value)}/>
                            </div>

                            <div className="field">
                                <label>Profile photo</label>
                                <label className="file-label">
                                    <i className="ti ti-upload"/>
                                    <span>Choose image</span>
                                    <input type="file" accept="image/*" required
                                           onChange={(e) => {
                                               setImageFile(e.target.files[0]);
                                               setImage_name(e.target.value);
                                           }}/>
                                </label>
                            </div>
                            <button type="submit" className="submit-btn">Create profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}