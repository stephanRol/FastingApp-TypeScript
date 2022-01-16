import { createContext, useEffect, useReducer } from "react";
import { fastingAppReducer, actionType } from "../Reducer/reducers/fastingAppReducer";
import { firstFetch } from "../Reducer/actions/fastingAppActions";

export interface dayType {
    id?: number
    date: Date;
    lipolysis: boolean;
    autophagy: boolean;
    startTime: Date;
    timeOn: boolean;
}

interface dataProviderType {
    state: dayType
    dispatch: React.Dispatch<actionType>
}

type TimeContextProviderProps = {
    children: React.ReactNode
}

export const TimeContext = createContext({} as dataProviderType);
export const initialStateReducer = {} as dayType;

const TimeProvider = ({ children }: TimeContextProviderProps) => {
    const [state, dispatch] = useReducer(fastingAppReducer, initialStateReducer)

    useEffect(() => {
        firstFetch(dispatch);
    }, [])

    let data = { state, dispatch }

    return (
        <TimeContext.Provider value={data}>
            {children}
        </TimeContext.Provider>
    )
}

export default TimeProvider
