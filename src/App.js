import React, { useReducer, useEffect } from 'react'

import { Container, Col, Row } from 'reactstrap'

// react-router-dom3
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// react toastify stuffs
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// firebase stuffs
//TODO: import firebase config and firebase database

// components
import AddContact from './pages/AddContact'
import Contacts from './pages/Contacts'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ViewContact from './pages/ViewContact'
import PageNotFound from './pages/PageNotFound'

// context api stuffs
import ContactProvider from './context/providers/ContactProvider'

//initlizeing firebase app with the firebase config which are in ./utils/firebaseConfig
//TODO: initialize FIREBASE



const App = () => {

  // will get contacts from firebase and set it on state contacts array
  const getContacts = async () => {
    // TODO: load existing data
  }

  // getting contact  when component did mount
  useEffect(() => {
    //FIXME: call methods if needed
  }, [])

  return (
    <Router>
      {/* FIXME: Provider is not configured */}
      <ContactProvider>
      <h1>h4</h1>
        {/* <ToastContainer /> */}
        {/* <Header /> */}
        {/* <Container>
          <Switch>
            <Route exact path='/contact/add' component={AddContact} />
            <Route exact path='/contact/view' component={ViewContact} />
            <Route exact path='/' component={Contacts} />
            <Route exact path='*' component={PageNotFound} />
          </Switch>
        </Container> */}

        {/* <Footer /> */}
      </ContactProvider>
    </Router>
  )
}

export default App
