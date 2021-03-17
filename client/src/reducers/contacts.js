import C from '../components/constants/constatnts.js'

const initialState = {
  allContacts: [],
  groupContacts: [],
  filter: '',
  birthday: []
}

const contacts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.SET_ALL_CONTACTS:
      return { ...state, allContacts: payload };
    case C.SET_FILTER_CONTACTS:
      return { ...state, filter: payload };
    case C.SET_GROUP_CONTACTS:
      return { ...state, groupContacts: payload };
    case C.SET_BIRTHDAY_DATA:
      return { ...state, birthday: payload };
    default:
      return state;
  }
};

export default contacts;