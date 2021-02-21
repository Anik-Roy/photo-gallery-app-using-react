import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CommentForm from './CommentForm';
import { db } from '../firebase';

const Modal = props => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let unsubscribe = db.collection("images")
                        .doc(props.selectedImage.id)
                        .collection("comments")
                        .orderBy("createdAt", "desc")
                        .onSnapshot(snapshot => {
                            // console.log(snapshot.docs);
                            setComments(snapshot.docs.map(doc=>doc.data()));
                        });
        return () => {
            unsubscribe();
        }
    }, [props.selectedImage])

    const handleClick = (e) => {
        if(e.target.classList.contains("backdrop")) {
            props.setSelectedImage(null);
        }   
    }

    return (
        <motion.div className="backdrop" onClick={handleClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}>
            <div style={{background: "white", width: "50%", margin: "0 auto", overflowY: "scroll"}}>
                <motion.img src={props.selectedImage.url} alt="enlarged pic"
                    initial={{y: "-100vh"}}
                    animate={{y: 0}}/>
                <CommentForm id={props.selectedImage.id} username={props.username} />
                <hr />
                <div className="post_comments">
                    {comments.map(comment=>{
                        return <div style={{border: "1px solid black", padding: "10px", margin: "5px"}}>
                            <strong>{comment.username}</strong>
                            <p>Rating: {comment.rating}</p>
                            <p>Feedback: {comment.feedback}</p>
                        </div>
                    })}
                </div>
            </div>
        </motion.div>
    )
}

export default Modal;