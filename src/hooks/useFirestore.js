import { useState, useEffect } from 'react';
import { db } from '../firebase';

const useFirestore = collection => {
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
        let unsubscribe = db.collection(collection)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot)=>{
                let documents = [];
                snapshot.forEach(doc => {
                    documents.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });
                setDocs(documents);
            });
        return () => unsubscribe();
    }, [collection]);

    return { docs };
}

export default useFirestore;