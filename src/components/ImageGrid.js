import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import Loader from "react-loader-spinner";

const ImageGrid = props => {
    const { docs } = useFirestore("images", props.category);
    // console.log("Image Grid: docs", docs);
    // console.log("Image Grid:", props.category);
    return (
        <div className="img-grid">
            
            {docs.length ? docs.map(doc => (
                <motion.div
                    className="img-wrap"
                    key={doc.id}
                    layout
                    whileHover={{opacity: 1}}
                    onClick={()=>props.setSelectedImage(doc)}>
                    <motion.img src={doc.url} alt="uploaded pic"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 1}} />
                </motion.div> )) : 
                
                (<div style={{width: "100%", textAlign: "center"}}><Loader
                    type="Oval"
                    color="#efb6b2"
                    height={100}
                    width={100}
                    timeout={3000} /></div>
                )
            }
        </div>
    );
}

export default ImageGrid;