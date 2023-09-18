import React, { useState } from 'react'
import Layout from '../AdminLayout/Layout'
import { Formik } from "formik";
import * as Yup from "yup";
import firebaseApp from '../../Firebase/firebase';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loader from '../../Loader';
import { useRef } from 'react';
export default function Brands() {

    const [img, setImg] = useState('')
    const [showLoader, setshowLoader] = useState(false);

    const formikref = useRef('')

    const clearvalue = () => {
        const { setFieldValue } = formikref.current;
        setFieldValue('BrandCode', '')
        setFieldValue('brandname', '')

    }

    const Imgchange = (file) => {
        setshowLoader(true)
        for (let i = 0; i < file.length; i++) {
            UploadImageTOFirebase(file[i])

        }
    }


    const UploadImageTOFirebase = (file) => {
        const guid = () => {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return String(s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4());
        }


        let myPromise = new Promise((resolve, reject) => {

            const myGuid = guid();
            const storageUrl = firebaseApp.storage('gs://decode-ecommerce-d9b20.appspot.com')
            const storageRef = storageUrl.ref();
            console.log('ref : ', storageRef)
            const uploadTask = storageRef.child('decode-ecommerce-d9b20').child('Products').child(myGuid).put(file)
            uploadTask.on('state_changed',
                (snapShot) => {

                }, (err) => {
                    //catches the errors
                    console.log(err)
                    reject(err)
                }, () => {

                    firebaseApp
                        .storage('gs://decode-ecommerce-d9b20.appspot.com')
                        .ref()
                        .child('decode-ecommerce-d9b20')
                        .child('Products')
                        .child(myGuid)
                        .getDownloadURL()
                        .then(fireBaseUrl => {
                            resolve(fireBaseUrl)
                        }).catch(err => {
                            console.log('error caught', err)
                        })
                })
        })
        myPromise.then(url => {
            setImg(url)
            setshowLoader(false)

        }).catch(err => {
            console.log('error caught', err)
        })
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

    const submitdata = (values) => {
        let x = []

        let obj = {
            BrandName: values.brandname,
            BrandCode: values.BrandCode,
            id: makeid(7),
            BrandImage: img
        }

        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("Brands").add(obj)

                .then((docRef) => {
                    console.log("Document written with ID: ", docRef);
                    resolve(docRef.id);
                    setImg()

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


    return (
        <>
            <Layout />
            {showLoader && <Loader />}
            <div className="main-section-left">
                <Formik
                    innerRef={formikref}
                    initialValues={{ brandname: "", BrandCode: "", }}
                    onSubmit={(values, { setSubmitting }) => {
                        submitdata(values)
                        clearvalue()
                    }}
                    validationSchema={Yup.object().shape({
                        brandname: Yup.string()
                            .required("brandname Required"),
                        BrandCode: Yup.string()
                            .required("BrandCode Required"),

                    })}

                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        } = props;
                        return (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <div className="container text-center cardStyle">
                                        <h1 className='text-center mb-5'>Add Brand</h1>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="brandname">Brand Name:</label>
                                                <input

                                                    name="brandname"
                                                    type="text"
                                                    placeholder="Enter your brandname"
                                                    value={values.brandname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.brandname && touched.brandname && "error"}
                                                />
                                                {errors.brandname && touched.brandname && (
                                                    <div className="input feedback">{errors.brandname}</div>
                                                )}
                                            </div>

                                            <div className="col-lg-6">
                                                <label htmlFor="BrandCode">Brand Code:</label>
                                                <input
                                                    name="BrandCode"
                                                    type="text"
                                                    placeholder="Enter your BrandCode"
                                                    value={values.BrandCode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.BrandCode && touched.BrandCode && "error"}
                                                />
                                                {errors.BrandCode && touched.BrandCode && (
                                                    <div className="input feedback">{errors.BrandCode}</div>
                                                )}
                                            </div>

                                            <div className="col-lg-12" style={{ marginTop: "30px" }}>
                                                <div className="main_content">
                                                    <div className="container">

                                                        <label htmlFor="Choose file:">Choose file:</label>

                                                        <label class="mt-3 input-file">
                                                            <b class="btn btn-primary">
                                                                <i class="material-icons"></i> Upload Product Images</b>
                                                            <input type="file" class="fileInput" onChange={(e) => Imgchange(e.target.files)} multiple /></label>

                                                        <img src={img} alt="" className='img-fluid' />
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="col-lg-12 mt-5 ">
                                                <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form >
                            </>
                        );
                    }}
                </Formik>

            </div>
        </>
    )
}
