import React, { useContext, useState } from 'react'


export const Context = React.createContext();

export default function Userrole(props) {

    const data = "asd"

    const [urole, setUrole] = useState(1)

    const update = (role) => {
        setUrole(role)
    }

    return (
        <>
            <Context.Provider value={{ fnc: update, urole: urole, data: data }}>
                {props.children}
            </Context.Provider>
        </>
    )
}
