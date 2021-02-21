import { useState, useEffect } from 'react';
import { storage, db, timestamp } from '../firebase';

const useStorage = (file, category, user) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(()=>{
        // refferences
        const storageRef = storage.ref(file.name);
        const collectionRef = db.collection("images");

        storageRef.put(file).on("state_changed", (snapshot)=>{
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage);
        }, (error)=>{
            setError(error);
        }, async ()=> {
            const url = await storageRef.getDownloadURL();
            const created_at = timestamp();
            setUrl(url);
        
            collectionRef.add({
                url: url,
                category: category,
                username: user.email,
                createdAt: created_at
            })
        });
    }, [file]);

    return { progress, url, error };
}

export default useStorage;