import React, { useRef, useState } from 'react'
import Layout from '../AdminLayout/Layout'
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import firebaseApp from '../../Firebase/firebase';
import Loader from '../../Loader';

let x = []
let imageUrl = []

export default function Addproduct() {


    const [datas, setData] = useState([]);
    const [preview, setPreview] = useState(datas)
    const [img, setImg] = useState([]);
    const [showLoader, setshowLoader] = useState(false);


    const formikref = useRef('')


    const clearvalue = () => {
        const { setFieldValue } = formikref.current;
        setFieldValue('productname', '')
        setFieldValue('skucode', '')
        setFieldValue('category', 'shirt')
        setFieldValue('price', '')

    }

    const grid = 8;

    const [items, setItems] = useState([]);
    const [file, setFile] = useState();

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        background: isDragging ? "blue" : "skyblue",
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "orange" : "blue",
        padding: grid,
    });



    useEffect(() => {
        // setItems(data);
    }, []);

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
            img,
            result.source.index,
            result.destination.index
        );

        console.log({ img });
        setImg(reorderedItems);
    };


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

    const Imgchange = (file) => {
        setshowLoader(true)

        for (let i = 0; i < file.length; i++) {
            UploadImageTOFirebase(file[i])

        }
    }

    // const getBase64 = (file) => {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         x.push(reader.result)
    //         setData(x)

    //     };

    //     setPreview(datas)

    // }




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
            imageUrl.push(url)
            setImg(imageUrl)
            setshowLoader(false)


        }).catch(err => {
            console.log('error caught', err)
        })
    }





    const submitdata = (values) => {
        let obj = {
            prdname: values.productname,
            Skucode: values.skucode,
            category: values.category,
            Image: img,
            price: values.price,
            id: makeid(8),
            status: Number(0)
        }
        console.log(obj)

        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("Products").add(obj)

                .then((docRef) => {
                    console.log("Document written with ID: ", docRef);
                    resolve(docRef.id);
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
                    initialValues={{ productname: "", skucode: "", category: "", price: "" }}
                    innerRef={formikref}
                    onSubmit={(values, { setSubmitting }) => {
                        submitdata(values)
                        clearvalue()
                    }}
                    validationSchema={Yup.object().shape({
                        productname: Yup.string()
                            .required("productname Required"),
                        skucode: Yup.string()
                            .required("skucode Required"),
                        category: Yup.string()
                            .required("category Required"),
                        price: Yup.string()
                            .required("price Required")

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
                                        <h1 className='text-center mb-5'>Add Product</h1>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="productname">Product Name:</label>
                                                <input

                                                    name="productname"
                                                    type="text"
                                                    placeholder="Enter your productname"
                                                    value={values.productname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.productname && touched.productname && "error"}
                                                />
                                                {errors.productname && touched.productname && (
                                                    <div className="input feedback">{errors.productname}</div>
                                                )}
                                            </div>

                                            <div className="col-lg-6">
                                                <label htmlFor="skucode">Sku Code:</label>
                                                <input
                                                    name="skucode"
                                                    type="text"
                                                    placeholder="Enter your skucode"
                                                    value={values.skucode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.skucode && touched.skucode && "error"}
                                                />
                                                {errors.skucode && touched.skucode && (
                                                    <div className="input feedback">{errors.skucode}</div>
                                                )}
                                            </div>

                                            <div className="col-lg-6 mt-5">
                                                <label htmlFor="Category">Category:</label>

                                                <select
                                                    name="category"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.category && touched.category && "error"}
                                                >
                                                    <option value="" label="Select a color">
                                                        Select a color{" "}
                                                    </option>
                                                    <option value="Tshirt" label="T-shirt">
                                                        {" "}
                                                        T-shirt
                                                    </option>
                                                    <option value="Shirt" label="Shirt">
                                                        Shirt
                                                    </option>
                                                    <option value="shoes" label="shoes">
                                                        shoes
                                                    </option>
                                                </select>
                                                {errors.category && touched.category && (
                                                    <div className="input feedback">{errors.category}</div>
                                                )}

                                            </div>

                                            <div className="col-lg-6 mt-5">
                                                <label htmlFor="price">price:</label>
                                                <input

                                                    name="price"
                                                    type="number"
                                                    placeholder="Enter your price"
                                                    value={values.price}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={errors.price && touched.price && "error"}
                                                />
                                                {errors.price && touched.price && (
                                                    <div className="input feedback">{errors.price}</div>
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

                                                    </div>
                                                    <DragDropContext onDragEnd={onDragEnd}>
                                                        <Droppable droppableId="droppable" direction="horizontal">
                                                            {(provided, snapshot) => (
                                                                <div className='dnd'
                                                                    {...provided.droppableProps}
                                                                    ref={provided.innerRef}
                                                                    style={getListStyle(snapshot.isDraggingOver)}
                                                                >
                                                                    {img.map((item, index) => (
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
                                                                                    <img src={item} className='img-fluid' width={100} height={100} />
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    ))}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </DragDropContext>
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mt-5 ">
                                                <button type="submit" className="btn btn-primary w-25" disabled={isSubmitting}>
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </>
                        );
                    }}
                </Formik>







            </div>
        </>
    )
}
