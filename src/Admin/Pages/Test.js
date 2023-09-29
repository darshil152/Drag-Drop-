import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import firebaseApp from '../../Firebase/firebase';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import "./Test.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import ReactDOM from "react-dom";
import { MultiSelect } from "react-multi-select-component";

export default function Test() {

    const [data, setData] = useState([])
    const [brand, setbrand] = useState([])

    const [seconddata, setseconddata] = useState([])
    const [thirdddata, setthirdddata] = useState([])
    const [fourthddata, setfourthddata] = useState([])
    const [Fifththddata, setFifththddata] = useState([])
    const [brandstate, setBrandstate] = useState([])

    useEffect(() => {

        getdata()
        getbrand()
    }, [])




    var settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    var settingss = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };



    const getdata = () => {
        let x = []
        let y = []
        let z = []
        let a = []
        let b = []

        const db = firebaseApp.firestore();
        db.collection('banners').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                y.push(doc.data().SecondBanner)
                x.push(doc.data().FirstBanner)
                z.push(doc.data().ThirdBanner)
                a.push(doc.data().FourthBanner)
                b.push(doc.data().FifthBanner)

                setData(x)
                setseconddata(y)
                setthirdddata(z)
                setfourthddata(a)
                setFifththddata(b)
            })

        }).catch(err => {
            console.error(err)
        });
    }


    const getbrand = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('Brands').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                setbrand(x)
            })

        }).catch(err => {
            console.error(err)
        });
    }

    const todata = (i) => {
        window.location.href = i.Url
    }
    const tourl = (i) => {
        window.location.href = i.Bannerurl
    }


    let du = ''
    const checks = (e) => {



        du = e.target.value

        let x = brandstate
        var values = [];


        var checkboxes = document.getElementsByName('language');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked == true) {
                values.push(checkboxes[i].value)
            }
            console.log(values)
        }


        const db = firebaseApp.firestore();
        db.collection('Brands').where("BrandName", "==", values).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                console.log(doc.data(), "Array value")
                // x.push(doc.data())
                // setBrandstate(x) 
            })

        }).catch(err => {
            console.error(err)
        });

    }





    return (


        <div className='container'>
            {
                data.length == 0 ?
                    <div className="">
                        <div className="mt-5">
                            <Skeleton baseColor="#c6c6c6" count={1} height={710} />
                            <Skeleton baseColor="#c6c6c6" count={1} height={33} />
                            <Skeleton baseColor="#c6c6c6" count={1} height={208} />
                            <Skeleton baseColor="#c6c6c6" count={1} height={208} />
                            <Skeleton baseColor="#c6c6c6" count={1} height={208} />

                        </div>
                    </div>
                    :
                    <div className="">
                        <Slider {...settings}>
                            {
                                data[0] && data[0].length > 0 ? data[0].map((i) => {
                                    return (
                                        <div className='text-center'>
                                            <div className="row">
                                                <div className="col-lg-12 mt-5 ">
                                                    <img src={i.Image} className='img-fluid w-100' onClick={() => todata(i)} />
                                                </div>
                                            </div>
                                        </div >
                                    )
                                }) : console.log("first")
                            }
                        </Slider>
                        <div className="w-100">
                            <Slider {...settingss}>
                                {
                                    seconddata[0] && seconddata[0].length > 0 ? seconddata[0].map((i) => {
                                        return (

                                            < div className='text-center' >
                                                <div className="row">
                                                    <div className="col-lg-12 mt-5 " >
                                                        <h3 className='p-2' style={{ backgroundColor: i.bgcolor, color: "white" }} onClick={() => tourl(i)}>{i.Bannertext} </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : console.log("first")
                                }
                            </Slider >
                        </div>
                        <div className="container text-center mt-5">
                            <h1 className='text-left'>Men's Category</h1>
                            <div className="row">

                                {
                                    thirdddata[0] && thirdddata[0].length > 0 ? thirdddata[0].map((i) => {
                                        return (

                                            <div className="col-lg col-4 p-0 text-center mt-3 " >
                                                <img src={i.bannerImage
                                                } className='img-fluid w-100' />
                                                <h6 className='mt-2'>{i.CategoryName}</h6>
                                            </div>

                                        )
                                    }) : console.log("first")
                                }
                            </div>
                        </div>

                        <div className="container text-center mt-5">
                            <h1 className='text-left'>Women's Category</h1>
                            <div className="row">
                                {
                                    fourthddata[0] && fourthddata[0].length > 0 ? fourthddata[0].map((i) => {
                                        return (

                                            <div className="col-lg col-4 p-0 text-center mt-3 " >
                                                <img src={i.bannerImage
                                                } className='img-fluid w-100' />
                                                <h6 className='mt-2'>{i.CategoryName}</h6>

                                            </div>
                                        )
                                    }) : console.log("first")
                                }
                            </div>
                        </div>
                        <div className="container text-center mt-5">
                            <h1 className='text-left'>kid's Category</h1>
                            <div className="row">
                                {
                                    Fifththddata[0] && Fifththddata[0].length > 0 ? Fifththddata[0].map((i) => {
                                        return (

                                            <div className=" col-lg col-4 p-0 text-center mt-3 " >
                                                <img src={
                                                    i.bannerImage
                                                } className='img-fluid w-100' />
                                                <h6 className='mt-2' style={{ fontSize: "15px" }}>{i.CategoryName}</h6>

                                            </div>
                                        )
                                    }) : console.log("first")
                                }
                            </div>
                        </div>
                        <div className="container text-center mt-5">
                            <h1 className='text-left'>Top Brand's</h1>
                            <div className="row">
                                {
                                    brand && brand.length > 0 ? brand.map((i) => {
                                        return (

                                            <div className=" col-lg col-4 p-0 text-center mt-3 " >
                                                <img src={
                                                    i.BrandImage
                                                } className='img-fluid w-100' />

                                            </div>
                                        )
                                    }) : console.log("first")
                                }
                            </div>
                        </div>





                    </div>


            }


        </div >
    )
}
