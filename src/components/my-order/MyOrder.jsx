import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ClearIcon from '@material-ui/icons/Clear';
export default function MyOrder() {

    let price = localStorage.getItem("cartData")
    let total = Number(price) + 50
    let productData = {
        allData: []
    }

    const [getData, setData] = useState(productData)

    let getAllAccount = async () => {
        let userId = localStorage.getItem("userId")

        try {
            const url = 'https://react-shoping-cart-66dac.firebaseio.com/order-list/'+userId+'.json'
            
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
    return (
        <div className="mt-5">
          
            {getData.allData.map(text => {
                return (<>
                    <div className="container ">
                        <div className=" card "  >
                            <div className="col-md-12 float-left card-body ">
                                <div className="">
                                    <img className="col-md-2 h-50 float-left  " src={text.image} alt=""></img>
                                    <p className="col-md-2 float-left " >
                                        <h1>{text.productName}</h1>
                                        <p>{text.brandName}</p>

                                    </p>
                                    <p className="col-md-4 float-left " >
                                        <p>
                                            <AirportShuttleIcon color="primary" />
                                            Delivery expected by Tomorrow, Dec 31
                                            </p>
                                    </p>
                                    <p className="col-md-4 float-left " >
                                        <p>₹{text.price}</p>
                                        <p className="text-primary"><ClearIcon /> CANCEL ITEM</p>
                                        <p className="text-primary"> <HelpOutlineIcon />NEED HELP?</p>
                                    </p>

                                </div>
                            </div>

                        </div>
                    </div>

                </>)
            })}
           {getData.allData.length===0?<h1 className="container col-md-4 offset-md-4">No Order Found</h1>
           : <div className="container">
                <div className="card">
                    <div className=" col-md-3 offset-md-8">
                        <p>Total₹{total}</p>
                    </div>
                </div>

            </div>}
        </div>
    )
}
