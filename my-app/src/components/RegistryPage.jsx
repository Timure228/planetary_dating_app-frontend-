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
            <form onSubmit={(e) => {
                e.preventDefault()
                save()
            }}>
                <label>Username: </label>
                <input type="text" required={true} maxLength={15}
                       onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <label>Password: </label>
                <input type="text" required={true} maxLength={255}
                       onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <label>Age: </label>
                <input type="number" min="0" max="120" required={true}
                       onChange={(e) => setAge(e.target.value)}/>
                <br/>
                <label>Gender: </label>
                <select required={true}
                        onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
                <br/>
                <label>City: </label>
                <input type="text" required={true} maxLength={18}
                       onChange={(e) => setCity(e.target.value)}/>
                <br/>
                <label>Interested in (Gender): </label>
                <select required={true}
                        onChange={(e) => setInterestedIn(e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="everyone">Everyone</option>
                </select>
                <br/>
                <label>Bio: </label>
                <input type="text" required={true} maxLength={40}
                       onChange={(e) => setBio(e.target.value)}/>
                <br/>
                <label>Select Image: </label>
                <input type="file" accept="image/*" required={true}
                       onChange={(e) => {
                           setImageFile(e.target.files[0])
                           setImage_name(e.target.value)
                       }}/>
                <br/>
                <button type="submit">Submit and Save</button>
            </form>
        </>
    )
}