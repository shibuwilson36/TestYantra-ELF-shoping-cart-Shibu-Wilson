import React from 'react'
import SignUp from './SignUp'
import { useState } from 'react'
import Axios from 'axios'
import passwordValidation from '../login/passwordValidation';

export default function Register(props) {
    let userData = {
        email: "",
        firstName: "",
        lastName: "",
        mobile: "",
        password: "",
        cPassword: "",
        role: null,
        gender: ""
    }
  
    const [getUserData, setUserData] = useState(userData)
    const [getfirstNameError, setfirstNameError] = useState({ firstNameError: "", firstNameShow: false })
    const [getlastNameError, setlastNameError] = useState({ lastNameError: "", lastNameShow: false })
    const [getEmailError, setEmailError] = useState({ emailError: "", emailShow: false })
    const [getMobileError, setMobileError] = useState({ mobileError: "", mobileShow: false })
    const [getPasswordError, setPasswordError] = useState({ passwordError: "", passwordShow: false })
    const [getcPasswordError, setcPasswordError] = useState({ cPasswordError: "", cPasswordShow: false })
    const [getRoleError, setRoleError] = useState({ roleError: "", roleShow: false })
    const [getGenderError, setGenderError] = useState({ genderError: "", genderShow: false })
    const [getLoding, setLoding] = useState({ loading:false })
    


    const handlRole = (value) => {
        console.log(value);
        setUserData({
            ...getUserData,
            role: value
        })
        setRoleError({
            ...getRoleError,
            roleError: ""
        })

    }
    const handlGender = (value) => {
        console.log(value);

        setUserData({
            ...getUserData,
            gender: value
        })
        setGenderError({
            ...getGenderError,
            genderError: ""
        })

    }
    const handleKeyUp = (value) => {


        setUserData({
            ...getUserData,
            [value.target.name]: value.target.value
        })
        if (value.target.name === "firstName") {

            let values = value.target.value.trim()
            if ((values < 1)) {

                setfirstNameError({
                    ...getfirstNameError,
                    firstNameError: "space is not valid",
                    firstNameShow: false

                })
            } else if ((values.match(/[0-9]/) || values.match(/[!-=]/))) {

                setfirstNameError({
                    ...getfirstNameError,
                    firstNameShow: false,
                    firstNameError: "It should only contain letters"

                })
            } else {
                setfirstNameError({
                    ...getfirstNameError,
                    firstNameError: "",
                    firstNameShow: true

                })
            }
        }
        if (value.target.name === "lastName") {

            let values = value.target.value.trim()
            if ((values < 1)) {

                setlastNameError({
                    ...getlastNameError,
                    lastNameShow: false,
                    lastNameError: "space is not valid"

                })
            } else if ((values.match(/[0-9]/) || values.match(/[!-=]/))) {

                setlastNameError({
                    ...getlastNameError,
                    lastNameShow: false,
                    lastNameError: "It should only contain letters"

                })
            } else {
                setlastNameError({
                    ...getlastNameError,
                    lastNameError: "",
                    lastNameShow: true

                })
            }
        }
        if (value.target.name === "email") {

            let values = value.target.value.trim()
            if (!(/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(values))) {
                setEmailError({
                    ...getEmailError,
                    emailShow: false,
                    emailError: "Please enter valid Email"

                })
            } else {
                setEmailError({
                    ...getEmailError,
                    emailShow: true,
                    emailError: ""

                })
            }
        }
        if (value.target.name === "mobile") {

            let values = value.target.value.trim()
            if (values.trim().length !== 10 || values.match(/[0-9]/) === null) {
                setMobileError({
                    ...getMobileError,
                    mobileShow: false,
                    mobileError: "Please enter valid Mobile Number"

                })
            } else {
                setMobileError({
                    ...getMobileError,
                    mobileShow: true,
                    mobileError: ""

                })
            }
        }
        if (value.target.name === "password") {

            let values = value.target.value.trim()
            if (passwordValidation(values)) {
                setPasswordError({
                    ...getPasswordError,
                    passwordShow: false,
                    passwordError: "A minimum 8 characters password contains  a combination of uppercase and lowercase letterand number are required"

                })
            } else {
                setPasswordError({
                    ...getPasswordError,
                    passwordShow: true,
                    passwordError: ""

                })
            }
        }
        if (value.target.name === "cPassword") {

            let values = value.target.value.trim()
            let cPassword = getUserData.password


            if (cPassword === values) {
                setcPasswordError({
                    ...getcPasswordError,
                    cPasswordShow: true,
                    cPasswordError: ""

                })

            } else {

                setcPasswordError({

                    ...getcPasswordError,
                    cPasswordShow: false,
                    cPasswordError: "Password not matched"

                })

            }
        }


    }
    const saveData = (event) => {
        event.preventDefault()




        const formData = {
            email: getUserData.email,
            firstName: getUserData.firstName,
            lastName: getUserData.lastName,
            mobile: getUserData.mobile,
            password: getUserData.password,
            role: getUserData.role,
            gender: getUserData.gender

        }
        console.log(formData);
        console.log(getUserData.gender);

        let valid = (getEmailError.emailShow && 
        getfirstNameError.firstNameShow && 
        getlastNameError.lastNameShow && 
        getMobileError.mobileShow &&
        getPasswordError.passwordShow && 
         getcPasswordError.cPasswordShow)

        if (valid && getRoleError.role !== null && getGenderError.gender !== "") {
            setLoding({
                loading:true
              })
            const url = 'https://react-shoping-cart-66dac.firebaseio.com/user-account.json'
            Axios.post(url, formData).then((success) => {
                console.log(success);
                
                if (success.status === 200) {
                    props.history.push("/login")
                }

            }).catch(error => {
                console.log(error);

            })
        }


        else {
            if (!getUserData.email) {
                setEmailError({
                    ...getEmailError,
                    emailError: "email Name cannot be left blank"
                })
            } if (!getUserData.firstName) {
                setfirstNameError({
                    ...getfirstNameError,
                    firstNameError: "firstName Name cannot be left blank"
                })
            } if (!getUserData.lastName) {
                setlastNameError({
                    ...getlastNameError,
                    lastNameError: "lastName Name cannot be left blank"
                })
            }
            if (!getUserData.mobile) {
                setMobileError({
                    ...getMobileError,
                    mobileError: "mobile Name cannot be left blank"
                })
            } if (!getUserData.password) {
                setPasswordError({
                    ...getPasswordError,
                    passwordError: "password Name cannot be left blank"
                })
            } if (!getUserData.cPassword) {
                setcPasswordError({
                    ...getcPasswordError,
                    cPasswordError: "password Name cannot be left blank"
                })
            } if (getUserData.role===null) {
                setRoleError({
                    ...getRoleError,
                    roleError: "role Name cannot be left blank"
                })
            } if (!getUserData.gender) {
                setGenderError({
                    ...getGenderError,
                    genderError: "gender Name cannot be left blank"
                })
            }
        }


    }

    return (
        <div className="col-md-5 offset-4 ">
            <SignUp
                saveData={saveData}
                handleKeyUp={handleKeyUp}
                handlRole={handlRole}
                handlGender={handlGender}
                getLoding={getLoding}
                errorMessage={[
                    getfirstNameError,
                    getlastNameError,
                    getEmailError,
                    getMobileError,
                    getPasswordError,
                    getcPasswordError ,
                    getRoleError,
                    getGenderError]} />
        </div>
    )
}


