import React from 'react'
import Layout from '../AdminLayout/Layout'
import { useEffect } from 'react';
import firebaseApp from '../../Firebase/firebase';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import menu from "../Assets/menu.png"
import { Modal, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRef } from 'react';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { HexColorPicker } from "react-colorful";
import Loader from '../../Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Banner() {



    const formikref = useRef('')

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [textBanner, setTextBanner] = useState(false);
    const txbannerclose = () => setTextBanner(false);
    const txbannerShow = () => setTextBanner(true);


    const [kidsBanner, setkidsBanner] = useState(false);
    const kidsbannerclose = () => setkidsBanner(false);
    const kidsbannerShow = () => setkidsBanner(true);


    const [womenBanner, setwomenBanner] = useState(false);
    const wmbannerclose = () => setwomenBanner(false);
    const wmbannerShow = () => {
        if (Womenscategory.length == 6) {
            alert("You already added 6 category")
        } else {
            setwomenBanner(true)

        }
    }


    const [categoryBanner, setcategoryBanner] = useState(false);
    const catbannerclose = () => setcategoryBanner(false);
    const catbannerShow = () => {
        if (Categorybanners.length == 6) {
            alert("You already added 6 category")
        } else {
            setcategoryBanner(true)

        }
    };

    const [OtherBanner, setOtherBanner] = useState(false);



    const [datas, setData] = useState([]);
    const [Finalbanner, setFinalbanner] = useState([])
    const [txtbanners, settxtbanner] = useState([])
    const [Categorybanners, setCategorybanner] = useState([])
    const [Womenscategory, setWomenscategory] = useState([])
    const [kidscategory, setkidscategory] = useState([])

    const [preview, setPreview] = useState(datas)
    const [img, setImg] = useState('');

    const [showLoader, setshowLoader] = useState(false);
    const [color, setColor] = useState("#aabbcc");


    const grid = 8;





    useEffect(() => {
        getdata()
        // setItems(data);
    }, []);

    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('banners').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                if (doc.data().FirstBanner?.length > 0) {
                    setFinalbanner(doc.data().FirstBanner)
                } else {
                    setFinalbanner([])
                }

                if (doc.data().SecondBanner?.length > 0) {
                    settxtbanner(doc.data().SecondBanner)
                } else {
                    settxtbanner([])
                }

                if (doc.data().ThirdBanner?.length > 0) {
                    setCategorybanner(doc.data().ThirdBanner)
                } else {
                    setCategorybanner([])
                }

                if (doc.data().FourthBanner?.length > 0) {
                    setWomenscategory(doc.data().FourthBanner)
                } else {
                    setWomenscategory([])
                }

                if (doc.data().FifthBanner?.length > 0) {
                    setkidscategory(doc.data().FifthBanner)
                } else {
                    setkidscategory([])
                }
            })
        }).catch(err => {
            console.error(err)
        });
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(
            Finalbanner,
            result.source.index,
            result.destination.index
        );
        console.log({ Finalbanner })
        setFinalbanner(reorderedItems);
    };


    const onDragEnd2 = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItems = reorder(
            txtbanners,
            result.source.index,
            result.destination.index
        );
        console.log({ txtbanners })
        settxtbanner(reorderedItems);
    };

    const onDragEnd3 = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItems = reorder(
            Categorybanners,
            result.source.index,
            result.destination.index
        );
        console.log({ Categorybanners })
        setCategorybanner(reorderedItems);
    };

    const onDragEnd4 = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItems = reorder(
            Womenscategory,
            result.source.index,
            result.destination.index
        );
        console.log({ Womenscategory })
        setWomenscategory(reorderedItems);
    };

    const onDragEnd5 = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItems = reorder(
            kidscategory,
            result.source.index,
            result.destination.index
        );
        console.log({ kidscategory })
        setkidscategory(reorderedItems);
    };


    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        background: isDragging ? "" : "",
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "" : "",
        padding: grid,
    });




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


    const categoryBan = (file) => {
        setshowLoader(true)
        for (let i = 0; i < file.length; i++) {
            categorygetBase64(file[i])
            UploadImageTOFirebase(file[i])
        }
    }

    const Womencategory = (file) => {
        setshowLoader(true)
        for (let i = 0; i < file.length; i++) {
            categorygetBase64(file[i])
            UploadImageTOFirebase(file[i])
        }
    }



    const categorygetBase64 = (file) => {
        let x = []
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            x.push(reader.result)
            setData(x)
        };
        setPreview(datas)
    }

    const Imgchange = (file) => {
        setshowLoader(true)
        for (let i = 0; i < file.length; i++) {
            getBase64(file[i])
            UploadImageTOFirebase(file[i])
        }
    }

    const getBase64 = (file) => {
        let x = []
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            getsize(reader.result)
            x.push(reader.result)
            setData(x)
        };
        setPreview(datas)
    }

    const getsize = (test) => {
        const img = new Image();
        img.src = test
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            console.log(`The image is ${width} pixels wide and ${height} pixels tall.`);
            if (width == 1920 && height == 1080) {
                console.log("okay")
            } else {
                window.location.href = "https://www.google.com/"
            }
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
            console.log(url)
            setImg(url)
            setshowLoader(false)

        }).catch(err => {
            console.log('error caught', err)
        })
    }

    const clearvalue = () => {
        const { setFieldValue } = formikref.current;
        setFieldValue('bannername', "")
        setFieldValue('url', "")
    }




    // ------------------------------------------------ First banner ---------------------------------------------//

    const submitdata = (values) => {
        let x = Finalbanner
        let obj = {
            Title: values.bannername,
            Url: values.url,
            Image: img,
            id: makeid(6),
            status: 0,
        }
        x.push(obj)
        setFinalbanner(x)
        setShow(false)
        update(x)

    }

    const update = (x) => {
        const db = firebaseApp.firestore();
        db.collection('banners').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("banners").doc(doc.ref.id);

                return updateCollection.update({
                    FirstBanner: x
                })
                    .then(() => {
                        toast.success('Banner Changed Successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
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




    // ------------------------------------------------ Second banner ---------------------------------------------//


    const submitTextbanner = (values) => {
        let y = txtbanners
        let obj = {
            Bannertext: values.Bannertext,
            Bannerurl: values.url,
            id: makeid(6),
            bgcolor: color,
            status: 0,
        }
        y.push(obj)
        settxtbanner(y)
        setTextBanner(false)
        updatetextbanner(y)

    }

    const updatetextbanner = (y) => {
        const db = firebaseApp.firestore();
        db.collection('banners').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("banners").doc(doc.ref.id);

                return updateCollection.update({
                    SecondBanner: y
                })
                    .then(() => {
                        toast.success('Banner Changed Successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
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


    // ------------------------------------------------ Third banner ---------------------------------------------//

    const categorybanner = (values) => {
        let x = Categorybanners
        let obj = {
            MainCategory: values.MainCategory,
            CategoryName: values.categoryname,
            Bannerurl: values.url,
            bannerImage: img,
            id: makeid(6),
            status: 0,
        }
        x.push(obj)
        setImg([])
        setcategoryBanner(false)
        updateCategory(x)

    }

    const updateCategory = (x) => {
        const db = firebaseApp.firestore();
        db.collection('banners').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("banners").doc(doc.ref.id);

                return updateCollection.update({
                    ThirdBanner: x
                })
                    .then(() => {
                        toast.success('Banner Changed Successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
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

    // ------------------------------------------------ Fourth banner ---------------------------------------------//

    const womenCat = (values) => {
        let x = Womenscategory
        let obj = {
            MainCategory: values.MainCategory,
            CategoryName: values.categoryname,
            Bannerurl: values.url,
            bannerImage: img,
            id: makeid(6),
            status: 0,
        }
        console.log(obj)
        x.push(obj)
        setImg([])
        setwomenBanner(false)
        updatewomen(x)
    }

    const updatewomen = (x) => {
        const db = firebaseApp.firestore();
        db.collection('banners').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("banners").doc(doc.ref.id);

                return updateCollection.update({
                    FourthBanner: x
                })
                    .then(() => {
                        toast.success('Banner Changed Successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
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

    // ------------------------------------------------ Fifth  banner ---------------------------------------------//


    const kidsCat = (values) => {
        let x = kidscategory
        let obj = {
            MainCategory: values.MainCategory,
            CategoryName: values.categoryname,
            Bannerurl: values.url,
            bannerImage: img,
            id: makeid(6),
            status: 0,
        }
        console.log(obj)
        x.push(obj)
        kidsbannerclose()
        setImg([])
        upadtekid(x)
    }

    const upadtekid = (x) => {
        const db = firebaseApp.firestore();
        db.collection('banners').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("banners").doc(doc.ref.id);

                return updateCollection.update({
                    FifthBanner: x
                })
                    .then(() => {
                        toast.success('Banner Changed Successfully !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
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


    return (
        <>

            <Layout />
            {showLoader && <Loader />}
            <div className="main-section-left">
                <div className="conainer">
                    <div className="row">
                        <div className="main-section-lefts col-lg-12">
                            <h1>Banner 1:</h1>
                            <button className='btn btn-primary' onClick={handleShow}>
                                Main Banner details
                            </button>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable" direction="horizontal">
                                    {(provided, snapshot) => (
                                        <div className='dnd'
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                        >
                                            {Finalbanner.map((item, index) => (
                                                <Draggable key={'img-' + index} draggableId={'img-' + index} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className="card"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <img src={item.Image} className='img-fluid w-100' width={250} height={350} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <button className='btn btn-primary mt-3' onClick={() => update(Finalbanner)}>Submit banner 1</button>
                        </div>



                        <div className="main-section-lefts col-lg-12">
                            <h1>Text Banner:</h1>
                            <button className='btn btn-primary' onClick={txbannerShow}>
                                Main Banner details
                            </button>
                            <DragDropContext onDragEnd={onDragEnd2}>
                                <Droppable droppableId="droppable" direction="verticle">
                                    {(provided, snapshot) => (
                                        <div className='dnd1'
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                        >
                                            {txtbanners.map((i, index) => (
                                                <Draggable key={'img-' + index} draggableId={'img-' + index} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className="cardss"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <h6 className='text-center'>{i.Bannertext}</h6>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <button className='btn btn-primary mt-3' onClick={() => updatetextbanner(txtbanners)}>Submit banner 2</button>
                        </div>



                        <div className="main-section-lefts col-lg-12">
                            <h1>Men's Category Banner:</h1>
                            <button className='btn btn-primary' onClick={catbannerShow}>
                                Men's  Category Banner
                            </button>
                            <DragDropContext onDragEnd={onDragEnd3}>
                                <Droppable droppableId="droppable" direction="horizontal">
                                    {(provided, snapshot) => (
                                        <div className='dnd'
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                        >

                                            {Categorybanners.map((item, index) => (
                                                <Draggable key={'img-' + index} draggableId={'img-' + index} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className="cards"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <img src={item.bannerImage} className='img-fluid w-100' width={250} height={350} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <button className='btn btn-primary mt-3' onClick={() => updateCategory(Categorybanners)}>Submit banner 3</button>

                        </div>


                        <div className="main-section-lefts col-lg-12">
                            <h1>Women's Category Banner:</h1>
                            <button className='btn btn-primary' onClick={wmbannerShow}>
                                Women's  Category Banner
                            </button>
                            <DragDropContext onDragEnd={onDragEnd4}>
                                <Droppable droppableId="droppable" direction="horizontal">
                                    {(provided, snapshot) => (
                                        <div className='dnd'
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                        >

                                            {Womenscategory.map((item, index) => (
                                                <Draggable key={'img-' + index} draggableId={'img-' + index} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className="cards"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <img src={item.bannerImage} className='img-fluid w-100' width={250} height={350} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <button className='btn btn-primary mt-3' onClick={() => updatewomen(Womenscategory)}>Submit banner 4</button>


                        </div>


                        <div className="main-section-lefts col-lg-12">
                            <h1>kid's Category Banner:</h1>
                            <button className='btn btn-primary' onClick={kidsbannerShow}>
                                kid's  Category Banner
                            </button>
                            <DragDropContext onDragEnd={onDragEnd5}>
                                <Droppable droppableId="droppable" direction="horizontal">
                                    {(provided, snapshot) => (
                                        <div className='dnd'
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                        >

                                            {kidscategory.map((item, index) => (
                                                <Draggable key={'img-' + index} draggableId={'img-' + index} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className="cards"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <img src={item.bannerImage} className='img-fluid w-100' width={250} height={350} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <button className='btn btn-primary mt-3' onClick={() => upadtekid(kidscategory)}>Submit banner 5</button>
                        </div>
                    </div>
                </div>



                <Modal show={showModal} onHide={handleClose} size='xl'>
                    {showLoader && <Loader />}
                    <Modal.Body>
                        <div className="col-lg-12">
                            <Formik
                                innerRef={formikref}

                                initialValues={{ bannername: "", url: "", }}
                                onSubmit={(values, { setSubmitting }) => {
                                    submitdata(values)
                                    clearvalue()
                                }}
                                validationSchema={Yup.object().shape({
                                    bannername: Yup.string()
                                        .required("bannername Required"),
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
                                                    <h1 className='text-center mb-5'>Add Banner Detail</h1>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="bannername">Banner Name:</label>
                                                            <input

                                                                name="bannername"
                                                                type="text"
                                                                placeholder="Enter your bannername"
                                                                value={values.bannername}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={errors.bannername && touched.bannername && "error"}
                                                            />
                                                            {errors.bannername && touched.bannername && (
                                                                <div className="input feedback">{errors.bannername}</div>
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




                                                        <div className="col-lg-12">
                                                            <div className="col-lg-12" style={{ marginTop: "30px" }}>
                                                                <div className="main_content">
                                                                    <div className="container">
                                                                        <label htmlFor="Choose file:">Banner 1 :</label>
                                                                        <label class="mt-3 input-file">
                                                                            <b class="btn btn-primary">
                                                                                <i class="material-icons"></i> Upload Banner </b>
                                                                            <input type="file" class="fileInput" id="yourImgId" onChange={(e) => Imgchange(e.target.files)} /></label>
                                                                        {
                                                                            img ? <img src={img} className='preview' style={{ width: "500px", height: "300px" }} /> : console.log("first")
                                                                        }
                                                                    </div>


                                                                </div>
                                                            </div>
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
                        </div>
                    </Modal.Body>

                </Modal>


                <Modal show={textBanner} onHide={txbannerclose} >
                    <Modal.Body>
                        <Formik
                            innerRef={formikref}

                            initialValues={{
                                Bannertext: "", url: ""
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                submitTextbanner(values)
                                clearvalue()
                            }}
                            validationSchema={Yup.object().shape({
                                Bannertext: Yup.string()
                                    .required("Bannertext Required"),
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
                                                <h1 className='text-center mb-5'>Add Text Banner Detail</h1>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <label htmlFor="Bannertext">Banner text:</label>
                                                        <input

                                                            name="Bannertext"
                                                            type="text"
                                                            placeholder="Enter your Bannertext"
                                                            value={values.Bannertext}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={errors.Bannertext && touched.Bannertext && "error"}
                                                        />
                                                        {errors.Bannertext && touched.Bannertext && (
                                                            <div className="input feedback">{errors.Bannertext}</div>
                                                        )}
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <label htmlFor="url">Redirect Url:</label> <br />
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
                                                    <div className="col-lg-12">
                                                        <label htmlFor="Choose background-color :">Choose background-color :</label> <br />
                                                        <HexColorPicker color={color} onChange={setColor} />
                                                    </div>
                                                    <div className="col-lg-12 mt-5 ">
                                                        <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                            Add
                                                        </button>
                                                        <Button className="btn btn-danger ml-5 w-25" onClick={txbannerclose}>
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

                <Modal show={categoryBanner} onHide={catbannerclose} size='lg' >
                    <Modal.Body>
                        <Formik
                            innerRef={formikref}

                            initialValues={{ categoryname: "", url: "", MainCategory: "" }}
                            onSubmit={(values, { setSubmitting }) => {
                                categorybanner(values)
                                clearvalue()
                            }}
                            validationSchema={Yup.object().shape({
                                categoryname: Yup.string()
                                    .required("bannername Required"),
                                url: Yup.string()
                                    .required("url Required"),
                                MainCategory: Yup.string()
                                    .required("MainCategory Required"),
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
                                                <h1 className='text-center mb-5'>Men's Category Banner Detail</h1>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <label htmlFor="MainCategory">Main Category:</label>
                                                        <input

                                                            name="MainCategory"
                                                            type="text"
                                                            placeholder="Enter your Main Category"
                                                            value={values.MainCategory}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={errors.MainCategory && touched.MainCategory && "error"}
                                                        />
                                                        {errors.MainCategory && touched.MainCategory && (
                                                            <div className="input feedback">{errors.MainCategory}</div>
                                                        )}
                                                    </div>
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
                                                        <label htmlFor="url">Category Url:</label>
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




                                                    <div className="col-lg-12">
                                                        <div className="col-lg-12" style={{ marginTop: "30px" }}>
                                                            <div className="main_content">
                                                                <div className="container">
                                                                    <label htmlFor="Choose file:">Banner 1 :</label>
                                                                    <label class="mt-3 input-file">
                                                                        <b class="btn btn-primary">
                                                                            <i class="material-icons"></i> Upload Banner </b>
                                                                        <input type="file" class="fileInput" id="yourImgId" onChange={(e) => categoryBan(e.target.files)} multiple /></label>
                                                                    {
                                                                        img ? <img src={img} className='preview' style={{ width: "500px", height: "300px" }} /> : console.log("first")
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 mt-5 ">
                                                        <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                            Add
                                                        </button>
                                                        <Button className="btn btn-danger ml-5 w-25" onClick={catbannerclose}>
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


                <Modal show={womenBanner} onHide={wmbannerclose} size='lg' >
                    <Modal.Header >
                        <Modal.Title>Women's Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            innerRef={formikref}

                            initialValues={{ categoryname: "", url: "", MainCategory: "" }}
                            onSubmit={(values, { setSubmitting }) => {
                                womenCat(values)
                                clearvalue()
                            }}
                            validationSchema={Yup.object().shape({
                                categoryname: Yup.string()
                                    .required("bannername Required"),
                                url: Yup.string()
                                    .required("url Required"),
                                MainCategory: Yup.string()
                                    .required("MainCategory Required"),
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
                                                <h1 className='text-center mb-5'> Women's Category Banner Detail</h1>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <label htmlFor="MainCategory">Main Category:</label>
                                                        <input

                                                            name="MainCategory"
                                                            type="text"
                                                            placeholder="Enter your Main Category"
                                                            value={values.MainCategory}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={errors.MainCategory && touched.MainCategory && "error"}
                                                        />
                                                        {errors.MainCategory && touched.MainCategory && (
                                                            <div className="input feedback">{errors.MainCategory}</div>
                                                        )}
                                                    </div>
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
                                                        <label htmlFor="url">Category Url:</label>
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




                                                    <div className="col-lg-12">
                                                        <div className="col-lg-12" style={{ marginTop: "30px" }}>
                                                            <div className="main_content">
                                                                <div className="container">
                                                                    <label htmlFor="Choose file:">Banner 1 :</label>
                                                                    <label class="mt-3 input-file">
                                                                        <b class="btn btn-primary">
                                                                            <i class="material-icons"></i> Upload Banner </b>
                                                                        <input type="file" class="fileInput" id="yourImgId" onChange={(e) => Womencategory(e.target.files)} multiple /></label>
                                                                    {
                                                                        img ? <img src={img} className='preview' style={{ width: "500px", height: "300px" }} /> : console.log("first")
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 mt-5 ">
                                                        <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                            Add
                                                        </button>
                                                        <Button className="btn btn-danger ml-5 w-25" onClick={catbannerclose}>
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                );
                            }}
                        </Formik></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={wmbannerclose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>

                <Modal show={kidsBanner} onHide={kidsbannerclose} size='lg' >
                    <Modal.Header >
                        <Modal.Title>Kids's Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            innerRef={formikref}

                            initialValues={{ categoryname: "", url: "", MainCategory: "" }}
                            onSubmit={(values, { setSubmitting }) => {
                                kidsCat(values)
                                clearvalue()
                            }}
                            validationSchema={Yup.object().shape({
                                categoryname: Yup.string()
                                    .required("bannername Required"),
                                url: Yup.string()
                                    .required("url Required"),
                                MainCategory: Yup.string()
                                    .required("MainCategory Required"),
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
                                                <h1 className='text-center mb-5'> Kid's Category Banner Detail</h1>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <label htmlFor="MainCategory">Main Category:</label>
                                                        <input

                                                            name="MainCategory"
                                                            type="text"
                                                            placeholder="Enter your Main Category"
                                                            value={values.MainCategory}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={errors.MainCategory && touched.MainCategory && "error"}
                                                        />
                                                        {errors.MainCategory && touched.MainCategory && (
                                                            <div className="input feedback">{errors.MainCategory}</div>
                                                        )}
                                                    </div>
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
                                                        <label htmlFor="url">Category Url:</label>
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




                                                    <div className="col-lg-12">
                                                        <div className="col-lg-12" style={{ marginTop: "30px" }}>
                                                            <div className="main_content">
                                                                <div className="container">
                                                                    <label htmlFor="Choose file:">Banner 1 :</label>
                                                                    <label class="mt-3 input-file">
                                                                        <b class="btn btn-primary">
                                                                            <i class="material-icons"></i> Upload Banner </b>
                                                                        <input type="file" class="fileInput" id="yourImgId" onChange={(e) => Womencategory(e.target.files)} multiple /></label>
                                                                    {
                                                                        img ? <img src={img} className='preview' style={{ width: "500px", height: "300px" }} /> : console.log("first")
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 mt-5 ">
                                                        <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                            Add
                                                        </button>
                                                        <Button className="btn btn-danger ml-5 w-25" onClick={catbannerclose}>
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
                    <Modal.Footer>
                        <Button variant="secondary" onClick={kidsbannerclose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>

            </div >
            <ToastContainer />
        </>

    )
}
