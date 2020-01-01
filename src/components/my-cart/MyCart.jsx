import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CartView from '../cart-view/CartView'
import PriceCart from '../price-cart/PriceCart'
import Model from '../model/Model'
import { withRouter } from 'react-router-dom'

 function MyCart(props) {
    let userId = localStorage.getItem("userId")

    let productData = {
        allData: [],
        totalPrice: 0

    }

    const [getData, setData] = useState(productData)
    const [getPrice, setPrice] = useState({ count: 0, item: [] })
    
    
    function getUnique(arr, comp) {
        console.log(arr[comp]);

        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;
    }

   

    let getAllAccount = async () => {
        try {

            const url = `https://react-shoping-cart-66dac.firebaseio.com/cart-list/${userId }.json`
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
            let sortData = []



            if (response.status === 200) {
                sortData = getUnique(newData, "pId")
                if (newData.length !== 1) {

            
                        const url = `https://react-shoping-cart-66dac.firebaseio.com/cart-list/${userId}.json`

                        let deleteData = await Axios.delete(url)
                

                    sortData.forEach(async (val, index) => {
                        const url = `https://react-shoping-cart-66dac.firebaseio.com/cart-list/${userId }/${val.id}.json`

                        let added = await Axios.put(url, val)


                    })

                } else {
                    sortData = newData
                }



                let numberData = sortData.map(val => Number(val.price))

                let price = numberData.reduce((x, y) => x + y)

                setData({
                    ...getData,
                    allData: sortData,
                    totalPrice: price
                })

            }


        } catch (error) {

        }

    }
    useEffect(() => {
        getAllAccount()

    }, [])


    let changeColor = async (selected) => {

        let pushData = getData.allData

        pushData.push(selected)


        console.log("accToDelete", selected);
        let id = selected.id
        const url = `https://react-shoping-cart-66dac.firebaseio.com/cart-list/${userId }/${id}/.json`
        try {
            const response = await Axios.delete(url)
            console.log("response", response);
            console.log(getData.allData);
            const myAccount = [...getData.allData]
            let filterData = myAccount.filter(val => val.id !== selected.id)
            console.log(filterData);

            let numberData = filterData.map(val => Number(val.price))
            numberData.push(0)
            let price = numberData.reduce((x, y) => x + y)

            setData({
                ...getData,
                allData: filterData,
                totalPrice: price
            })

        } catch (error) {
            console.log(error);

        }
    }
    let changePrice = (item, count) => {

        let selectedPrice = getData.allData.filter((value) => value.id === item.id)
        let itemPrice = Number(selectedPrice[0].price)

        setPrice({
            ...getPrice,
            count: count,
            item: itemPrice
        })
        let total = getData.totalPrice
        let pCount = 0
        if (count > getPrice.count) {
            pCount = itemPrice * (count - 1)
        } else {
            pCount = itemPrice * (count + 1)
        }

        let cCount = itemPrice * count
        let sub = total - pCount
        let result = sub + cCount
        console.log(result);
        setData({
            ...getData,
            totalPrice: result
        })
    }
    let payment = () => {

        let cartData = [getData.totalPrice]
        localStorage.setItem("cartData", cartData)
        setTimeout(() => props.history.push("/pay"), 2000)

    }
    return (
        <>
            {getData.allData ?

                <div className="container-fluid">
                    <table className="table col-md-7 mt-5 float-left">

                        <tbody>
                            <div className="card card-body">
                                <h6 className="col-md-4">My Cart({getData.allData.length})</h6>
                            </div>
                            {getData.allData.map((value, index) => {

                                return (
                                    <CartView changePrice={changePrice} changeColor={changeColor} key={value + index} text={value} />
                                )

                            })}

                        </tbody>
                    </table>
                    <div className="table col-md-5 mt-5 float-left">
                        <PriceCart price={getData.totalPrice} getData={getData} />
                        <div className="card  card-body">
                            <div
                                onClick={payment}
                                className="offset-md-6 col-md-5 ">
                                <Model name=" PLACE ORDER" done={true} />
                            </div>
                        </div>
                    </div>

                </div>
                : null}
        </>
    )
}
export default withRouter(MyCart)