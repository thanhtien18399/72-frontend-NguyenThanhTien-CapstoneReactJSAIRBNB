import { SET_LOCATION, SET_LOCATIONROOM, SET_SIGNIN } from "./action";
import produce from "immer";
const initialState = {
    location: null,
    locationRoom: null,
    user:null,
    isSign: false,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return produce(state, (draft) => {
                draft.location = action.payload;
            })
        case SET_LOCATIONROOM:
            return produce(state, (draft) => {
                draft.locationRoom = action.payload;
            })
            case SET_SIGNIN:
            return produce(state, (draft) => {
                draft.user = action.payload;
            })
        case "isSign":
            return produce(state, (draft) => {
                draft.isSign = action.payload;
            })
        default:
            return state;
    }
}
export default reducer;