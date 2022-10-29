import { SET_BOOKROOM, SET_COMMENT, SET_ROOM, SET_SELECTROOM } from "./action";
import produce from "immer";
const initialState = {
    rooms: null,
    selectRoom: null,
    comments: null,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROOM:
            return produce(state, (draft) => {
                draft.rooms = action.payload;
            })
        case SET_SELECTROOM:
            return produce(state, (draft) => {
                draft.selectRoom = action.payload;
            })
        case SET_COMMENT:
            return produce(state, (draft) => {
                draft.comments = action.payload;
            })
           
        default:
            return state;
    }
}
export default reducer;