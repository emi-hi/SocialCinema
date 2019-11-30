export const SET_USER = "SET_USER";
export const SET_GENRES = "SET_GENRES";
export const SET_FAVORITE_MOVIES = "SET_FAVORITE_MOVIES";
export const SET_LATER_MOVIES = "SET_LATER_MOVIES";
export const SET_FRIENDS = "SET_FRIENDS";
export const SET_GROUP = "SET_GROUP";
export const SET_THEME = "SET_THEME";

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
      favorited_movies: action.value
    }
  },
  SET_LATER_MOVIES: (state, action) => {
    return {
      ...state,
      later_movies: action.value
    }
  },
  SET_FRIENDS: (state, action) => {
    return {
      ...state,
      friends: action.value
    }
  },
  SET_GROUP: (state, action) => {
    return {
      ...state,
      group: action.value
    }
  },
  SET_THEME: (state, action) => {
    return {
      ...state,
      theme: action.value
    }
  }
};

export default function reducer(state, action) {
  if (reducerLookup[action.type]) {
    return reducerLookup[action.type](state, action);
  }
};
