import "../Components/Login.css"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import firebaseApp from "../../Firebase/firebase";


export default function Register() {


    useEffect(() => {

        getdata()

    }, [])





    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
    const [alluser, setAlluser] = useState([])

    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('Users').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                setAlluser(x)
            })
        }).catch(err => {
            console.error(err)
        });
    }


    const submitloginform = (formdata) => {
        let flag = false

        for (let i = 0; i < alluser.length; i++) {
            if (alluser[i].email == document.getElementById('email').value) {
                flag = true
            }
        } if (flag) {
            toast.warn('User allready registerd ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            let obj = {
                name: formdata.name,
                email: formdata.email,
                password: formdata.password,
                contact: formdata.number,
                id: makeid(6)
            }

            let registerQuery = new Promise((resolve, reject) => {
                let db = firebaseApp.firestore();
                db.collection("Users").add(obj)

                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef);
                        toast.success('Register  Successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        navigate('/login')
                        localStorage.setItem("id", JSON.stringify(obj.id));
                    })
                    .catch((error) => {
                        console.error("Please check form again ", error);
                        reject(error);
                    });
            });
            registerQuery.then(result => {
                console.warn('register successful')
            }).catch(error => {
                console.error(error)
            })
        }

    }

    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        } else {
            setPasswordType("password")

        }
    }



    const errorContainer = (form, field) => {
        return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
    };

    const formAttr = (form, field) => ({
        onBlur: form.handleBlur,
        onChange: form.handleChange,
        value: form.values[field],
    });


    return (
        <>
            <div className="login-root">
                <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
                    <div className="loginbackground box-background--white padding-top--64">
                        <div className="loginbackground-gridContainer">
                            <div className="box-root flex-flex" style={{ gridArea: 'top / start / 8 / end' }}>
                                <div className="box-root" style={{ backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)', flexGrow: 1 }}>
                                </div>
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: '4 / 2 / auto / 5' }}>
                                <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: 1 }} />
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: '6 / start / auto / 2' }}>
                                <div className="box-root box-background--blue800" style={{ flexGrow: 1 }} />
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: '7 / start / auto / 4' }}>
                                <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }} />
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
                                <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: 1 }} />
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: '2 / 15 / auto / end' }}>
                                <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{ flexGrow: 1 }} />
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: '3 / 14 / auto / end' }}>
                                <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }} />
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
                                <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: 1 }} />
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
                                <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: 1 }} />
                            </div>

                        </div>
                    </div>
                    <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
                        <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                            <h1 className='studentslogin'>Register Form</h1>
                        </div>
                        <div className="box-root flex-flex flex-justifyContent--center ">
                        </div>
                        <div className="formbg-outer">
                            <div className="formbg">
                                <div className="formbg-inner padding-horizontal--48">
                                    <Formik
                                        enableReinitialize
                                        initialValues={{
                                            name: "",
                                            password: "",
                                            email: "",
                                            number: ""
                                        }}
                                        validationSchema={Yup.object({
                                            name: Yup.string().required("name is required."),
                                            password: Yup.string().required("password is required."),
                                            email: Yup.string()
                                                .email()
                                                .required("Email Required"),
                                            number: Yup.string().required("Phone number is required."),

                                        })}
                                        onSubmit={(formData, { resetForm }) => {
                                            submitloginform(formData, resetForm);
                                        }}
                                    >
                                        {(runform) => (

                                            <form id="stripe-login" onSubmit={runform.handleSubmit}>
                                                <div className="field padding-bottom--24">
                                                    <label htmlFor="name">Name:</label>
                                                    <input type="text" id='name' name="name" {...formAttr(runform, "name")} placeholder="" />
                                                    {errorContainer(runform, "name")}

                                                </div>
                                                <div className="field padding-bottom--24">
                                                    <label htmlFor="email">email:</label>
                                                    <input type="email" id='email' name="email" {...formAttr(runform, "email")} placeholder="" />
                                                    {errorContainer(runform, "email")}

                                                </div>
                                                <div className="field padding-bottom--24">
                                                    <label htmlFor="pass">Password</label>
                                                    <input type={passwordType} id='pass' name="password" {...formAttr(runform, "password")} placeholder="" />
                                                    <button className="btn-btn-primary eyepass" type='button' onClick={togglePassword}>
                                                        {passwordType === "password" ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                                                    </button>
                                                    {errorContainer(runform, "password")}
                                                </div>
                                                <div className="field padding-bottom--24">
                                                    <label htmlFor="number">number:</label>
                                                    <input type="number" id='number' name="number" {...formAttr(runform, "number")} placeholder="" />
                                                    {errorContainer(runform, "number")}

                                                </div>



                                                <div className="field padding-bottom--24">
                                                    <input href="#" type="submit" defaultValue="Login" />
                                                </div>

                                                <div className="field padding-bottom--24 text-center">
                                                    <Link to="/login">If you  have an account</Link>
                                                </div>

                                            </form>
                                        )}
                                    </Formik>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}
