import axios from "axios";
const backendUrl = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`
    + `${process.env.REACT_APP_BACKEND_PREFIX}/`

const configuredAxios = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    timeout: 1000,

})
export const sendRequest = async ({...props}) => {
    let response = await configuredAxios.request({
        ...props
    })
    return response = formResponse(response)
}
const formResponse = (response) => {
    if (!response) return null;
    const {status, data} = response
    return {status, data}
}