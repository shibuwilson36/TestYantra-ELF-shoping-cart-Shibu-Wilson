import { TextField, Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import LoginModel from '../login-model/LoginModel'
import Axios from 'axios'

export default function AddProduct(props) {
    let productData = {
        productName: "",
        brandName: "",
        price: "",
        quantity: "",
        image: "",
        show: false,
        conection: true
    }

    const [getData, setData] = useState(productData)
    const [getProductName, setProductName] = useState({ errorName: '', showName: false })
    const [getBrand, setBrand] = useState({ errorBrand: "", showBrand: false })
    const [getPrice, setPrice] = useState({ errorPrice: "", showPrice: false })
    const [getQuantity, setQuantity] = useState({ errorQuantity: "", showQuantity: false })
    const [getImage, setImage] = useState({ errorImage: "", showImage: false })



    let handeleKeyUp = (event) => {

        setData({
            ...getData,
            [event.target.name]: event.target.value.trim()
        })
        if (event.target.name === "productName") {
            let productName = event.target.value.trim()
            if ((productName < 1)) {

                setProductName({
                    showName: false,
                    errorName: "space is not valid"

                })
            } else if ((productName.match(/[0-9]/) || productName.match(/[!-=]/))) {

                setProductName({
                    showName: false,
                    errorName: "It should only contain letters"

                })
            } else {
                setProductName({
                    errorName: "",
                    showName: true

                })
            }
        }
        if (event.target.name === "brandName") {
            let brandName = event.target.value.trim()
            if (brandName.length < 1) {
                setBrand({
                    showBrand: false,
                    errorBrand: "space is not valid"

                })
            }
            else if ((brandName.match(/[0-9]/) || brandName.match(/[!-=]/))) {

                setBrand({
                    showBrand: false,
                    errorBrand: "It should only contain letters"

                })
            } else {
                setBrand({
                    errorBrand: "",
                    showBrand: true

                })
            }
        }
        if (event.target.name === "price") {
            let price = event.target.value.trim()
            if (price.length < 1) {
                setPrice({
                    showPrice: false,
                    errorPrice: "space is not valid"

                })
            }
            else if ((price.match(/[a-z]/) || price.match(/[A-Z]/))) {

                setPrice({
                    showPrice: false,
                    errorPrice: "It should only contain Number"

                })
            } else {
                setPrice({
                    errorPrice: "",
                    showPrice: true

                })
            }
        }
        if (event.target.name === "quantity") {
            let quantity = event.target.value.trim()
            if (quantity.length < 1) {
                setQuantity({
                    showQuantity: false,
                    errorQuantity: "space is not valid"

                })
            }
            else if ((quantity.match(/[a-z]/) || quantity.match(/[A-Z]/))) {

                setQuantity({
                    showQuantity: false,
                    errorQuantity: "It should only contain Number"

                })
            } else {
                setQuantity({
                    errorQuantity: "",
                    showQuantity: true

                })
            }
        }
        if (event.target.name === "image") {
            let image = event.target.value.trim()
            if (image.length < 1) {
                setImage({
                    showImage: false,
                    errorImage: "space is not valid"

                })
            }
            else if ((image.length > 500)) {

                setImage({
                    showImage: false,
                    errorImage: "Invalid Path"

                })
            } else {
                setImage({
                    errorImage: "",
                    showImage: true

                })
            }
        }


    }
    let update = async (value, formData) => {
        const url = 'https://react-shoping-cart-66dac.firebaseio.com//add-product/' + value.name + '.json'
        let data = {
            ...formData,
            pId: value.name
        }
        let upadded = await Axios.put(url, data)
    }
    const saveData = (event) => {
        event.preventDefault()
        if (getProductName.showName && getBrand.showBrand && getImage.showImage
            && getPrice.showPrice && getQuantity.showQuantity) {

            setData({
                show: true
            })

            const formData = {
                productName: getData.productName,
                brandName: getData.brandName,
                price: getData.price,
                quantity: getData.quantity,
                image: getData.image,
                wish: false,


            }
            console.log(formData);
            

            const url = 'https://react-shoping-cart-66dac.firebaseio.com//add-product.json'
            // , {
            //     method: 'POST',
            //     mode: 'no-cors',
            //     headers: {
            //       'Access-Control-Allow-Origin': 'http://localhost:3000',
            //       'Content-Type': 'application/json',
            //     },
            //     withCredentials: true,
            //     credentials: 'same-origin',
            //   }
            // const url = 'http://localhost:8080/shoppingcart/addproduct'
            Axios.post(url, formData).then((success) => {
                console.log(success);
                if (success.status === 200) {
                    update(success.data, formData)
                    setData({

                        conection: true,

                    })
                    props.history.push("/show")
                }


            }).catch(error => {
                console.log(error);

            })


        } else {
            if (!getData.brandName) {
                setBrand({
                    ...getBrand,
                    errorBrand: "Brand Name cannot be left blank"
                })
            } if (!getData.productName) {
                setProductName({
                    ...getProductName,
                    errorName: "Product Name cannot be left blank"
                })
            } if (!getData.price) {
                setPrice({
                    ...getPrice,
                    errorPrice: "Price  cannot be left blank"
                })
            }
            if (!getData.quantity) {
                setQuantity({
                    ...getQuantity,
                    errorQuantity: "Quantity cannot be left blank"
                })
            } if (!getData.image) {
                setImage({
                    ...getImage,
                    errorImage: "Image cannot be left blank"
                })
            }
        }
    }
    const unameStyle = {
        color: 'red',
        fontSize: '10px'
    }


    return (
        <div className=" card card-body">
            <h1>Add Product</h1>
            <form onSubmit={saveData}>
                <TextField
                    className="col-md-12" name="productName"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Product Name" />
                <p style={unameStyle}>{getProductName.errorName}</p>
                <TextField
                    className="col-md-12" name="brandName"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Brand" />
                <p style={unameStyle}>{getBrand.errorBrand}</p>

                <TextField
                    className="col-md-12" name="price"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Price" />
                <p style={unameStyle}>{getPrice.errorPrice}</p>

                <TextField
                    className="col-md-12" name="quantity"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Quantity" />
                <p style={unameStyle}>{getQuantity.errorQuantity}</p>

                <TextField
                    className="col-md-12" name="image"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Image" />
                <p style={unameStyle}>{getImage.errorImage}</p>

                <div className="offset-md-4 ">
                    <Button type="sumbit" variant="contained" color="primary">
                        Add Product
                </Button>
                    {getData.show ?
                        <LoginModel action={"Added"} conection={getData.conection} />
                        : null
                    }
                </div>
            </form>

        </div>
    )
}

