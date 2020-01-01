import React, { useState } from 'react'
import { Link, Route } from 'react-router-dom'
import Home from '../../components/home/Home'
import AddProduct from '../add-product/AddProduct'
import AdminNavbar from '../admin-navbar/AdminNavbar'
import ShowProduct from '../show-product/ShowProduct'
import WishList from '../wish-list/WishList'
import MyCart from '../my-cart/MyCart'
import Login from '../login/Login'
import { useContext } from 'react'
import UserContext from '../../context/userauthentication'
import Register from '../sign-up/Register'
import Profile from '../profile/Profile'
import PaymentOption from '../payment-option/PaymentOption'
import MyOrder from '../my-order/MyOrder'

export default function Navbar(props) {
    const context = useContext(UserContext)
    let login =localStorage.getItem("login")
    const [state, setstate] = useState({length:0})
    let passDataLength=(value)=>{
        setstate({
            length:value
        })
    }
    return (
        <>


            <nav className="navbar navbar-expand-lg  navbar-dark bg-primary ">
                <h1><Link to='/' className="navbar-brand ">T-cart</Link></h1>

                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <AdminNavbar passDataLength={state.length} />

                </div>
            </nav>

            <Route exact path='/' component={Home} />
           
            {login==="true" ?
                <>
                    <Route exact path='/show' render={()=><ShowProduct passDataLength={passDataLength}/>} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/wishlist' component={WishList} />
                    <Route exact path='/mycart' component={MyCart} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/pay' component={PaymentOption} />
                    <Route exact path='/myorder' component={MyOrder} />


                </> :
                <>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />

                </>}

                {login==="true" && context.role ?
                <div className=" offset-md-4 offset-1 offset-sm-1 col-10 col-sm-10 col-md-4 mt-3">
                    <Route exact path='/addproduct' component={AddProduct} />
                </div>
                : null
            }






        </>
    )
}
