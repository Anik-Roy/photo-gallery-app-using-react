import React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from "formik";
import { auth } from '../../firebase';

const Login = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                onSubmit={
                    (values) => {
                        console.log(values);
                        auth.signInWithEmailAndPassword(values.email, values.password)
                            .then(authUser => console.log("Login: ", authUser))
                            .catch(error=>alert(error.message))
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

                        // console.log("Login: ", errors);

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
                                <button type="submit" className="btn btn-success">Login</button>
                            </form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )
}

export default Login;