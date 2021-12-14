import TimeProvider from '../Context/timeContext'
import Stopwatch from './Stopwatch'
import YearGrid from './YearGrid'

const FastPage = () => {
    return (
        <div>
            <TimeProvider>
                <h2>Fast Page</h2>
                <Stopwatch />
                <YearGrid />
            </TimeProvider>
        </div>
    )
}

export default FastPage
