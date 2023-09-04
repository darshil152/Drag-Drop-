import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout(props) {
    return (
        <div>

            <Header />
            {props.children}
            <Sidebar />

        </div>
    )
}
