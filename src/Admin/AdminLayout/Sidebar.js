import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faTicket, faCalendarDays, faLock, faClock, faUser, faPerson, faBagShopping, faGaugeHigh, faL, faGear, faCopyright, } from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/logo.png"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Sidebar() {


    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isprofile, setProfile] = useState(false)
    const [isDashboard, setDashboard] = useState(false)
    const [isPlusMinus, setPlusMinus] = useState(false)
    const [isChartSimple, setChartSimple] = useState(false)
    const [isLogout, setLogout] = useState(false)
    const [overlay, setOverlay] = useState(false)



    const handleTrigger = () => {
        if (isOpen) {
            setIsOpen(!isOpen);

        } else {
            setIsOpen(!isOpen);

        }
    };

    const handleLogout = () => {
        localStorage.removeItem("Login");
        navigate("/signin");
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const profileEnter = () => {
        setProfile(true)
    }
    const PlusMinusEnter = () => {
        setPlusMinus(true)
    }
    const DashboardEnter = () => {
        setDashboard(true)
    }
    const ChartSimpleEnter = () => {
        setChartSimple(true)
    }
    const LogoutEnter = () => {
        setLogout(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const profileLeave = () => {
        setProfile(false)
    }
    const PlusMinusLeave = () => {
        setPlusMinus(false)
    }
    const DashboardLeave = () => {
        setDashboard(false)
    }
    const ChartSimpleLeave = () => {
        setChartSimple(false)
    }
    const LogoutLeave = () => {
        setLogout(false)
    }

    const show = () => {
        if (overlay) {
            document.getElementById('menu').style.left = "-270px"
            setOverlay(false)
        } else {
            setOverlay(true)
        }
    }

    return (
        <>
            <div className={overlay ? 'overlay' : 'overlay d-none'} id="overlay" onClick={show}></div>
            <div className='sidebar-main-section shadow' id="menu">
                <img src={logo} className='img-fluid ml-3 mt-3' width="200" height="75" alt="" />
                <div className="page m-3 ml-3">
                    <div className="my"></div>

                    <div className={`sidebar-backdrop ${isOpen ? "sidebar-backdrop--open" : ""}`} onClick={() => setIsOpen(false)}></div>

                    <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>

                        <Link className="d-flex mt-4 anchor3" to="/addproduct" onClick={() => setIsOpen(false)}>
                            <div className="sidebar-position" onMouseEnter={DashboardEnter}
                                onMouseLeave={DashboardLeave} title="">
                                {isDashboard ? <FontAwesomeIcon icon={faGaugeHigh} shake /> : <FontAwesomeIcon icon={faGaugeHigh} />}
                                <span>Add Product</span>
                            </div>
                        </Link>


                        <Link className="d-flex mt-4  anchor3" to="/product" onClick={() => setIsOpen(false)}>
                            <div className="sidebar-position" onMouseEnter={ChartSimpleEnter}
                                onMouseLeave={ChartSimpleLeave}>
                                {isChartSimple ? <FontAwesomeIcon icon={faCalendarDays} shake /> : <FontAwesomeIcon icon={faCalendarDays} />}
                                <span>Product</span>
                            </div>
                        </Link>

                        <Link className="d-flex mt-4 anchor3" to="/banner" onClick={() => setIsOpen(false)}>
                            <div className="sidebar-position" onMouseEnter={PlusMinusEnter}
                                onMouseLeave={PlusMinusLeave}>
                                {isPlusMinus ? <FontAwesomeIcon icon={faUser} shake /> : <FontAwesomeIcon icon={faUser} />}
                                <span>Banners</span>
                            </div>
                        </Link>

                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Diesel
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item >Preview</Dropdown.Item>
                                <Dropdown.Item >Delete</Dropdown.Item>
                                <Dropdown.Item >Edit</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>



                        <Link className="d-flex mt-4 anchor3" to="/admin">
                            <div className="sidebar-position" onMouseEnter={profileEnter}
                                onMouseLeave={profileLeave}>
                                {isprofile ? <FontAwesomeIcon icon={faLock} shake /> : <FontAwesomeIcon icon={faLock} />}
                                <span>Orders</span>
                            </div>
                        </Link>


                        <Link className="d-flex mt-4 anchor3" to="/timeslot" onClick={() => setIsOpen(false)}>
                            <div className="sidebar-position" onMouseEnter={ChartSimpleEnter}
                                onMouseLeave={ChartSimpleLeave}>
                                {isChartSimple ? <FontAwesomeIcon icon={faClock} shake /> : <FontAwesomeIcon icon={faClock} />}
                                <span>Return Orders</span>
                            </div>
                        </Link>



                        <Link className="d-flex  mt-4 anchor3" to="/coupon"    >
                            <div className="sidebar-position" onMouseEnter={profileEnter}
                                onMouseLeave={profileLeave}>
                                {isprofile ? <FontAwesomeIcon icon={faTicket} shake /> : <FontAwesomeIcon icon={faTicket} />}
                                <span>Coupons</span>
                            </div>
                        </Link>

                        <Link className="d-flex mt-4 anchor3" to="/allorder"    >
                            <div className="sidebar-position" onMouseEnter={profileEnter}
                                onMouseLeave={profileLeave}>
                                {isprofile ? <FontAwesomeIcon icon={faBagShopping} shake /> : <FontAwesomeIcon icon={faBagShopping} />}
                                <span>Cart</span>
                            </div>
                        </Link>


                        <Link className="d-flex mt-4 anchor3" to="/allorder"    >
                            <div className="sidebar-position" onMouseEnter={profileEnter}
                                onMouseLeave={profileLeave}>
                                {isprofile ? <FontAwesomeIcon icon={faPerson} shake /> : <FontAwesomeIcon icon={faPerson} />}
                                <span>Users</span>
                            </div>
                        </Link>
                        <Link className="d-flex mt-4 anchor3" to="/setting"    >
                            <div className="sidebar-position" onMouseEnter={profileEnter}
                                onMouseLeave={profileLeave}>
                                {isprofile ? <FontAwesomeIcon icon={faGear} shake /> : <FontAwesomeIcon icon={faGear} />}
                                <span>settings</span>
                            </div>
                        </Link>
                        <Link className="d-flex mt-4 anchor3" to="/brands"    >
                            <div className="sidebar-position" onMouseEnter={profileEnter}
                                onMouseLeave={profileLeave}>
                                {isprofile ? <FontAwesomeIcon icon={faCopyright} shake /> : <FontAwesomeIcon icon={faCopyright} />}
                                <span>Brands</span>
                            </div>
                        </Link>

                        <i class="bi bi-card-heading"></i>
                    </div>
                </div>
            </div >
        </>
    )
}
