import {
  SET_CONTACT,
  SET_LOADING,
  CONTACT_TO_UPDATE,
  SET_SINGLE_CONTACT
} from '../types/ContactTypes'
const ContactReducer = (state, action) => {
  const { type, payload } = action

  if (type === SET_CONTACT) {
    // const destination = state.destinations.find(
    //   destination => destination.id === parseInt(payload)
    // )
    // return {
    //   ...state,
    //   details: destination
    // }
  } else if (type === SET_LOADING) {
    // const filtered = state.cities.filter(
    //   city => parseInt(city.destinationId) === parseInt(payload)
    // )
    // return {
    //   ...state,
    //   filteredCities: filtered
    // }
  } else if (type === CONTACT_TO_UPDATE) {
  } else if (type === SET_SINGLE_CONTACT) {
  } else {
    return state
  }

  // switch (true) {
  //   case SET_CONTACT:
  //     break
  //   case SET_LOADING:
  //     break
  //   case CONTACT_TO_UPDATE:
  //     break
  //   case SET_SINGLE_CONTACT:
  //     break
  //   default:
  //     break
  // }
}
export default ContactReducer
