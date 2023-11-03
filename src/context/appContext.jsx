import React, { useContext, useReducer, createContext, useEffect } from "react";
import {
  HANDLE_CHANGE,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  CLEAR_ALERT,
  LOGOUT_USER,
  FETCH_ALL_BEGIN,
  FETCH_ALL_SUCCESS,
  DISPLAY_ADD_FORM,
  CLEAR_ALL_MODAL,
  ADD_RES_BEGIN,
  ADD_RES_SUCCESS,
  SET_EDIT_ID,
  UPDATE_RESTAURANT_BEGIN,
  UPDATE_RESTAURANT_SUCCESS,
  DISPLAY_POPUP_CONFIRM,
  SEND_REFRESH_BEGIN,
  SEND_REFRESH_SUCCESS,
  SEND_REFRESH_ERROR
  
} from "./action";
import reducer from "./reducer";
import Axios from "axios";

const user = localStorage.getItem("user");
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isEditing: false,
  showAlert: false,
  // showProfileModal:false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  accessToken: accessToken,
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  showAddForm: false,
  showEditForm: false,
  showPopupConfirm: false,
  selectedRes: {},
  restaurantList: [],
  search: "",
  editId: null,
  name: "",
  type: "",
  img: "",
};

const URL = import.meta.env.VITE_BASE_URL;

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Axios
  const authFetch = Axios.create({
    baseURL: URL,
  });

  const refreshFetch = Axios.create({
    baseURL: URL,
  });

  refreshFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${refreshToken}`;
      // console.log("request ->config");
      return config;
    },
    (err) => {
      // console.log("request ->error");
      // console.log(err);
      return Promise.reject(err);
    }
  );

  //response
  refreshFetch.interceptors.response.use(
    (response) => {
      // console.log("response <-server");
      // console.log(response);
      return response;
    },
    (err) => {
      // console.log("response <-error");
      // console.log(err.response);
      if (err.response.status === 403) {
        logoutUser()
      }
      return Promise.reject(err);
    }
  );




  //request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.accessToken}`;
      // console.log("request ->config");
      return config;
    },
    (err) => {
      // console.log("request ->error");
      // console.log(err);
      return Promise.reject(err);
    }
  );

  //response
  authFetch.interceptors.response.use(
    (response) => {
      // console.log("response <-server");
      // console.log(response);
      return response;
    },
    (err) => {
      // console.log("response <-error");
      // console.log(err.response);
      if (err.response.status === 401) {
        sendRefreshToken()
      }
      return Promise.reject(err);
    }
  );

  const displayAlert = (msg) => {
    dispatch({ type: DISPLAY_ALERT, payload: { msg } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, accessToken,refreshToken }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const handleChange = (name, value) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await Axios.post(
        `${URL}/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, accessToken,refreshToken } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, accessToken, alertText },
      });
      addUserToLocalStorage({ user, accessToken,refreshToken }); 
      //local storage later
    } catch (err) {
      // console.log(err);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const sendRefreshToken = async () => {
    dispatch({ type: SEND_REFRESH_BEGIN });
    try { 
      const { data } = await refreshFetch.get(
        `${URL}/api/v1/auth/refresh`,
        
      );
      const { user, accessToken,refreshToken } = data;
      dispatch({
        type: SEND_REFRESH_SUCCESS,
        payload: { user, accessToken, alertText },
      });
      addUserToLocalStorage({ user, accessToken , refreshToken});
      //local storage later
    } catch (err) {
      // console.log(err);
      dispatch({
        type: SEND_REFRESH_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  //send request to API for fetchAll Restaurants
  const fetchAllRestaurant = async () => {
    dispatch({ type: FETCH_ALL_BEGIN });
    try {
      const { data } = await authFetch.get(`/api/v1/restaurant/`);
      dispatch({ type: FETCH_ALL_SUCCESS, payload: { data } });
    } catch (err) {
      // console.log(err);
    }
  };

  const displayPopupConfirm = async (id) => {
    const selectedRes = state.restaurantList.find((item) => {
      return item.id === id;
    });
    if (!selectedRes) {
      return;
    }
    dispatch({
      type: DISPLAY_POPUP_CONFIRM,
      payload: { selectedRes: selectedRes },
    });
  };

  //Insert Restaurant send request to API method = POST , {data}
  const insertRestaurant = async (event) => {
    event.preventDefault();
    const { name, type, img } = state;
    if (!name || !type || !img) {
      return displayAlert("Please provide all value !");
    }
    dispatch({ type: ADD_RES_BEGIN });
    try {
      const { name, type, img } = state;
      const result = await authFetch.post(`${URL}/api/v1/restaurant/`, {
        name: name,
        type: type,
        img: img,
      });
      console.log(result);
      setTimeout(() => {
        dispatch({ type: ADD_RES_SUCCESS });
        fetchAllRestaurant();
        setTimeout(() => {
          clearAlert();
        }, 2000);
      }, 1200);
    } catch (err) {
      // console.log(err);
    }
  };

  //display function about form add , edit
  const displayAddForm = () => dispatch({ type: DISPLAY_ADD_FORM });

  //clear all modal function
  const clearAllModal = () => {
    dispatch({ type: CLEAR_ALL_MODAL });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const displayEditForm = async (id) => {
    dispatch({ type: SET_EDIT_ID, payload: { id } });
    const selectedRes = state.restaurantList.find((item) => {
      return item.id === id;
    });
    if (!selectedRes) {
      return;
    }
    // console.log(selectedRes);
    dispatch({ type: "SHOW_EDIT_FORM", payload: { selectedRes: selectedRes } });
  };

  const updateRestaurant = async (event) => {
    event.preventDefault();
    const { name, type, img } = state;
    if (!name || !type || !img) {
      displayAlert("Please provide all value !");
    }
    dispatch({ type: UPDATE_RESTAURANT_BEGIN });
    try {
      const { editId, name, type, img } = state;
      await authFetch.put(`${URL}/api/v1/restaurant/${editId}`, {
        name: name,
        type: type,
        img: img,
      });
      dispatch({ type: UPDATE_RESTAURANT_SUCCESS });
      fetchAllRestaurant();
    } catch (err) {
      // console.log(err);
    }
  };

  //delete restaurant by Id :
  const deleteRestaurant = async () => {
    try {
      const { selectedRes } = state;
      await authFetch.delete(`${URL}/api/v1/restaurant/${selectedRes.id}`);
      fetchAllRestaurant();
      dispatch({ type: CLEAR_ALL_MODAL });
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    if (state.user) {
      fetchAllRestaurant();
    }
  }, [state.user]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        displayAlert,
        clearAlert,
        logoutUser,
        handleChange,
        displayAddForm,
        clearAllModal,
        insertRestaurant,
        displayEditForm,
        updateRestaurant,
        displayPopupConfirm,
        deleteRestaurant,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
