import React from 'react';
import { Formik } from "formik";
import { auth } from '../../firebase';

const Signup = () => {
    
    return (
        <div>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    passwordConfirm: ""
                }}
                onSubmit={
                    (values) => {
                        auth.createUserWithEmailAndPassword(values.email, values.password)
                            .then(authUser => {
                                console.log("Signup: user", authUser.user);
                                return authUser.user.updateProfile({
                                    displayName: values.email
                                })
                            })
                            .catch(error=>alert(error.message));
                    }
                }
                validate={
                    (values)=>{
                        const errors = {};

                        if(!values.email) {
                            errors.email = "Required!";
                        } else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
                            errors.email = "Invalid email address!";
                        }

                        if(!values.password) {
                            errors.password = "Required!";
                        } else if(values.password.length < 4) {
                            errors.password = "Password must be atleast 4 characters!";
                        }

                        if(!values.passwordConfirm) {
                            errors.passwordConfirm = "Required!";
                        } else if(values.password !== values.passwordConfirm) {
                            errors.passwordConfirm = "Password field does not matched";
                        }

                        // console.log("Signup: ", errors);

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
                            width: "50%",
                            margin: "100px auto"
                        }}>
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="Enter your email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}/>
                                <span style={{color: "red"}}>{errors.email}</span>
                                <br />
                                <input
                                    name="password"
                                    placeholder="Enter your password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}/>
                                <span style={{color: "red"}}>{errors.password}</span>
                                <br />
                                <input
                                    name="passwordConfirm"
                                    placeholder="Confirm password"
                                    className="form-control"
                                    value={values.passwordConfirm}
                                    onChange={handleChange}/>
                                <span style={{color: "red"}}>{errors.passwordConfirm}</span>
                                <br />
                                
                                <button type="submit" className="btn btn-success">Sign up</button>
                            </form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )
}

export default Signup;