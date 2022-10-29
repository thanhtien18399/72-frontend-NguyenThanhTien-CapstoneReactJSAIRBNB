
import { message } from "antd";
import instance from "../../api/instance";

export const SET_LOCATION = "header/SET-LOCATION";
export const SET_LOCATIONROOM = "header/SET-LOCATIONROOM";
export const SET_SIGNIN = "header/SET-SIGNIN";
export const fetchActionLocation = async (dispatch) => {
    try {
        const res = await instance.request({
            url: "/api/vi-tri",
            method: "GET",
        });
        dispatch({
            type: SET_LOCATION,
            payload: res.data.content,
        })
        return res.data.content;
    } catch (error) {
        console.log(error);
    }
}
export const fetchActionLocationRoom = (id) => {
    return async (dispatch) => {
        try {
            const res = await instance.request({
                url: "/api/phong-thue/lay-phong-theo-vi-tri",
                method: "GET",
                params: {
                    maViTri:id,
                }
            });
            dispatch({
                type: SET_LOCATIONROOM,
                payload: res.data.content,
            })
            return res.data.content;
        } catch (error) {
            console.log(error);
        }
    }

}
export const fetchProfileAction = (id) => {
   
    return async (dispatch) => {
        if(!localStorage.getItem("id")){
            return;
        }
        try {
            const res = await instance.request({
                url: `/api/users/${id}`,
                method: "GET",
            });
            dispatch({
                type: SET_SIGNIN,
                payload: res.data.content,
            })
            message.success('Đăng Nhập Thành Công');
        } catch (error) {
            
        }
    }

}
export const fetchSignInAction = (user) => {
    return async (dispatch) => {
        try {
            const res = await instance.request({
                url: "/api/auth/signin",
                method: "POST",
                data: user,
            });
            dispatch({
                type: SET_SIGNIN,
                payload: res.data.content.user,
            })
            localStorage.setItem("token",res.data.content.token)
            localStorage.setItem("id",res.data.content.user.id)
            message.success('Đăng Nhập Thành Công');
        } catch (error) {
            message.success(`${error.response.data.content}`);
        }
    }

}
export const fetchSignUpAction = (user) => {
    return async (dispatch) => {
        try {
            const res = await instance.request({
                url: "/api/auth/signup",
                method: "POST",
                data: user,
            });
        message.success('Đăng Kí Thành Công');
        } catch (error) {
            message.error(`${error.response.data.content}`);
        }
    }

}
