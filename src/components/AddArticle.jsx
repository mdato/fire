import { Timestamp, collection, addDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { storage, db } from './../firebaseConfig';


export default function AddArticle() {
    const [formData, setFormData] = useState({
        Title: "",
        Description: "",
        image: "",
        CreatedAt: Timestamp.now().toDate(),
    });

    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    }

    const handlePublish = () => {
        if (!formData.Title || !formData.Description || !formData.image) {
            alert('Complet all fields');
            return;
        }
        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, formData.image)
        
        uploadImage.on(
            "state_changed", 
            (snapshot) => {
            const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progressPercent);
        },
            (err) => {
                console.log(err);
            },
            () => {
                setFormData({
                    Title: "",
                    Description: "",
                    image: "",
                });
                getDownloadURL(uploadImage.snapshot.ref)
                    .then((url) => {
                        const articleRef = collection(db, "Articles");
                        addDoc(articleRef, {
                            Title: formData.Title,
                            Description: formData.Description,
                            imageUrl: url,
                            CreatedAt: Timestamp.now().toDate(),
                        })
                            .then(() => {
                                toast("Article added succesfully", { type: 'success' });
                                setProgress(0);
                            })
                            .catch(err=>{
                                toast("error adding article", { type: 'error'});
                            })
                    })
            }
        )
    }

    return (
        <div className='agrego p-3 mt-3 bg-light' style={{ position: "fixed" }}>
            <h2>Create Article</h2>
            <label htmlFor="">Title</label>
            <input
                type="text"
                name="Title"
                className="form-control"
                value={formData.Title}
                onChange={(e) => handleChange(e)}
            />
            <label htmlFor="">Description</label>
            <textarea
                name="Description"
                className="form-control"
                value={formData.Description}
                onChange={(e) => handleChange(e)}
            />
            <label htmlFor="">Image</label>
            <input
                type="file"
                name="image"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleImageChange(e)}
            />
            {progress === 0 ? null : (
                <div className="progress">
                <div className="progress-bar progress-bar-striped mt-2" style={{ width: `${progress}%` }}>
                    {`uploading image ${progress}%`}
                </div>
            </div>
            )}
            
            <button className="form-control btn-primary mt-2" onClick={handlePublish}>Publish</button>
        </div>

    )
}
