import axios from "axios"

export async function likePost(id, imageURL, accountAddress, postId, title, content, time) {
    let data = JSON.stringify({
        id,
        accountAddress,
        imageURL,
        title,
        content,
        time,
        postId
    })
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ix-dapp-backend.vercel.app/api/post/setlike',
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