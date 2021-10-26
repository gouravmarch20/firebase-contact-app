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

import firebase from 'firebase/compat/app'

// components
import AddContact from './pages/AddContact'
import Contacts from './pages/Contacts'
import Header from './layout/Header'
import Footer from './layout/Footer'
import ViewContact from './pages/ViewContact'
import PageNotFound from './pages/PageNotFound'

// context api stuffs
import ContactProvider from './context/providers/ContactProvider'

//TODO: initialize FIREBASE

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getContacts = async () => {
    dispatch({
      type: SET_LOADING,
      payload: true
    })

    const contactsRef = await firebase.database().ref('/contacts')
    contactsRef.on('value', snapshot => {
      dispatch({
        type: SET_CONTACT,
        payload: snapshot.val()
      })
      dispatch({
        type: SET_LOADING,
        payload: false
      })
    })
  }

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <Router>
      <ContactProvider>
        <ToastContainer />
        <Header />
        <Container>
          <Switch>
            <Route exact path='/contact/add' component={AddContact} />
            <Route exact path='/contact/view' component={ViewContact} />
            <Route exact path='/' component={Contacts} />
            <Route exact path='*' component={PageNotFound} />
          </Switch>
        </Container>

        <Footer />
      </ContactProvider>
    </Router>
  )
}

export default App
