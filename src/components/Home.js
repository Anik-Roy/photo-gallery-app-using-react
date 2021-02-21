import React, { useState, useEffect } from "react";
import ImageGrid from './ImageGrid';
import Upload from './Upload';
import Modal from './Modal';
import { db } from '../firebase';
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const Home = props => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const dropdownToggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        db.collection("categories").onSnapshot(snapshot=>{
            let options = [];
            snapshot.forEach(doc => {
                const jsonData = doc.data();
                Object.keys(jsonData).forEach((key, idx) => {
                    console.log(idx);
                    options.push(<DropdownItem>{jsonData[key]}</DropdownItem>)
                });
            })
            setCategories(options);
        })
    }, [categories]);

    const handleCategory = event => {
        console.log(event.target.value);
    }

    return (
        <div className="row">
            <div className="col-md-8">
                { props.user && <Upload user={props.user} /> }
                {!props.user && <h3 style={{color: "#d49692", textAlign: "center", marginTop: "20px"}}>Please login to upload images!</h3>}
                <ImageGrid setSelectedImage={setSelectedImage} />
                {selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} username={props.user.displayName} />}
            </div>
            <div className="col-md-4" style={{padding: "50px", borderLeft: "1px solid #efb6b2"}}>
                <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle}>
                    <DropdownToggle caret>
                        Category
                    </DropdownToggle>
                    <DropdownMenu>
                        {categories}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Home;