import React, { useState } from 'react';
import { Formik } from 'formik';
import { db, timestamp } from '../firebase';

const CommentForm = props => {
    return (
        <div style={{background: "white", width: "500px", margin: "0 auto"}}>
            <Formik
                initialValues={{
                    rating: "",
                    feedback: ""
                }}
                enableReinitialize
                onSubmit={
                    (values) => {
                        db.collection("images").doc(props.id).collection("comments").add({
                            ...values,
                            username: props.username,
                            createdAt: timestamp()
                        });
                    }
                }
                validate={
                    (values)=>{
                        const errors = {};

                        if(!values.rating) {
                            errors.rating = "Required!";
                        }

                        if(!values.feedback) {
                            errors.feedback = "Required!";
                        }

                        return errors;
                    }
                }
            >
                {
                    ({values, handleChange, handleSubmit, errors}) => (
                        <div style={{
                            border: "1px solid #efb6b2",
                            padding: "15px",
                            borderRadius: "7px",
                            width: "100%",
                            margin: "10px auto"
                        }}>
                            <h3>Give your feedback</h3>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="rating">Rating:&nbsp; &nbsp;</label>

                                <select name="rating" id="rating" onChange={handleChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <span style={{color: "red"}}>{errors.rating}</span>
                                <br />
                                <input
                                    name="feedback"
                                    placeholder="Give your feedback"
                                    className="form-control"
                                    onChange={handleChange} />
                                <span style={{color: "red"}}>{errors.feedback}</span>
                                <br />
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )
}

export default CommentForm;