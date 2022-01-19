import { useContext, useEffect, useState } from "react"
import { dayType, TimeContext } from "../Context/timeContext"
import FastingChart from './fastingChart/FastingChart'
import Stopwatch from './stopwatch/Stopwatch'
import YearGrid from './yearGrid/YearGrid'
import { FetchFasting } from "../helper/FetchFasting";


const FastPage = () => {
    const { state, dispatch } = useContext(TimeContext)
    const [data, setData] = useState<dayType[]>({} as dayType[])

    useEffect(() => {
        FetchFasting({ url: 'http://localhost:3004/posts', method: "GET" })
            .then(
                res => {
                    if (res !== undefined) {
                        setData(res)
                    }
                })
    }, [state])

    return (
        <div>
            <Stopwatch />
            <br /><br />
            <YearGrid data={data} />
            <br /><br />
            {/* <YearGrid /> */}
            <br />
            <FastingChart />

        </div>
    )
}

export default FastPage
