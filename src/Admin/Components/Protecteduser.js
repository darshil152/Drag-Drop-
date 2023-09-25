import React, { Component } from 'react'
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom"
import { Context } from '../../Context/Userrole';


export default function Protecteduser({ children }) {
    let location = useLocation();

    return (
        <>
            <Context.Consumer>
                {value => <>
                    {value.userRole == 0 ? children : <Navigate to="/" state={{ from: location }} replace />}</>}
            </Context.Consumer>)
        </>
    )
}

