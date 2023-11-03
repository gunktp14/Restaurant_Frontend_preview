import {
  HANDLE_CHANGE,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  CLEAR_ALERT,
  LOGOUT_USER,
  FETCH_ALL_BEGIN,
  FETCH_ALL_SUCCESS,
  FETCH_ALL_ERROR,
  DISPLAY_ADD_FORM,
  CLEAR_ALL_MODAL,
  ADD_RES_BEGIN,
  ADD_RES_SUCCESS,
  FORM_VALID_PASS,
  FORM_VALID_FAIL,
  SET_EDIT_ID,
  UPDATE_RESTAURANT_BEGIN,
  UPDATE_RESTAURANT_SUCCESS,
  SET_FORM_VALID,
  DISPLAY_POPUP_CONFIRM,
  SEND_REFRESH_BEGIN,
  SEND_REFRESH_SUCCESS,
  SEND_REFRESH_ERROR
} from "./action";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg || "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    const { accessToken, user, alertText } = action.payload;
    return {
      ...state,
      isLoading: false,
      accessToken: accessToken,
      user: user,
      showAlert: true,
      alertType: "success",
      alertText: alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      accessToken: null,
    };
  }
  if (action.type === FETCH_ALL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === FETCH_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      restaurantList: action.payload.data,
    };
  }
  if (action.type === FETCH_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === DISPLAY_ADD_FORM) {
    return {
      ...state,
      showAddForm: true,
      showAlert: false,
    };
  }
  if (action.type === CLEAR_ALL_MODAL) {
    return {
      ...state,
      showAddForm: false,
      showEditForm: false,
      showPopupConfirm:false,
      selectedRes:null,
      editId: null,
      name: "",
      type: "",
      img: "",
    };
  }
  if (action.type === ADD_RES_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: true,
      alertText: "กำลังเพิ่มข้อมูลร้านค้า...",
      alertType: "working",
      name: "",
      type: "",
      img: "",
    };
  }
  if (action.type === ADD_RES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "เพิ่มข้อมูลร้านค้าของคุณเสร็จสิ้น",
      alertType: "success",
    };
  }
  if (action.type === FORM_VALID_PASS) {
    return {
      ...state,
      formValid: true,
    };
  }
  if (action.type === FORM_VALID_FAIL) {
    return {
      ...state,
      formValid: false,
    };
  }

  if (action.type === SET_EDIT_ID) {
    return {
      ...state,
      editId: action.payload.id,
    };
  }

  if (action.type === "SHOW_EDIT_FORM") {
    const { id, name, type, img } = action.payload.selectedRes;
    return {
      ...state,
      selectedRes: action.payload.selectedRes,
      showEditForm: true,
      name: name,
      type: type,
      img: img,
      editId: id,
    };
  }

  if (action.type === UPDATE_RESTAURANT_BEGIN) {
    return {
      ...state,
      isLoading: true,
      isEditing: true,
    };
  }
  if (action.type === UPDATE_RESTAURANT_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      showAddForm: false,
      showEditForm: false,
      editId: null,
      formValid: false,
      name: "",
      type: "",
      img: "",
    };
  }

  if (action.type === SET_FORM_VALID) {
    return {
      ...state,
      formValid: action.payload.status,
    };
  }

  if (action.type === DISPLAY_POPUP_CONFIRM) {
    return {
      ...state,
      selectedRes: action.payload.selectedRes,
      showPopupConfirm: true,
    };
  }
  if (action.type === SEND_REFRESH_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SEND_REFRESH_SUCCESS) {
    const { accessToken, user, alertText } = action.payload;
    return {
      ...state,
      isLoading: false,
      accessToken: accessToken,
      user: user,
      showAlert: true,
      alertType: "success",
      alertText: alertText,
    };
  }
  if (action.type === SEND_REFRESH_ERROR) {
    return {
      ...state,
      isLoading: false,
      // showAlert: true,
      // alertType: "danger",
      // alertText: action.payload.msg,
    };
  }
};

export default reducer;
