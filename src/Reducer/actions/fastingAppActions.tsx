import { FetchFasting } from "../../helper/FetchFasting"
import { TYPES } from "../actions/types";
import { actionType } from "../../Reducer/reducers/fastingAppReducer";
import { dayType } from "../../Context/timeContext";

const URL = "http://localhost:3004/posts";

export const firstFetch = (dispatch: React.Dispatch<actionType>) => {
    FetchFasting({ url: URL, method: "GET" })
        .then(
            res => {
                if (res !== undefined) {
                    dispatch({
                        type: TYPES.fetchData, payload: {
                            id: res[res.length - 1].id,
                            date: res[res.length - 1].date,
                            lipolysis: res[res.length - 1].lipolysis,
                            autophagy: res[res.length - 1].autophagy,
                            startTime: res[res.length - 1].startTime,
                            timeOn: res[res.length - 1].timeOn
                        }
                    })
                }
            }
        )
}

export const limitReached = (state: dayType, dispatch: React.Dispatch<actionType>) => {
    FetchFasting({ url: `${URL}/${state.id}`, method: "DELETE" })
        .then(res => {
            //POST
            FetchFasting({
                url: URL, method: "POST", fastObj: {
                    date: state.date,
                    lipolysis: state.lipolysis,
                    autophagy: state.autophagy,
                    startTime: new Date(),
                    timeOn: false,
                }
            })
        })
}

export const deleteAndPost = (state: dayType, dispatch: React.Dispatch<actionType>, booleano: boolean) => {
    //DELETE & POST
    FetchFasting({ url: `${URL}/${state.id}`, method: "DELETE" })
        .then(res => {
            //POST
            FetchFasting({
                url: URL, method: "POST", fastObj: {
                    date: state.date,
                    lipolysis: state.lipolysis,
                    autophagy: state.autophagy,
                    startTime: new Date(),
                    timeOn: booleano,
                }
            }).then(res => {
                dispatch({
                    type: TYPES.deletePost, payload: {
                        id: state.id, // OJO AQUI
                        date: booleano ? new Date() : state.date,
                        lipolysis: state.lipolysis,
                        autophagy: state.autophagy,
                        startTime: new Date(),
                        timeOn: booleano,
                    }
                })
            })
        })
}

export const firstPost = (state: dayType, dispatch: React.Dispatch<actionType>) => {
    FetchFasting({
        url: URL, method: "POST", fastObj: {
            date: new Date(),
            lipolysis: false,
            autophagy: false,
            startTime: new Date(),
            timeOn: true,
        }
    }).then(res => {
        dispatch({
            type: TYPES.firstPost, payload: {
                id: state.id! + 1, // OJO AQUI
                date: new Date(),
                lipolysis: false,
                autophagy: false,
                startTime: new Date(),
                timeOn: true,
            }
        })
    })
}

export const setLipolysisAutophagy = (state: dayType, dispatch: React.Dispatch<actionType>, lipolysisValue: boolean, autophagyValue: boolean) => {
    FetchFasting({ url: `${URL}/${state.id}`, method: "DELETE" })
        .then(res => {
            FetchFasting({
                url: URL, method: "POST", fastObj: {
                    date: state.date,
                    lipolysis: lipolysisValue,
                    autophagy: autophagyValue,
                    startTime: state.startTime,
                    timeOn: true,
                }
            }).then(res => {
                dispatch({
                    type: TYPES.deletePost, payload: {
                        id: state.id, // OJO AQUI
                        date: state.date,
                        lipolysis: lipolysisValue,
                        autophagy: autophagyValue,
                        startTime: state.startTime,
                        timeOn: true,
                    }
                })
            })
        })
}