import React, { useState } from 'react'
import Layout from '../AdminLayout/Layout'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MUIDataTable from "mui-datatables";
import firebaseApp from '../../Firebase/firebase';
import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, Button } from "react-bootstrap";
import parse from 'html-react-parser';


let xy = []

export default function Product() {

    useEffect(() => {
        getdata()
    }, [])

    const parse = require('html-react-parser');


    const [data, setData] = useState([])
    const [preview, setPreview] = useState(xy)
    const [mainimg, setImg] = useState('')

    const [showModal, setShow] = useState(false);
    const handleClose = () => {
        setImg('')
        setShow(false);
    }

    const handleShow = () => {

        setShow(true);
    }

    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('Products').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                setData(x)
            })
        }).catch(err => {
            console.error(err)
        });
    }


    const columns = [

        {
            name: "Image",
            label: "Image",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img src={value} width={100} />
                )

            }
        },
        {
            name: "prdname",
            label: "prdname",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Maincat",
            label: "Maincat",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Skucode",
            label: "Skucode",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "price",
            label: "price",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "description",
            label: "description",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <p className='description'>{parse(value)}</p>
                )
            }
        },
        {
            name: "status",
            label: "status",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (

                    <label class="switch">
                        <input type="checkbox" checked={value} onChange={(e) => changetoggle(e, tableMeta)} />
                        <span class="slider round"></span>
                    </label>
                )
            }
        },

        {
            name: "id",
            label: "action",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => previews(value)}>Preview</Dropdown.Item>
                                    <Dropdown.Item >Edit </Dropdown.Item>
                                    <Dropdown.Item onClick={() => deletedata(tableMeta)}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </>
                )
            }
        },
    ];


    const changetoggle = (e, tableMeta) => {
        console.log(e, tableMeta.rowData)
        updatestatus(e, tableMeta.rowData[7])
    }

    const updatestatus = (e, x) => {
        let status = e.target.checked == true ? 1 : 0;
        const db = firebaseApp.firestore();
        db.collection('Products').where("id", "==", x).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("Products").doc(doc.ref.id);
                return updateCollection.update({
                    status: Number(status)
                })
                    .then(() => {
                        getdata()
                        console.log("Document successfully updated!");
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

    const previews = (value) => {

        let x = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value) {
                xy = data[i]
                x.push(data[i])
                setPreview(x)
                setImg(x[0].Image[0])
            }
        }
        handleShow()
        console.log(preview)

    }



    const deletedata = (tableMeta) => {
        let filterdata = data.filter((i) => i.id != tableMeta.rowData[6])
        // updateproducts(filterdata, tableMeta.rowData[6])
    }


    const updateproducts = (filterdata, id) => {
        const db = firebaseApp.firestore();
        db.collection('Products').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                db.collection("Products").doc(doc.ref.id).delete().then(() => {
                    getdata()

                }).catch((error) => {
                    console.error("Error removing document: ", error);
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

    const changeimg = (index) => {
        setImg(index)
        const object = document.getElementById('images')
        object.style.transition = 'all 1s ease'
    }

    return (
        <>
            <Layout />
            <div className="main-section-left">
                <h1 className='text-center'>All Products</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 mt-5">
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"All Product"}
                                        data={data}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                    </div>
                </div>
                <Modal show={showModal} onHide={handleClose} size="lg">
                    <Modal.Header>
                        <Modal.Title>
                            Product Preview
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div class="containers">
                            <div class="left-side">
                                {
                                    preview && preview.length > 0 ? <img id="images" src={mainimg} className='img-fluid' /> : console.log("first")
                                }
                                <div className="mt-5">
                                    {
                                        preview && preview.length > 0 && preview[0].Image.map((index) => {
                                            return (
                                                <>
                                                    <img src={index} style={{ width: "50px", height: "60px" }} onClick={() => changeimg(index)} />
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div class="right-side">
                                <p id="perfume">
                                    {
                                        preview && preview.length > 0 ? preview[0].category : console.log(" first")
                                    }
                                </p>
                                <h1 id="header">{
                                    preview && preview.length > 0 ? preview[0].prdname
                                        : console.log(" first")
                                }</h1>
                                <p id="description"><b>Sku Code</b> : {
                                    preview && preview.length > 0 ? preview[0].Skucode

                                        : console.log(" first")
                                }
                                </p>

                                <p id="description" className='mt-4'><b>Size</b> : {
                                    preview && preview.length > 0 ? preview[0].size.map((i) => {
                                        return (
                                            <span className='' id="description">{i.value}</span>
                                        )
                                    })

                                        : console.log(" first")
                                }
                                </p>

                                <div class="price">
                                    <h1 id="number-discount"> ₹ {
                                        preview && preview.length > 0 ? preview[0].price

                                            : console.log(" first")
                                    }</h1>
                                </div>
                                <p id="description"> <b>Description</b> : {
                                    preview && preview.length > 0 ?
                                        parse(preview[0].description)

                                        : console.log(" first")
                                }
                                </p>



                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>






        </>
    )
}
