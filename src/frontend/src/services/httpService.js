import axios from "axios";
const backendUrl = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`
    + `${process.env.REACT_APP_BACKEND_PREFIX}/`

const configuredAxios = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    retries: 5,
    retryDelay: (retryCount) => retryCount*2000
})
export const sendRequest = async ({...props}) => {
        let response = await configuredAxios.request({
            ...props
        }).catch((err) => {
                console.log(`API call failed with error: ${err.message}`);

        });
        return formResponse(response)
    }
const formResponse = (response) => {
    if (!response || !response.data) return {};
    const {status, data} = response
    return {status, data}
}