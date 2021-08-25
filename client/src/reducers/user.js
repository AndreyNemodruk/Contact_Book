import C from '../components/constants/constatnts';

const initialState = {
  userId: '',
  token: null,
  firstName: '',
  secondName: '',
  file: '',
};

const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.SET_USER:
      return payload;
    case C.UPDATE_USER:
      return { ...state, ...payload };
    case C.DEL_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
