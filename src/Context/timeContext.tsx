import { createContext, useEffect, useState } from "react";
import { FetchFasting } from "../helper/FetchFasting";

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
    const [fastObj, setFastObj] = useState({} as dayType);

    useEffect(() => {
        FetchFasting({ url: 'http://localhost:3004/posts', method: "GET" })
            .then(
                res => {
                    if (res !== undefined) {
                        setFastObj({
                            id: res[res.length - 1].id,
                            date: res[res.length - 1].date,
                            lipolysis: res[res.length - 1].lipolysis,
                            autophagy: res[res.length - 1].autophagy,
                            startTime: res[res.length - 1].startTime
                        })
                    }
                }
            )
    }, [])

    let data: dataProviderType = { fastObj, setFastObj }

    return (
        <TimeContext.Provider value={data}>
            {children}
        </TimeContext.Provider>
    )
}

export default TimeProvider
