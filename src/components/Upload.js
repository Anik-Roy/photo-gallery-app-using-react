import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'reactstrap';
import ProgressBar from './ProgressBar';
import { db } from '../firebase';
import { isEqual } from "lodash";

const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Upload = props => {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);
    const [categoryError, setCategoryError] = useState(null);
    const [showProgressBar, setShowProgressBar] = useState(false);
    const [categories, setCategories] = useState([]);
    const prevCategories = usePrevious(categories);

    useEffect(() => {
        if(!isEqual(categories, prevCategories)) {
            console.log("categories has changed!");
            db.collection("categories").onSnapshot(snapshot=>{
                let options = [<option key="__SELECT_CATEGORY__" value="">Select Category</option>];
                snapshot.forEach(doc => {
                    const jsonData = doc.data();
                    Object.keys(jsonData).forEach(key => {
                        options.push(<option key={key} value={jsonData[key]}>{jsonData[key]}</option>)
                    });
                })
                setCategories(options);
            })
        }
    }, [prevCategories]);

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleChange = event => {
        let selectedImage = event.target.files[0];
        if(selectedImage && types.includes(selectedImage.type)) {
            setFile(selectedImage);
            setError(null);
        } else {
            setFile(null);
            setError("Please select a image file(png/jpeg/jpg)");
        }
    }

    const handleCategory = event => {
        console.log(event.target.value);
        if(event.target.value === "") {
            setCategory("");
            setCategoryError("Please provide a category!");
        } else {
            setCategory(event.target.value);
            setCategoryError(null);
        }
    }

    const validateInput = () => {
        if(file === null) {
            setError("Please select a image file(png/jpeg/jpg)");
            return false;
        }
        if(category === "") {
            setCategoryError("Please provide a category!");
            return false;
        }
        return true;
    }
    const handleSubmit = event => {
        event.preventDefault();
        let result = validateInput();
        // console.log(result);
        if(result) {
            // console.log(file, category);
            // console.log(error, categoryError);
            setShowProgressBar(true);
        }
    }

    return (
        <div>
            <h3 className="title">Upload your picture</h3>
            <form className="uploadForm" onSubmit={handleSubmit}>
                <label className="file_label">
                    <input type="file" onChange={handleChange} />
                    <span>+</span>
                </label>
                <div className="output">
                    { error && <div className="error">{ error }</div>}
                    { file && <div>{ file.name }</div> }
                </div>
                <Input style={{width: "250px", margin: "0 auto"}} type="select" name="select" id="categorySelect" onChange={handleCategory}>
                    {categories}
                </Input>
                <div className="output">
                    { categoryError && <div className="error">{ categoryError }</div>}
                </div>
                <br />
                <button type="submit" className="btn btn-success btn-sm">Upload</button>
                <div className="output">
                    
                    { file && category !== "" && showProgressBar && <ProgressBar
                                        file={file}
                                        setFile={setFile}
                                        category={category}
                                        setCategory={setCategory}
                                        setShowProgressBar={setShowProgressBar}
                                        user={props.user} /> }
                </div>
            </form>
        </div>
    )
}

export default Upload;