import React, { Component } from 'react'
import Navbar from './components/navbar/Navbar.jsx'
import { UserProvider } from './context/userauthentication'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

export default class App extends Component {

  state = {
    role: true,
    login: false,
    authentication: (isLogin) => {
      this.validatin(isLogin)
    },
    setRole:(isrole)=>{
      this.setState({
        ...this.state,
        role: isrole
      })
    }
  }
  

  validatin = (isLogin) => {
    this.setState({
      ...this.state,
      login: isLogin
    })
    localStorage.setItem("login",isLogin)
  }

  render() {
    return (
      <Router>
       
        <UserProvider value={this.state}>
          <div className="App-header">
            <Navbar />

          </div>
        </UserProvider>
      </Router>
    )
  }
}