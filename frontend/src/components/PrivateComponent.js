import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'

function PrivateComponent() {
    const auth = localStorage.getItem('user')
    return auth ? <Outlet/> : <Navigate to="signup"/>  //Outlet is used whether user is present in localStorage it allows to click ,,, other wise Navigate will navigate to signup page
}

export default PrivateComponent