export const SET_USER = "SET_USER";
export const SET_GENRES = "SET_GENRES";
export const SET_FAVORITE_MOVIES = "SET_FAVORITE_MOVIES";
export const SET_LATER_MOVIES = "SET_LATER_MOVIES";

const reducerLookup = {
  SET_USER: (state, action) => {
    return {
      ...state,
      user: action.value
    }
  },
  SET_GENRES: (state, action) => {
    return {
      ...state,
      genres: action.value
    }
  },
  SET_FAVORITE_MOVIES: (state, action) => {
    return {
      ...state,
      favorite_movies: action.value
    }
  },
  SET_LATER_MOVIES: (state, action) => {
    return {
      ...state,
      later_movies: action.value
    }
  }
};

export default function reducer(state, action) {
  if (reducerLookup[action.type]) {
    return reducerLookup[action.type](state, action);
  }
};
