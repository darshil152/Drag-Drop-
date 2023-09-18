import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Layout from '../AdminLayout/Layout'
import { Formik } from "formik";
import * as Yup from "yup";
import firebaseApp from "../../Firebase/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MUIDataTable from "mui-datatables";

export default function Settings() {

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [SubModal, setShows] = useState(false);
    const subClose = () => setShows(false);
    const subShow = () => setShows(true);

    const [childModal, setShowss] = useState(false);
    const childClose = () => setShowss(false);
    const childShow = () => setShowss(true);

    const [subpush, setsubpush] = useState('')
    const [childpush, setChildpish] = useState('')
    const [dummy, setdummy] = useState('')
    const [deoendence, setdependence] = useState([])


    const [mainCat, setMaincat] = useState([])
    const [subCat, setsubcat] = useState([])
    const [childCat, setchildcat] = useState([])

    useEffect(() => {
        getdata()
    }, [])

    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('Setting').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                if (doc.data().MainCategory?.length > 0) {
                    setMaincat(doc.data().MainCategory)
                } else {
                    setMaincat([])
                }

                if (doc.data().SubCategory?.length > 0) {
                    setsubcat(doc.data().SubCategory)
                } else {
                    setsubcat([])
                }

                if (doc.data().ChildCategory?.length > 0) {
                    setchildcat(doc.data().ChildCategory)
                } else {
                    setchildcat([])
                }

            })
        }).catch(err => {
            console.error(err)
        });
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

    const submitmain = (values) => {
        let x = mainCat
        let obj = {
            CateName: values.categoryname,
            Caturl: values.url,
            id: makeid(6)
        }
        x.push(obj)

        const db = firebaseApp.firestore();
        db.collection('Setting').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Setting").doc(doc.ref.id);

                return updateCollection.update({
                    MainCategory: x
                })
                    .then(() => {
                        toast.success('Main Category added Successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setShow(false)
                    })
                    .catch((error) => {

                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            })
        }).catch(err => {
            console.error(err)
        });
    }



    const selectMain = (e) => {
        setsubpush(e.target.value)
        findcate(e.target.value)
    }

    const selectSub = (e) => {
        setChildpish(e.target.value)
    }

    const findcate = (val) => {
        let x = []
        let flag = false

        for (let i = 0; i < subCat.length; i++) {
            if (subCat[i].Maincatid == val) {
                x.push(subCat[i])
                flag = true
            }
        }
        if (flag) {
            setdependence(x)
        } else {
            setdependence([])
        }
    }

    const submitsub = (values) => {
        let x = subCat
        let obj = {
            CateName: values.categoryname,
            Caturl: values.url,
            id: makeid(6),
            Maincatid: subpush,
        }
        x.push(obj)

        setShows(false)
        console.log(obj)

        const db = firebaseApp.firestore();
        db.collection('Setting').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Setting").doc(doc.ref.id);

                return updateCollection.update({
                    SubCategory: x

                })
                    .then(() => {
                        toast.success('Subcategory added Successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setShow(false)
                    })
                    .catch((error) => {

                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            })
        }).catch(err => {
            console.error(err)
        });


    }

    const childsubmit = (values) => {
        let x = childCat
        let obj = {
            CateName: values.categoryname,
            Caturl: values.url,
            id: makeid(6),
            MainCategory: subpush,
            SubCategory: childpush,
        }
        x.push(obj)
        console.log(x)
        setShowss(false)
        const db = firebaseApp.firestore();
        db.collection('Setting').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Setting").doc(doc.ref.id);

                return updateCollection.update({
                    ChildCategory: x

                })
                    .then(() => {
                        toast.success('Subcategory added Successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setShowss(false)
                    })
                    .catch((error) => {

                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            })
        }).catch(err => {
            console.error(err)
        });

    }



    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })


    const options = {
        selectableRowsHideCheckboxes: true,
        filterType: "dropdown",
        direction: 'desc',
    };

    const columns = [
        {
            name: "id",
            label: "id",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Caturl",
            label: "Caturl",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "CateName",
            label: "CateName",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    const columnss = [
        {
            name: "id",
            label: "id",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Caturl",
            label: "Caturl",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "CateName",
            label: "CateName",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "MainCategory",
            label: "MainCategory",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "SubCategory",
            label: "SubCategory",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];


    return (
        <>
            <Layout />
            <div className="main-section-left">
                <div className="main-section-lefts col-lg-12">

                    <Button variant="primary" onClick={handleShow}>
                        Main Category :
                    </Button>



                    <br />
                    <Button variant="primary" className="mt-5" onClick={subShow}>
                        Sub Category :
                    </Button>

                    <br />
                    <Button variant="primary" className="mt-5" onClick={childShow}>
                        Child Category :
                    </Button>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4 mt-5">
                                <CacheProvider value={muiCache}>
                                    <ThemeProvider theme={createTheme()}>
                                        <MUIDataTable
                                            title={"Main Category"}
                                            data={mainCat}
                                            columns={columns}
                                            options={options}
                                        />
                                    </ThemeProvider>
                                </CacheProvider>
                            </div>
                            <div className="col-lg-4 mt-5">
                                <CacheProvider value={muiCache}>
                                    <ThemeProvider theme={createTheme()}>
                                        <MUIDataTable
                                            title={"Sub Category"}
                                            data={subCat}
                                            columns={columns}
                                            options={options}
                                        />
                                    </ThemeProvider>
                                </CacheProvider>
                            </div>
                            <div className="col-lg-4 mt-5">
                                <CacheProvider value={muiCache}>
                                    <ThemeProvider theme={createTheme()}>
                                        <MUIDataTable
                                            title={"Child Category"}
                                            data={childCat}
                                            columns={columnss}
                                            options={options}
                                        />
                                    </ThemeProvider>
                                </CacheProvider>
                            </div>
                        </div>

                    </div>


                    <Modal show={showModal} onHide={handleClose} size="lg">
                        <Modal.Body>
                            <Formik
                                // innerRef={formikref}

                                initialValues={{ categoryname: "", url: "", }}
                                onSubmit={(values, { setSubmitting }) => {
                                    submitmain(values)
                                }}
                                validationSchema={Yup.object().shape({
                                    categoryname: Yup.string()
                                        .required("categoryname Required"),
                                    url: Yup.string()
                                        .required("url Required"),


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
                                                    <h1 className='text-center mb-5'>Add Main Category Detail</h1>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="categoryname">Category Name:</label>
                                                            <input

                                                                name="categoryname"
                                                                type="text"
                                                                placeholder="Enter your categoryname"
                                                                value={values.categoryname}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={errors.categoryname && touched.categoryname && "error"}
                                                            />
                                                            {errors.categoryname && touched.categoryname && (
                                                                <div className="input feedback">{errors.categoryname}</div>
                                                            )}
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <label htmlFor="url">Redirect Url:</label>
                                                            <input
                                                                name="url"
                                                                type="url"
                                                                placeholder="Enter your url"
                                                                value={values.url}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={errors.url && touched.url && "error"}
                                                            />
                                                            {errors.url && touched.url && (
                                                                <div className="input feedback">{errors.url}</div>
                                                            )}
                                                        </div>
                                                        <div className="col-lg-12 mt-5 ">
                                                            <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                                Add
                                                            </button>
                                                            <Button className="btn btn-danger ml-5 w-25" onClick={handleClose}>
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    );
                                }}
                            </Formik>
                        </Modal.Body>

                    </Modal>


                    <Modal show={SubModal} onHide={subClose} size="lg">
                        <Modal.Body>
                            <Formik
                                // innerRef={formikref}

                                initialValues={{ categoryname: "", url: "", }}
                                onSubmit={(values, { setSubmitting }) => {
                                    submitsub(values)
                                }}
                                validationSchema={Yup.object().shape({
                                    categoryname: Yup.string()
                                        .required("categoryname Required"),
                                    url: Yup.string()
                                        .required("url Required"),
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
                                                    <h1 className='text-center mb-5'>Add Sub Category Detail</h1>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="categoryname">Category Name:</label>
                                                            <input

                                                                name="categoryname"
                                                                type="text"
                                                                placeholder="Enter your categoryname"
                                                                value={values.categoryname}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={errors.categoryname && touched.categoryname && "error"}
                                                            />
                                                            {errors.categoryname && touched.categoryname && (
                                                                <div className="input feedback">{errors.categoryname}</div>
                                                            )}
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <label htmlFor="url">Redirect Url:</label>
                                                            <input
                                                                name="url"
                                                                type="url"
                                                                placeholder="Enter your url"
                                                                value={values.url}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={errors.url && touched.url && "error"}
                                                            />
                                                            {errors.url && touched.url && (
                                                                <div className="input feedback">{errors.url}</div>
                                                            )}
                                                        </div>

                                                        <div className="col-lg-12 mb-3">
                                                            <label className="lbl-comn-info">Choose Main Category : <span className="text-danger"></span></label>
                                                            <select className="selecttype"
                                                                name="Maincategory"
                                                                onChange={selectMain}
                                                            >
                                                                <option>Select the Category :</option>

                                                                {mainCat && mainCat.length > 0 && mainCat.map((i) => (
                                                                    <option value={i.id}>{i.CateName}</option>
                                                                ))}

                                                            </select>
                                                        </div>
                                                        <div className="col-lg-12 mt-5 ">
                                                            <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                                Add
                                                            </button>
                                                            <Button className="btn btn-danger ml-5 w-25" onClick={subClose}>
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    );
                                }}
                            </Formik>
                        </Modal.Body>

                    </Modal>

                    <Modal show={childModal} onHide={childClose} size="lg">
                        <Modal.Body>
                            <Formik
                                // innerRef={formikref}

                                initialValues={{ categoryname: "", url: "", }}
                                onSubmit={(values, { setSubmitting }) => {
                                    childsubmit(values)
                                    // console.log(values)
                                }}
                                validationSchema={Yup.object().shape({
                                    categoryname: Yup.string()
                                        .required("categoryname Required"),
                                    url: Yup.string()
                                        .required("url Required"),
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
                                                    <h1 className='text-center mb-5'>Add Child Category Detail</h1>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="categoryname">Category Name:</label>
                                                            <input

                                                                name="categoryname"
                                                                type="text"
                                                                placeholder="Enter your categoryname"
                                                                value={values.categoryname}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={errors.categoryname && touched.categoryname && "error"}
                                                            />
                                                            {errors.categoryname && touched.categoryname && (
                                                                <div className="input feedback">{errors.categoryname}</div>
                                                            )}
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <label htmlFor="url">Redirect Url:</label>
                                                            <input
                                                                name="url"
                                                                type="url"
                                                                placeholder="Enter your url"
                                                                value={values.url}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={errors.url && touched.url && "error"}
                                                            />
                                                            {errors.url && touched.url && (
                                                                <div className="input feedback">{errors.url}</div>
                                                            )}
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                            <label className="lbl-comn-info">Choose Main Category : <span className="text-danger"></span></label>
                                                            <select className="selecttype"
                                                                name="Maincategory"
                                                                onChange={selectMain}
                                                            >
                                                                <option>Select the Category :</option>

                                                                {mainCat && mainCat.length > 0 && mainCat.map((i) => (
                                                                    <option value={i.id}>{i.CateName}</option>
                                                                ))}

                                                            </select>
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                            <label className="lbl-comn-info">Choose Sub-Category : <span className="text-danger"></span></label>
                                                            <select className="selecttype"
                                                                name="Maincategory"
                                                                onChange={selectSub}
                                                            >
                                                                <option selected>Select the Category :</option>

                                                                {deoendence && deoendence.length > 0 && deoendence.map((i) => (
                                                                    <option value={i.id}>{i.CateName}</option>
                                                                ))}

                                                            </select>
                                                        </div>

                                                        { }

                                                        <div className="col-lg-12 mt-5 ">
                                                            <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                                Add
                                                            </button>
                                                            <Button className="btn btn-danger ml-5 w-25" onClick={childClose}>
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    );
                                }}
                            </Formik>
                        </Modal.Body>

                    </Modal>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
