import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/userauthentication'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import Badge from '@material-ui/core/Badge';

export default function AdminNavbar(props) {
    const context = useContext(UserContext)
    let login = localStorage.getItem("login")

    return (
        <>
            {login === "true" ?
                <>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {context.role ?
                            <li className="nav-item active">
                                <Link to='/addproduct' className="nav-link" >Add Product </Link>
                            </li> : null}

                        <li className="nav-item active">
                            <Link to='/show' className="nav-link" >Product</Link>
                        </li>

                    </ul>
                    <ul className="navbar-nav  mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link to='/profile' className="nav-link" ><AccountCircleIcon />My Account</Link>

                        </li>
                        <li className="nav-item active">
                            <Link to='/wishlist' className="nav-link" >
                                <Badge badgeContent={props.passDataLength} color="error">
                                    <i className="fas fa-heart"></i>
                                
                                My Wish List
                                </Badge>
                                </Link>

                        </li>
                        <li className="nav-item active">
                            <Link to='/mycart' className="nav-link" >
                            <Badge badgeContent={0} color="error">
                            <i className="fas fa-cart-plus"></i>
                            My Cart
                                </Badge>
                                </Link>

                        </li><li className="nav-item active">
                            <Link to='/myorder' className="nav-link" >
                                <BookIcon />My Order</Link>

                        </li>
                        <li className="nav-item active">
                            <Link
                                onClick={() => context.authentication(false)}

                                to='/login' className="nav-link" >
                                <i className="fas fa-user-circle"></i>Logout</Link>

                        </li>

                    </ul>
                </>
                :
                <ul className="navbar-nav ml-auto  mt-2 mt-lg-0">

                    <li className="nav-item active">
                        <Link
                            to='/login'
                            className="nav-link" >
                            <i className="fas fa-user-circle"></i>Login</Link>

                    </li>
                    <li className="nav-item active">
                        <Link
                            to='/register'
                            className="nav-link" >
                            <i className="fas fa-user-circle"></i>Register</Link>

                    </li>

                </ul>}
        </>
    )
}
