import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig";
import DeleteArticle from './DeleteArticle';
import './Articles.css';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const articleRef = collection(db, "Articles");
        const q = query(articleRef, orderBy("CreatedAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articles);
            console.log(articles);
        })
    }, []);





    return (
        <div>
            {
                articles.length === 0 ? (
                    <p className='noArticle'>No Articles found !</p>
                ) : (
                    articles.map(({ id, Title, Description, imageUrl, CreatedAt }) => (
                        <div className="border mt-3 p-3 bg-light" key={id}>

                            <div className="row derecha">
                                <div className="col-3">
                                    <img src={imageUrl} alt='title' style={{height:180, width:180}} />
                                </div>
                                <div className="texto_foto col-p ps-3">
                                    <h2>
                                        {Title}
                                    </h2>
                                    <p className="fecha">
                                        {CreatedAt.toDate().toDateString()} {/* toDateString() devuelve la fecha y hora reducida*/}
                                    </p>
                                    <h4>
                                        {Description}
                                    </h4>
                                    <DeleteArticle id={id} imageUrl={imageUrl} />
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

//export default Articles