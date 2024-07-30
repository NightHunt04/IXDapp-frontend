import axios from 'axios'
import jsonp from 'jsonp'

export async function generateImage (_prompt) {
    console.log(_prompt)
    _prompt = _prompt.trim().replace(' ', '+').trim()
    const URL = import.meta.env.VITE_APP_IMG_GEN_KASTG_API_URL
    const API_KEY = import.meta.env.VITE_APP_IMG_GEN_KASTG_API_KEY
    const TARGET = `${URL}key=${API_KEY}&prompt=${_prompt}`
    console.log('target', TARGET)

    const options = {
        method: 'POST',
        url: 'https://http-cors-proxy.p.rapidapi.com/',
        headers: {
            'x-rapidapi-key': '7264c0698emsh8e04d51884fb66ep1a08f0jsnd21ad7509f71',
            'x-rapidapi-host': 'http-cors-proxy.p.rapidapi.com',
            'Content-Type': 'application/json',
            Origin: 'www.example.com',
            'X-Requested-With': 'www.example.com'
        },
        data: {
            url: TARGET
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data.result[0].url
    } catch (error) {
        console.error(error);
    }
    return
}
