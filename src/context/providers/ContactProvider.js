import { useReducer } from 'react'

import ContactContext from '../contexts/ContactContext'
import ContactReducer from '../reducers/ContactReducer'

const ContactProvider = (props ) => {
  const [state, dispatch] = useReducer(, {})

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ContactContext.Provider>
  )
}
export default ContactProvider
