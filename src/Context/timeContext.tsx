import { createContext, useState } from "react";

export interface dayType {
    id?: number
    date: Date;
    lipolysis: boolean;
    autophagy: boolean;
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
    })
    let data: dataProviderType = { fastObj, setFastObj }

    return (
        <TimeContext.Provider value={data}>
            {children}
        </TimeContext.Provider>
    )
}

export default TimeProvider
