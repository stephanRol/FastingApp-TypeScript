import YearGrid from './YearGrid'

interface IRegister {
    time: number;
}

const FastRegister = ({ time }: IRegister) => {
    let fastObj = {
        date: new Date(),
        lipolysis: false,
        autophagy: false,
    }

    if (time > 5000) {
        fastObj.lipolysis = true;
    }
    if (time > 10000) {
        fastObj.autophagy = true;
    }

    return (
        <div>
            <h2>Fast Register</h2>
            <div>
                {time}
            </div>
            {time > 10000 ? "Mas de 10" : "Menos de 10"}
            <YearGrid fastObj={fastObj} />
        </div>
    )
}

export default FastRegister
