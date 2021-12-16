import TimeProvider from '../Context/timeContext'
import Stopwatch from './stopwatch/Stopwatch'
import YearGrid from './yearGrid/YearGrid'

const FastPage = () => {
    return (
        <div>
            <TimeProvider>
                <Stopwatch />
                <YearGrid />
            </TimeProvider>
        </div>
    )
}

export default FastPage
