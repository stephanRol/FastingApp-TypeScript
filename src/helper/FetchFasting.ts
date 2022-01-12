import { dayType } from "../Context/timeContext"

type fetchMethod = "get" | "GET" | "post" | "POST" | "put" | "PUT" | "delete" | "DELETE";

interface IOptions {
    method: fetchMethod;
    headers: {
        'Content-Type': string;
    }
}
interface IOptionsExt extends IOptions {
    body: string;
}

interface IFetchPropsGetPutDel {
    url: string
    method: Exclude<fetchMethod, "post" | "POST">;
    fastObj?: never
}

interface IFetchPropsPost {
    url: string
    method: "post" | "POST";
    fastObj: dayType
}
type FetchProps = IFetchPropsGetPutDel | IFetchPropsPost;

export const FetchFasting = async ({ url, method, fastObj }: FetchProps) => {
    let dataResponse: dayType[];
    let date = new Date();
    let lipolysis = false;
    let autophagy = false;
    let startTime = new Date();
    let options: IOptions | IOptionsExt = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
    }

    if (fastObj !== undefined) {
        date = fastObj.date;
        lipolysis = fastObj.lipolysis;
        autophagy = fastObj.autophagy;
        startTime = fastObj.startTime;
    }
    if (method === "post" || method === "POST") {
        options = { ...options, body: JSON.stringify({ date: date, lipolysis: lipolysis, autophagy: autophagy, startTime: startTime }) }
    }
    try {
        let res = await fetch(url, options)

        if (!res.ok) {
            let objError = {
                err: true,
                status: res.status,
                statusText: res.statusText ? res.statusText : "Error occured",
            };
            throw objError;
        }
        dataResponse = await res.json();
        return dataResponse;
    } catch (error) { }
}