import React, { useState, useEffect } from 'react'
import Search from '../search/Search'
import DisplayItem from '../display-item/DisplayItem'
import Axios from 'axios'
import Progress from '../progress/Progress'
import { withRouter } from 'react-router-dom'
import CustomizedSnackbars from '../snack-bar/SnackBar'
function ShowProduct(props) {
    let userId = localStorage.getItem("userId")
    let productData = {
        allData: [],
        wishData: []
    }

    const [getData, setData] = useState(productData)
    const [getText, setText] = useState({ text: [] })
    const [conection, setConection] = useState(true)
    const [getWishList, setWishList] = useState({ wishList: [] })
    const [getDataLength, setDataLength] = useState({ length: 0 })
    const [open, setOpen] = React.useState(false);



    let getProductName = (event) => {
        if (event.length !== 0) {
            let data = getData.allData

            let filterData = data.filter(value => (value.productName.toLowerCase()).startsWith(event))
            let newData = []
            for (const key in filterData) {
                newData.push({
                    ...filterData[key]
                })
            }
            if (filterData) {
                setText({
                    ...getText,
                    text: newData



                })
            } else {
                setText({
                    ...getText,
                    text: []
                })
            }
        }
    }

    let getAllAccount = async () => {
        try {
            const url = 'https://react-shoping-cart-66dac.firebaseio.com/add-product.json'

            // const url = 'http://localhost:8080/shoppingcart/getproduct'
            // {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': '*',
            //         'Access-Control-Allow-Credentials': true
            //     }
            // }
            let response = await Axios.get(url)
            console.log(response);

            const wishUrl = 'https://react-shoping-cart-66dac.firebaseio.com/wish-list/' + userId + '.json'
            let wishResponse = await Axios.get(wishUrl)
            let newData = []
            for (const key in response.data) {
                newData.push({
                    ...response.data[key],
                    done: true
                })
            }
            let wishNewdData = []
            for (const key in wishResponse.data) {
                wishNewdData.push({
                    ...wishResponse.data[key],
                    id: key,
                    done: true
                })
            }
            setDataLength({
                length: wishNewdData.length
            })
            props.passDataLength(wishNewdData.length)
            let sortWish = newData.map(obj => wishNewdData.find(o => ((o.pId === obj.pId))) || obj);

            if (response.status === 200 && wishResponse.status === 200) {
                setConection(false)

                setData({
                    allData: sortWish,
                    wishData: wishNewdData
                })
            }
        } catch (error) {

        }

    }
    useEffect(() => {
        getAllAccount()
    }, [])
    let changeColor = (selected) => {

        let data = getText.text
        data.map(item => {


            if (item.pId === selected.pId) {

                console.log(item);
                return item.wish = !selected.wish;
            } return item
        })
        if (selected.wish) {
            setDataLength({
                length: getDataLength.length + 1
            })
            props.passDataLength(getDataLength.length + 1)
        } else {
            setDataLength({
                length: getDataLength.length - 1
            })
            props.passDataLength(getDataLength.length - 1)
        }
        setText({
            ...getText,
            text: data,

        })

        saveCart(selected)
        
    }
    let saveCart = async (wishData) => {
        let userIdl = localStorage.getItem("userId")

        if (wishData.wish === true) {
            addList(wishData, 'wish-list')
            setOpen(true)
        } else {

            let wishId = getWishList.wishList.filter(value => value.pId === wishData.pId)
            console.log(wishId);
            let id = 0
            if (wishId.length === 0) {
                id = wishData.id
            } else {
                id = wishId[0].id
                console.log(id);

            }
            console.log(id);


            const url = `https://react-shoping-cart-66dac.firebaseio.com/wish-list/${userIdl}/${id}/.json`
            try {
                const response = await Axios.delete(url)
                console.log("response de", response);
            } catch (error) {

            }
        }

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
                userId: userIdl,
                pId: data.pId


            }
            console.log(formData);
            if (data.done) {
                try {

                    const url = 'https://react-shoping-cart-66dac.firebaseio.com/cart-list/' + userId + '.json'

                    const response = await Axios.post(url, formData)
                    if (response.status === 200) {

                        let datas = getText.text

                        datas.map(item => {
                            if (item.id === data.id) {


                                return item.done = false;
                            } return item
                        })

                        setText({
                            ...getData,
                            text: datas,
                        })
                    }

                } catch (error) {

                    console.log(error);

                }
            } else {

                props.history.push('/mycart')

            }
        }

    }
    let update = async (value, formData) => {
        let userIdl = localStorage.getItem("userId")

        const url = 'https://react-shoping-cart-66dac.firebaseio.com/wish-list/' + userIdl + '/' + value.name + '.json'
        let data = {
            ...formData,
            id: value.name
        }
        let upadded = await Axios.put(url, data)
        console.log(upadded);
        let wishData = getWishList.wishList
        let pusData = [...wishData, data]
        setWishList({
            wishList: pusData
        })
    }
    let addList = async (data, stote) => {
        let userIdl = localStorage.getItem("userId")

        if (data) {
            const formData = {
                productName: data.productName,
                brandName: data.brandName,
                price: data.price,
                quantity: data.quantity,
                image: data.image,
                wish: data.wish,
                userId: userIdl,
                pId: data.pId,

            }
            console.log(data);

            try {
                const url = 'https://react-shoping-cart-66dac.firebaseio.com/' + stote + '/' + userId + '.json'

                const response = await Axios.post(url, formData)
                if (response.status === 200) {

                    let data = response.data
                    console.log(data.name);
                    update(data, formData)
                    setOpen(false)
                }
            } catch (error) {
                console.log(error);

            }
        }
    }



    return (
        <>
            <Search getProductName={getProductName} />

            {conection ? <Progress /> : null}
            {getText.text.map((value, index) => {

                return (
                    <div className="container">
                        <DisplayItem

                            done={getText.done}
                            addToCart={addToCart}
                            changeColor={changeColor} key={value + index}
                            text={value}
                        />

                    </div>

                )


            })}
            <CustomizedSnackbars open={open} />

        </>
    )
}
export default withRouter(ShowProduct)
