import axios from 'axios'

const fetchPosts = async () => {
  const request = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
  const body = request.data().body
  console.log(body)
}

fetchPosts()
