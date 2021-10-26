import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../context/contexts/ContactContext'
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  Row,
  Col
} from 'reactstrap'

import { readAndCompressImage } from 'browser-image-resizer'
import { imageConfig } from '../utils/config'

import { MdAddCircleOutline } from 'react-icons/md'
import { v4 } from 'uuid'
import firebase from 'firebase/compat/app'
// context stuffs
import ContactContext from '../context/contexts/ContactContext'

import { CONTACT_TO_UPDATE } from '../context/types/ContactTypes'

import { useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'

const AddContact = () => {
  const { state, dispatch } = useContext(ContactContext)

  const { contactToUpdate, contactToUpdateKey } = state

  // history hooks from react router dom to send to different page
  const history = useHistory()

  // simple state of all component
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [star, setStar] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    if (contactToUpdate) {
      setName(contactToUpdate.name)
      setEmail(contactToUpdate.email)
      setPhoneNumber(contactToUpdate.phoneNumber)
      setAddress(contactToUpdate.address)
      setStar(contactToUpdate.star)
      setDownloadUrl(contactToUpdate.picture)

      setIsUpdate(true)
    }
  }, [contactToUpdate])

  const imagePicker = async e => {
    try {
      const file = e.target.files[0]

      var metadata = {
        contentType: file.type
      }

      let resizedImage = await readAndCompressImage(file, imageConfig)

      const storageRef = await firebase.storage().ref()
      var uploadTask = storageRef
        .child('images/' + file.name)
        .put(resizedImage, metadata)

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        setIsUploading(true)
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            setIsUploading(false)
            console.log('UPloading is paused')
            break
          case firebase.storage.TaskState.RUNNING:
            console.log('UPloading is in progress...')
            break
        }
      })
    } catch (error) {
      console.error(error)
      toast('Something went wrong', { type: 'error' })
    }
  }

  // setting contact to firebase DB
  const addContact = async () => {
    try {
      firebase
        .database()
        .ref('contacts/' + v4())
        .set({
          name,
          email,
          phoneNumber,
          address,
          picture: downloadUrl,
          star
        })
    } catch (error) {
      console.log(error)
    }
  }

  const updateContact = async () => {
    try {
      firebase
        .database()
        .ref('contacts/' + contactToUpdateKey)
        .set({
          name,
          email,
          phoneNumber,
          address,
          picture: downloadUrl,
          star
        })
    } catch (error) {
      console.log(error)
      toast('Oppss..', { type: 'error' })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    isUpdate ? updateContact() : addContact()

    toast('Success', { type: 'success' })

    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: null,
      key: null
    })

    history.push('/')
  }

  // return the spinner when the image has been added in the storage
  // showing the update / add contact based on the  state
  return (
    <Container fluid className='mt-5'>
      <Row>
        <Col md='6' className='offset-md-3 p-2'>
          <Form onSubmit={handleSubmit}>
            <div className='text-center'>
              {isUploading ? (
                <Spinner type='grow' color='primary' />
              ) : (
                <div>
                  <label htmlFor='imagepicker' className=''>
                    <img src={downloadUrl} alt='' className='profile' />
                  </label>
                  <input
                    type='file'
                    name='image'
                    id='imagepicker'
                    accept='image/*'
                    multiple={false}
                    onChange={e => imagePicker(e)}
                    className='hidden'
                  />
                </div>
              )}
            </div>

            <FormGroup>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='number'
                name='number'
                id='phonenumber'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder='phone number'
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='textarea'
                name='area'
                id='area'
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder='address'
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type='checkbox'
                  onChange={() => {
                    setStar(!star)
                  }}
                  checked={star}
                />{' '}
                <span className='text-right'>Mark as Star</span>
              </Label>
            </FormGroup>
            <Button
              type='submit'
              color='primary'
              block
              className='text-uppercase'
            >
              {isUpdate ? 'Update Contact' : 'Add Contact'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default AddContact
