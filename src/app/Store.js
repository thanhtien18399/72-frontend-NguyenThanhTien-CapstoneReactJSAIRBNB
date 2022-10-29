import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import commonReducer from "../common/utils/commonSlice"
import bookingReducer from "../featurns/booking/utils/bookingSlice"
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    booking:bookingReducer,
    common:commonReducer,
})

const logger=(state)=>{
    return (next)=>{
        return (action)=>{
            //xử lý action 
            const actionList=localStorage.getItem("actionList");
            if(!actionList){
                localStorage.setItem("actionList",JSON.stringify([action]));
            }else{
                const actionListArr=JSON.parse(actionList);
                actionListArr.push(action);
                localStorage.setItem("actionList",JSON.stringify(actionListArr))
            }
            next(action);
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
)
export default store;