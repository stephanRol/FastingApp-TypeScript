import { TYPES } from "../actions/types";
import { dayType } from "../../Context/timeContext";

export type actionType = {
    type: string;
    payload: dayType;
}

export function fastingAppReducer(state: dayType, action: actionType) {
    switch (action.type) {
        case TYPES.fetchData:
            return action.payload
        case TYPES.firstPost:
            return action.payload
        case TYPES.deletePost:
            return action.payload
        default:
            return state;
    }
}


