import axios from "axios"

export async function getLikedPost(address) {
    let data = JSON.stringify({ "id" : address })
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ix-dapp-backend.vercel.app/api/post/getlike',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    }

    try {
        const response = await axios.request(config)
        if(response.data.response === null)
            return []
        return response.data.response.ixposts
    } catch (error) {
        console.log(error)
    }
}