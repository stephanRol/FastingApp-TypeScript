import { createContext, useState } from "react";

export interface dayType {
    id?: number
    date: Date;
    lipolysis: boolean;
    autophagy: boolean;
    startTime: Date;
}

interface dataProviderType {
    fastObj: dayType
    setFastObj: React.Dispatch<React.SetStateAction<dayType>>
}

type TimeContextProviderProps = {
    children: React.ReactNode
}

export const TimeContext = createContext({} as dataProviderType);

const TimeProvider = ({ children }: TimeContextProviderProps) => {
    const [fastObj, setFastObj] = useState({
        date: new Date(),
        lipolysis: false,
        autophagy: false,
        startTime: new Date(0, 0, 0)
    })
    let data: dataProviderType = { fastObj, setFastObj }

    return (
        <TimeContext.Provider value={data}>
            {children}
        </TimeContext.Provider>
    )
}

export default TimeProvider
