import { useContext, useEffect, useState } from "react"
import { dayType, TimeContext } from "../Context/timeContext"
import TimeProvider from '../Context/timeContext'
import FastingChart from './fastingChart/FastingChart'
import Stopwatch from './stopwatch/Stopwatch'
import YearGrid from './yearGrid/YearGrid'
import { FetchFasting } from "../helper/FetchFasting";


const FastPage = () => {
    const { state, dispatch } = useContext(TimeContext)
    const [data, setData] = useState<dayType[]>({} as dayType[])
    const [updatedData, setUpdatedData] = useState(false)

    useEffect(() => {
        setUpdatedData(false);
        console.log("LOG DESDE FastPage", state);
        FetchFasting({ url: 'http://localhost:3004/posts', method: "GET" })
            .then(
                res => {
                    if (res !== undefined) {
                        setData(res)
                    }
                })
    }, [state])

    useEffect(() => {
        setUpdatedData(true);
        console.log("Me renderizo desde FAST PAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", data[data.length - 1]);
    }, [data])

    return (
        <div>
            <TimeProvider>
                <Stopwatch />
                <br /><br />
                {updatedData ? <YearGrid data={data} /> : "Loading"}

                <br /><br />
                {/* <YearGrid /> */}
                <br />
                {/* <FastingChart /> */}
            </TimeProvider>
        </div>
    )
}

export default FastPage
