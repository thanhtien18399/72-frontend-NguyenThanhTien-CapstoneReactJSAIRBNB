import { message } from "antd";
import { max } from "moment";
import instance from "../../../api/instance";
export const SET_ROOM = "booking/SET_ROOM"
export const SET_SELECTROOM = "booking/SET_SELECTROOM"
export const SET_COMMENT = "booking/SET_COMMNET"
export const SET_BOOKROOM = "booking/SET_BOOKROOM"
const date = new Date();
export const fetchActionRoom = (params, cb) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/phong-thue/phan-trang-tim-kiem",
        method: "GET",
        params: {
          pageIndex: params.currentPage,
          pageSize: params.pageSize,
        },
      });
      // console.log(res.data.content.totalRow)
      cb(res.data.content.totalRow);

      dispatch({
        type: SET_ROOM,
        payload: res.data.content,
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}
export const fetchDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/phong-thue/${id}`,
        method: "GET",
      });
      dispatch({
        type: SET_SELECTROOM,
        payload: res.data.content
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const fetchCommentAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/binh-luan/lay-binh-luan-theo-phong/${id}`,
        method: "GET",
      });
      dispatch({
        type: SET_COMMENT,
        payload: res.data.content
      });
    }
    catch (err) {
      dispatch({
        type: SET_COMMENT,
        payload: []
      });
    }
  }
}

export const fetchLocationRoomAction = async (id) => {
  try {
    const res = await instance.request({
      url: `/api/vi-tri/${id}`,
      method: "GET",
    });
    return res.data.content;
  }
  catch (err) {
    console.log(err)
  }
}
// export const fetchBookRoom = (id) => {
//   return async (dispatch) => {
//     try {
//       const bookRom=[];
//       const res = await instance.request({
//         url: `/api/dat-phong`,
//         method: "GET",
//       });
//       let max=0;
//       res.data.content.map((item)=>{
//         if(item.maPhong===id){
//           if(item.ngayDi.slice(5,7)>=`${date.getMonth()+1}`){
//             if(parseInt(item.ngayDi.slice(8,10))>=date.getDate()){
//               bookRom.push(item)
//               if(max<parseInt(item.ngayDi.slice(8,10))){
//                 max=parseInt(item.ngayDi.slice(8,10));
//               }
//             }
//           }
//         }
//       })

//       dispatch({
//         type: SET_BOOKROOM,
//         payload: bookRom
//       })
//       return max;
//     }
//     catch (err) {
//       console.log(err)
//     }
//   }
// }
export const fetchBookRoomAction = (bookroom) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/dat-phong`,
        method: "POST",
        data:bookroom,
      });
      message.success("Đặt phòng thành công")
    }
    catch (err) {
     
    }
  }

}
export const fetchCommentUserAction = (comment) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: `/api/binh-luan`,
        method: "POST",
        data:comment,
      });
      message.success("Bình luận thành công thành công")
    }
    catch (err) {
     
    }
  }

}



