import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import firebaseApp from '../Firebase/firebase'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../CSS/Home.css"
import Slider from 'react-slick';
import menu from "../Assets/menu.png"
import logo from "../Assets/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUser, faHeart, faL, faGear, faCopyright, } from "@fortawesome/free-solid-svg-icons";

import prd1 from "../Assets/img-1.jpg"
import prd2 from "../Assets/img-2.jpg"
import prd3 from "../Assets/img-4.jpg"

export default function Home() {

    useEffect(() => {

        getdata()
        getbrand()

    }, [])


    const [data, setData] = useState([])
    const [brand, setbrand] = useState([])

    const [seconddata, setseconddata] = useState([])
    const [thirdddata, setthirdddata] = useState([])
    const [fourthddata, setfourthddata] = useState([])
    const [Fifththddata, setFifththddata] = useState([])
    const [brandstate, setBrandstate] = useState([])



    // var settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    // };
    // var settingss = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    // };

    const settings = {
        dots: true,
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


    return (
        <>

            <div className="header-navigation-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h6>
                                Join our showroom and get 25 % off ! Coupon code : Bangbang45
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="navbar navbar-expand-lg navbar-light bg-white">



                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <img src={menu} width={50} height={50} />
                        </li>
                        <input class="form-control mt-2   mr-sm-2" type="search" placeholder="Search for..." aria-label="Search" style={{ borderRadius: "15px" }} />

                    </ul>
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link  mt-2 ml-3" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link  mt-2 ml-3" href="#">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link  mt-2 ml-3" href="#">Shop</a>
                        </li>
                        <li class="nav-item">
                            <img src={logo} className='ml-3 img-fluid' height={100} width={150} />
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link  mt-2 ml-3" href="#">Page <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link  mt-2 ml-3" href="#">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link  mt-2 ml-3" href="#">Contact</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active ml-5">
                            <FontAwesomeIcon icon={faUser} />
                        </li>
                        <li class="nav-item active ml-5">
                            <FontAwesomeIcon icon={faHeart} />
                        </li>
                        <li class="nav-item active ml-5">
                            <FontAwesomeIcon icon={faBagShopping} />
                        </li>
                    </ul>

                </div>
            </nav>

            <div className='container'>
                <Slider {...settings}>
                    {
                        data[0] && data[0].length > 0 ? data[0].map((i) => {
                            return (
                                <div className='text-center'>
                                    <div className="row">
                                        <div className="col-lg-12 mt-5 ">
                                            <img src={i.Image} className='img-fluid w-100' />
                                        </div>
                                    </div>
                                </div >
                            )
                        }) : console.log("first")
                    }
                </Slider>
            </div>

            <div className="container mt-5" style={{ height: "auto" }}>
                <div className="row">
                    <div className="col-lg-4 ">
                        <img className='img-fluid' src={prd1} />
                        <p className='mt-3 text-center'>Fashion tops</p>
                        <h6 className='text-center' >$129</h6>
                    </div>
                    <div className="col-lg-4">
                        <img className='img-fluid' src={prd2} />
                        <p className='mt-3 text-center'>Women's T-shirt</p>
                        <h6 className='text-center' >$129</h6>


                    </div><div className="col-lg-4">
                        <img className='img-fluid' src={prd3} />
                        <p className=' mt-3 text-center'>Stylish Coat tops</p>
                        <h6 className='text-center' >$129</h6>



                    </div>
                </div>
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





        </>
    )
}
