import React from 'react'

export default function PriceCart(props) {
   
    let price=props.price
    console.log(price);
    
    return (
        <>

            <div className="card card-body">
                <h5>PRICE DETAILS</h5>
            </div>
            <div className="card card-body">
                <div className="col-md-12">
                    <h4 className="col-md-8 float-left ">Price({props.getData.allData.length}items)</h4>
                    <p className="col-md-3 float-left ">{price}</p>

                </div>
                <div className="col-md-12">
                    <h4 className="col-md-8 float-left ">Delivery Fee</h4>
                    <p className="col-md-3 float-left ">Free</p>

                </div>


            </div>

            <div className="card card-body">
                <div className="col-md-12">
                    <h4 className="col-md-8 float-left ">Total Payable</h4>
                    <p className="col-md-3 float-left ">{price}</p>

                </div>
            </div>


        </>
    )
}
