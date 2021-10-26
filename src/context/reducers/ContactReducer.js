import {
  SET_CONTACT,
  SET_LOADING,
  CONTACT_TO_UPDATE,
  SET_SINGLE_CONTACT
} from '../types/ContactTypes'
const ContactReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_CONTACT:
      return payload == null
        ? { ...state, contacts: [] }
        : { ...state, contacts: payload }
    case SET_LOADING:
      return { ...state, isLoading: payload }
    case CONTACT_TO_UPDATE:
      return {
        ...state,
        contactToUpdate: payload,
        contactToUpdateKey: action.key
      }
    case SET_SINGLE_CONTACT:
      return {
        ...state,
        contact: payload
      }

    default:
      return state
  }
}
export default ContactReducer
