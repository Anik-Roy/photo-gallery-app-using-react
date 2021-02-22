import { useState, useEffect } from 'react';
import { db } from '../firebase';

const useFirestore = (collection, category) => {
    const [docs, setDocs] = useState([]);
    
    useEffect(()=>{
        let unsubscribe = null;
        if(category !== null && category !== "All") {
            console.log("useFirestore: if", category);
            unsubscribe = db.collection(collection)
                        .where("category", "==", category)
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
        } else {
            console.log("useFirestore: else", category);
            unsubscribe = db.collection(collection)
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
        }
        return () => unsubscribe();
    }, [collection, category]);

    return { docs };
}

export default useFirestore;