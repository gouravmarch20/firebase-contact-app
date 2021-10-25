import { useReducer } from 'react'

import ContactContext from '../contexts/ContactContext'
import ContactReducer from '../reducers/ContactReducer'

const ContactProvider = props => {
  // const initialState =
  const [state, dispatch] = useReducer(ContactReducer, {
    contacts: [],
    contact: {},
    contactToUpdate: null,
    contactToUpdateKey: null,
    isLoading: false
  })

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ContactContext.Provider>
  )
}
export default ContactProvider
