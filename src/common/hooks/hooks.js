
export const showModalSignIn = (open) => {
    return (dispatch) => {
    if(open){
        dispatch({
            type:"isSign",
            payload:true,
          })
    }else{
        dispatch({
            type:"isSign",
            payload:false,
          })
    }
}
 };
 