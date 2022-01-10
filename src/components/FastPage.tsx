import TimeProvider from '../Context/timeContext'
import FastingChart from './fastingChart/FastingChart'
import Stopwatch from './stopwatch/Stopwatch'
import YearGrid from './yearGrid/YearGrid'

const FastPage = () => {
    return (
        <div>
            <TimeProvider>
                <Stopwatch />
                <YearGrid />
                <br /><br />
                {/* <YearGrid /> */}
                <br />
                <FastingChart />
            </TimeProvider>
        </div>
    )
}

export default FastPage
