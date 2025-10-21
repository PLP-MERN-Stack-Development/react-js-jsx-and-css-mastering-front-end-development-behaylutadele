import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import { fetchPosts } from '../api/api'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchPosts(page)
      .then(data => setPosts(prev => [...prev, ...data]))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [page])

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Public Posts</h1>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full p-2 mb-4 rounded border dark:bg-gray-800"
        />
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid gap-4">
          {filtered.map(post => (
            <Card key={post.id}>
              <h3 className="font-semibold">{post.title}</h3>
              <p>{post.body}</p>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={() => setPage(p => p + 1)}>Load More</Button>
        </div>
      </div>
    </Layout>
  )
}
