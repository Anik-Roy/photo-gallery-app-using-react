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
    const [category, setCategory] = useState(null);

    const dropdownToggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        let unsubscribe = db.collection("categories").onSnapshot(snapshot=>{
            let options = [<DropdownItem key="all" onClick={handleCategory}>All</DropdownItem>];
            snapshot.forEach(doc => {
                const jsonData = doc.data();
                Object.keys(jsonData).forEach(key => {
                    options.push(<DropdownItem key={key} onClick={handleCategory}>{jsonData[key]}</DropdownItem>)
                });
            })
            setCategories(options);
        })
        return () => unsubscribe();
    }, []);

    const handleCategory = event => {
        setCategory(event.target.innerText);
        // console.log("Home: ", event.target.innerText, category);
    }

    return (
        <div className="row">
            <div className="col-md-8">
                { props.user && <Upload user={props.user} /> }
                {!props.user && <h3 style={{color: "#d49692", textAlign: "center", marginTop: "20px"}}>Please login to upload images!</h3>}
                <ImageGrid setSelectedImage={setSelectedImage} category={category} />
                {selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} user={props.user} username={props.user ? props.user.displayName : ""} />}
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