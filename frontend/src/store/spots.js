import { csrfFetch } from './csrf';


//action
const ADD_SPOT = "spots/ADD_SPOT"
const addSpot = (spot)=>{
    return {
        type:ADD_SPOT,
        payload:spot
    }
}


//thunk

export const displaySpot = () => async (dispatch) =>{
    const response = await csrfFetch('/api/spots')
    const data = await response.json();
    console.log(data)
    dispatch(addSpot(data.Spots));
    return response
}


const intialState = {}

const spotsReducer = (state=intialState, action) =>{
    let newState;
    switch(action.type) {
        case ADD_SPOT:
            newState = Object.assign({},state);
            action.payload.forEach((element) =>{
                newState[element.id] = element
            })
            // newState = action.payload
            return newState; 
        default:
            return state
    }
}




export default spotsReducer