import axios from "axios"

export async function dislikePost(id, accountAddress, postId) {
    let data = JSON.stringify({
        id,
        accountAddress,
        postId
    })
      
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://ix-dapp-backend.vercel.app/api/post/deletelike',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    }
     
    try {
        const response = await axios.request(config)
        console.log(response.data)
    }
      catch (error) {
        console.log(error)
    }
}