export async function fetchPosts(page = 1, limit = 10) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
  if (!response.ok) throw new Error('Failed to fetch data')
  return response.json()
}
