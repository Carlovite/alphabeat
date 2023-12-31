import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  onSnapshot,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, database } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_USERNAME = "SET_USERNAME";
export const LOG_OUT = "LOG_OUT";
export const GET_DATA = "GET_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const GET_DATA_REALTIME = "GET_DATA_REALTIME";
export const SIGN_IN = "SIGN_IN";
export const EDIT_DATA = "EDIT_DATA";
export const addToCart = (r) => {
  return {
    type: ADD_TO_CART,
    payload: r,
  };
};

export const removeFromCart = (i) => {
  return {
    type: REMOVE_FROM_CART,
    payload: i,
  };
};
// export const setUsername = (username) => {
//   return {
//     type: SET_USERNAME,
//     payload: username,
//   };
// };
// export const setLogOut = () => {
//   return {
//     type: LOG_OUT,
//   };
// };

export const getBeats = () => {
  return async (dispatch) => {
    const ref = collection(database, "beats");
    getDocs(ref).then((snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      if (results) {
        dispatch({
          type: GET_DATA,
          payload: results,
        });
      } else {
        console.log("errore");
      }
    });
  };
};

export const deleteElement = (id) => {
  return async (dispatch) => {
    const ref = doc(database, "beats", id);
    await deleteDoc(ref);
    dispatch({
      type: DELETE_DATA,
    });
  };
};

export const getBeatsRealTime = () => {
  return async (dispatch) => {
    let ref = collection(database, "beats");
    onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      dispatch({
        type: GET_DATA_REALTIME,
        payload: results,
      });
    });
  };
};

export const signInUser = (credentials) => {
  return async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      dispatch({
        type: SIGN_IN,
        payload: userCredential.user.email,
      });
    } catch (error) {
      dispatch({
        type: "SIGN_IN_ERROR",
        payload: error.message,
      });
    }
  };
};

export const LogOutUser = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);

      dispatch({
        type: LOG_OUT,
      });
    } catch (error) {
      dispatch({
        type: "LOG_OUT_ERROR",
        payload: error.message,
      });
    }
  };
};

export const createUser = (credentials) => {
  return async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      dispatch({
        type: "CREATE_USER",
        payload: userCredential.user.email,
      });
    } catch (error) {
      dispatch({
        type: "SIGN_UP_ERROR",
        payload: error.message,
      });
    }
  };
};

export const editElement = (id, price) => {
  return async (dispatch) => {
    try {
      const ref = doc(database, "beats", id);
      const data = await getDoc(ref);
      if (data.exists()) {
        setDoc(ref, { content: price });
        dispatch({
          type: EDIT_DATA,
        });
      } else throw new Error("Data with id " + id + "was not found");
    } catch (error) {
      console.error(error);
    }
  };
};
