import React, { useRef, useState } from 'react'
import Layout from '../AdminLayout/Layout'
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import firebaseApp from '../../Firebase/firebase';
import Loader from '../../Loader';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MultiSelect } from "react-multi-select-component";

let x = []
let imageUrl = []

export default function Addproduct() {


    const [datas, setData] = useState([]);
    const [showLoader, setshowLoader] = useState(false);
    const [preview, setPreview] = useState(datas)
    const [img, setImg] = useState([]);
    const [description, setDescriptoon] = useState('')
    const [showRadio, setShowRadio] = useState(false)
    const [inputs, setinput] = useState(false)
    const [input2, setinput2] = useState(false)

    const [subpush, setsubpush] = useState('')
    const [deoendence, setdependence] = useState([])
    const [childdependence, setChilddependence] = useState([])
    const [Size, setSize] = useState('')

    const [childpush, setChildpish] = useState('')
    const [ThirdCategoty, setThirdCategory] = useState('')


    const [mainCat, setMainCat] = useState([])
    const [subCat, setsubCat] = useState([])
    const [ChildCat, setChildCat] = useState([])
    const [Brands, setBrands] = useState([])
    const [selectBrand, setselectBrand] = useState('')

    const [Radiovalue, setRadiovalue] = useState("")


    const formikref = useRef('')


    useEffect(() => {
        getdata()
        getBrands()
    }, []);


    const shoesSize = [
        { label: "7 ", value: "7" },
        { label: "8 ", value: "8" },
        { label: "8.5 ", value: "8.5" },
        { label: "9 ", value: "9" },
        { label: "9.5 ", value: "9.5" },
        { label: "10 ", value: "10" },

    ];



    const [selected, setSelected] = useState([]);

    const Clothsize = [
        { label: "S ", value: "S" },
        { label: "L", value: "L" },
        { label: "XXl ", value: "XXl" },
        { label: "XL ", value: "Xl" },
        { label: "XXXl", value: "XXXl" },

    ];

    const getBrands = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('Brands').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                setBrands(x)
            })

        }).catch(err => {
            console.error(err)
        });
    }


    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('Setting').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setChildCat(doc.data().ChildCategory)
                setsubCat(doc.data().SubCategory)
                setMainCat(doc.data().MainCategory)
            })

        }).catch(err => {
            console.error(err)
        });
    }


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


    const changebrand = (e) => {
        setselectBrand(e.target.value)
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
            size: selected,
            Image: img,
            description: description,
            price: values.price,
            id: makeid(8),
            status: Number(0),
            brand: selectBrand,
            Maincat: subpush,
            SubCate: childpush,
            childCat: ThirdCategoty,
        }
        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("Products").add(obj)

                .then((docRef) => {
                    console.log("Document written with ID: ", docRef);
                    resolve(docRef.id);
                    setImg([])

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


    const showinput = () => {
        setinput(true)
        console.log(inputs)
        document.getElementById('showfield').style.display = "none"
    }

    const showinputtwo = () => {
        if (Brands.length > 0) {
            setinput2(true)
        } else {
            toast.warn(<span style={{ color: "#757575" }}>Please add your brand <a href={"/brands"} style={{ textDecoration: "none", fontWeight: 'bold' }}> here </a>. </span>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        document.getElementById('showfieldtwo').style.display = "none"
    }



    const saveradio = (e) => {
        setRadiovalue(e.target.value)
    }

    const selectMain = (e) => {
        setsubpush(e.target.value)
        findcate(e.target.value)
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

    const selectSub = (e) => {
        setChildpish(e.target.value)
        let x = []
        let flag = false
        for (let i = 0; i < ChildCat.length; i++) {
            console.log(ChildCat)
            if (ChildCat[i].SubCategory == e.target.value) {
                x.push(ChildCat[i])
                flag = true
            }

        } if (flag) {
            setChilddependence(x)
        } else {
            setChilddependence([])
        }
    }

    const thirdCategory = (e) => {
        setThirdCategory(e.target.value)

    }




    return (
        <>

            <Layout />
            {showLoader && <Loader />}


            <div className="main-section-left">



                <Formik
                    initialValues={{ productname: "", skucode: "", price: "", }}
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
                        price: Yup.string()
                            .required("price Required"),


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

                                            <div className="col-lg-6" style={{ marginTop: "30px" }}>
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

                                            <div className="col-lg-12 mt-5">
                                                <label htmlFor="description">description:</label>
                                                <ReactQuill theme="snow" value={description} onChange={setDescriptoon} />
                                            </div>


                                            <div className="col-lg-6 mt-3">
                                                <label htmlFor="description">Add Size:</label><br />
                                                <a onClick={showinput} className='btn btn-primary text-white' id='showfield'>+ </a>
                                                {
                                                    inputs == true ?
                                                        <div className='check d-flex justify-content-center' >
                                                            <div className='ml-3'>
                                                                Shoes Size:<input type="radio" value="shoes" name='shoes' onChange={saveradio} />
                                                            </div>
                                                            <div className='ml-3'>
                                                                Cloth Size  <input type="radio" value="Cloth" name='shoes' onChange={saveradio} />
                                                            </div>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                            <div className="col-lg-6 mt-5">
                                                {

                                                    Radiovalue == "shoes" ?
                                                        <div>
                                                            <h1>Select Fruits</h1>
                                                            <pre>{JSON.stringify(selected)}</pre>
                                                            <MultiSelect
                                                                options={shoesSize}
                                                                value={selected}
                                                                onChange={setSelected}
                                                                labelledBy="Select"
                                                            />
                                                        </div>
                                                        :

                                                        Radiovalue == "Cloth" ?
                                                            <>
                                                                <pre>{JSON.stringify(selected)}</pre>

                                                                <MultiSelect
                                                                    options={Clothsize}
                                                                    selected={selected}
                                                                    onChange={setSelected}
                                                                    labelledBy={"Select"}
                                                                />
                                                            </>
                                                            : null
                                                }
                                            </div>


                                            <div className="col-lg-4 mt-5 ">
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

                                            <div className="col-lg-4 mt-5 mb-3">
                                                <label className="lbl-comn-info">Choose Sub-Category : <span className="text-danger"></span></label>
                                                <select className="selecttype"
                                                    name="Maincategory"
                                                    onChange={selectSub}
                                                >
                                                    <option >Select the Category :</option>

                                                    {deoendence && deoendence.length > 0 && deoendence.map((i) => (
                                                        <option value={i.id}>{i.CateName}</option>
                                                    ))}

                                                </select>
                                            </div>

                                            <div className="col-lg-4 mt-5 mb-3">
                                                <label className="lbl-comn-info">Choose Child Category : <span className="text-danger"></span></label>
                                                <select className="selecttype"
                                                    name="Maincategory"
                                                    onChange={thirdCategory}

                                                >
                                                    <option>Select the Category :</option>

                                                    {childdependence && childdependence.length > 0 && childdependence.map((i) => (
                                                        <option value={i.id}>{i.CateName}</option>
                                                    ))}

                                                </select>
                                            </div>

                                            <div className="col-lg-6">
                                                <label className="lbl-comn-info">Choose Brand : <span className="text-danger"></span></label><br />

                                                <a onClick={showinputtwo} className='btn btn-primary text-white' id='showfieldtwo'>+ </a>
                                                {
                                                    input2 == true ?
                                                        <>
                                                            <select className="selecttype"
                                                                name="Maincategory"
                                                                onChange={changebrand}
                                                            >
                                                                <option >Select the Category :</option>
                                                                {Brands && Brands.length > 0 && Brands.map((i) => (
                                                                    <option value={i.id}>{i.BrandName}</option>
                                                                ))}
                                                            </select>
                                                        </>
                                                        : null
                                                }
                                            </div>


                                            <div className="col-lg-12 mt-5 mb-3">

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
            </div >
            <ToastContainer />
        </>
    )
}
