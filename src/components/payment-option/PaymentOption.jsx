import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button, CircularProgress } from '@material-ui/core'

export default function PaymentOption(props) {
    let userId = localStorage.getItem("userId")

    let price = localStorage.getItem("cartData")
    let total = Number(price) + 50
    let productData = {
        allData: []
    }

    const [getData, setData] = useState(productData)
    const [getLoding, setLoding] = useState({ loading: false })

    let getAllAccount = async () => {
        try {
            const url = 'https://react-shoping-cart-66dac.firebaseio.com/cart-list/'+userId+'.json'
            let response = await Axios.get(url)
            let newData = []
            for (const key in response.data) {
                console.log(response.data[key].userId);

                if (response.data[key].userId === userId) {
                    newData.push({
                        ...response.data[key],
                        id: key
                    })
                }
            }
            if (response.status === 200) {


                setData({
                    ...getData,
                    allData: newData,

                })



            }
        } catch (error) {

        }

    }
    useEffect(() => {
        getAllAccount()

    }, [])
    let handleClick = () => {
        let myOrder = getData.allData
        setLoding({
            loading:true
        })
        myOrder.map(value => {
            changeColor(value)
            return addToCart(value)
        })

    }
    let addToCart = async (data) => {

        let userIdl = localStorage.getItem("userId")

        if (data) {
            const formData = {
                productName: data.productName,
                brandName: data.brandName,
                price: data.price,
                quantity: data.quantity,
                image: data.image,
                wish: data.wish,
                userId: userIdl

            }
            console.log(formData);

            try {
                const url = 'https://react-shoping-cart-66dac.firebaseio.com/order-list/'+userIdl+'.json'

                const response = await Axios.post(url, formData)
                if (response.status === 200) {
                    
                    
                    props.history.push("/myorder")

                }
            } catch (error) {
                console.log(error);

            }
        }
    }
    
    let changeColor = async (selected) => {

        console.log("accToDelete", selected);
        let id = selected.id
        const url = 'https://react-shoping-cart-66dac.firebaseio.com/cart-list/'+userId+'.json'

        try {
            const response = await Axios.delete(url)
            console.log("response", response);
        
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <div className="container card card-body mt-5">
                <h5>PRICE DETAILS</h5>
            </div>
            <div className="container card card-body">
                <div className="col-md-12">
                    <h4 className="col-md-8 float-left ">Price</h4>
                    <p className="col-md-3 float-left ">{price}</p>

                </div>
                <div className="col-md-12">
                    <h4 className="col-md-8 float-left ">Delivery Fee</h4>
                    <p className="col-md-3 float-left ">50</p>

                </div>


            </div>

            <div className="container  card card-body ">
                <div className="col-md-12">
                    <h4 className="col-md-8 float-left ">Total Payable</h4>
                    <p className="col-md-3 float-left ">{total}</p>

                </div>
            </div>
            <div className=" container  card card-body ">
                <div className="col-md-12">
                    <div onClick={handleClick} className="col-md-2 offset-8 " >
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color={getLoding.loading ? "" : "primary"}
                    >
                        {getLoding.loading ? <CircularProgress size={24} color="secondary" />
                            : "Continue"
                        }

                    </Button>
                    </div>
                </div>
            </div>


        </>
    )
}
