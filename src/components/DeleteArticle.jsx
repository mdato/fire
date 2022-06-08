import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db } from '../firebaseConfig'
import { toast } from 'react-toastify';
import { storage } from './../firebaseConfig';
import { deleteObject, ref } from 'firebase/storage';

export default function DeleteArticle({id, imageUrl}) {
    const handleDelete = async()=> {
        try {
            await deleteDoc(doc(db, "Articles", id))
            toast("Article deleted succesfully", {type: "success", autoClose: 1000})
            const storageRef = ref(storage, imageUrl)
            await deleteObject(storageRef)
        } catch (error) {
            toast("Error deleting article", {type: "error"});
            console.log(error);
        }
    } 
    return (
        <div>
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </div>
      )
}
