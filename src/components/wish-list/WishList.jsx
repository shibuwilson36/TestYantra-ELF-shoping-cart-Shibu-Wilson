import React, { useState, useEffect } from 'react'
import DisplayItem from '../display-item/DisplayItem'
import Axios from 'axios'
import Progress from '../progress/Progress'


export default function WishList(props) {
    let userId=localStorage.getItem("userId")

    let productData = {
        allData: []
    }

    const [getData, setData] = useState(productData)
    const [getText, setText] = useState({ text: [], wishList: [] })
    const [conection, setConection] = useState(true)
    const [done, setDone] = useState(true)
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
    function getSame(arr, comp) {
        console.log(arr[comp]);

        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) !== i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;
    }

    let getAllAccount = async () => {
        try {
            const url = 'https://react-shoping-cart-66dac.firebaseio.com/wish-list/'+userId+'.json'
            let response = await Axios.get(url)
            let newData = []
            for (const key in response.data) {
                if (response.data[key].userId === userId) {
                    newData.push({
                        ...response.data[key],
                        id: key
                    })
                }
            }
            let sortData = []
            let deletItem = []

            if (response.status === 200) {

                sortData = getUnique(newData, "pId")
                deletItem = getSame(newData, "pId")
                if (newData.length !== 1) {
                   
                        const url = `https://react-shoping-cart-66dac.firebaseio.com/wish-list/${userId}.json`

                        let deleteData = await Axios.delete(url)
                   
                    sortData.forEach(async (val, index) => {
                        const url = `https://react-shoping-cart-66dac.firebaseio.com/wish-list/${userId}/${val.id}.json`

                        let added = await Axios.put(url, val)


                    })

                } else {
                    sortData = newData
                }
                console.log("jhghg", sortData);


                setConection(false)
                setData({
                    allData: sortData
                })
            }
        } catch (error) {

        }

    }
    useEffect(() => {
        getAllAccount()
    }, [])
    let changeColor = async (selected) => {

        




        console.log("accToDelete", selected);
        let id = selected.id
        const url = `https://react-shoping-cart-66dac.firebaseio.com/wish-list/${userId}/${id}/.json`
        try {
            const response = await Axios.delete(url)
            console.log("response", response);
            let myAccount = getData.allData.filter(value=>value.pId!==selected.pId)

            setData({
                allData:myAccount
            })
        } catch (error) {
            console.log(error);

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

            try {
                const url = 'https://react-shoping-cart-66dac.firebaseio.com/cart-list.json'

                const response = await Axios.post(url, formData)
                if (response.status === 200) {
                    setDone(false)
                    props.history.push('/mycart')

                }
            } catch (error) {
                console.log(error);

            }
        }

    }
    return (
        <>
            {conection ? <Progress /> : null}

            {getData.allData.map((value, index) => {

                return (
                    <div className="container">
                        <DisplayItem
                            done={done} addToCart={addToCart}
                            changeColor={changeColor} key={value + index} text={value} />

                    </div>

                )


            })}
            {getData.allData.length === 0 ? <p className="container col-md-4 offset-md-5 mt-5">No WishList Found</p> : null}
        </>
    )
}
