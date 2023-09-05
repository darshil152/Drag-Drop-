import React, { useState } from 'react'
import Layout from '../AdminLayout/Layout'
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import firebaseApp from '../../Firebase/firebase';
import { useEffect } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';


export default function Product() {

    useEffect(() => {
        getdata()
    }, [])

    const [data, setData] = useState([])

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
            name: "category",
            label: "category",
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
            name: "action",
            label: "action",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>

                    </>

                )
            }
        },


    ];

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })

    const options = {

        selectableRowsHideCheckboxes: true,
        filterType: "dropdown",
        responsive: "scroll",
        direction: 'desc',
        sortOrder: {
            name: 'date',
            direction: 'des'
        },

    };

    return (
        <>
            <Layout />
            <div className="main-section-left">
                <h1 className='text-center'>All Products</h1>

                <div className="container">
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
            </div>

        </>
    )
}
