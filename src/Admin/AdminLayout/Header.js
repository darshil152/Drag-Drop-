import React from 'react'
import menu from "../Assets/menu.png"

export default function Header() {




    const showsidebar = () => {
        document.getElementById('menu').style.left = "0px"
        document.getElementById('overlay').click()
    }


    return (
        <>
            <nav class="navbar navbar-light bg-light shadow">
                <a class="navbar-brand" href="#">
                    <img src={menu} className='img-fluid ' width="50" height="30" alt="" onClick={showsidebar} />
                </a>
            </nav>
        </>
    )
}
