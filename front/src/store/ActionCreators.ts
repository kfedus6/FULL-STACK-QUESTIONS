import { AppDispatch } from "./store";
import axios from "axios"
import { toast } from "react-toastify"
import { userSlice } from "./reducers/UserSlice";

export const fetchRegistration = () => async (dispatch: AppDispatch) => {
    try {

    } catch (error: any) {
        dispatch(userSlice.actions.registration({ user: [], isAuth: false }))
        toast.error(error.response.data.message)
    }
}

export const fetchLogin = () => async (dispatch: AppDispatch) => {
    try {

    } catch (error: any) {
        dispatch(userSlice.actions.registration({ user: [], isAuth: false }))
        toast.error(error.response.data.message)
    }
}

export const fetchLogout = () => async (dispatch: AppDispatch) => {
    try {

    } catch (error: any) {
        dispatch(userSlice.actions.registration({ user: [], isAuth: false }))
        toast.error(error.response.data.message)
    }
}

export const fetchRefresh = () => async (dispatch: AppDispatch) => {

}