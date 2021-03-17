import C from '../components/constants/constatnts.js'

const initialState = {
  categories: null,
  selectedCat: 'allContacts',
};

const categories = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.SELECT_CAT:
      return { ...state, selectedCat: payload };
    case C.SET_ALL_CAT:
      return { ...state,  categories: payload};
    case C.ADD_CATEGORY:
      return {...state, categories: [...state.categories, payload]}
    default:
      return state;
  }
};

export default categories;