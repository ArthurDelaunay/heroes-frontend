import { useState, useEffect } from "react"

const Home = () => {
  //states
  const [title, setTitle] = useState("")

  //didMount
  useEffect(() => {
    fetchData()
  }, [])

  // methodes
  const fetchData = async () => {
    const request = await fetch("http://localhost:5000/")
    const response = await request.json()
    setTitle(response)
  }

  return (
    <>
      <main>
        <h1>{title}</h1>
      </main>
    </>
  )
}
export default Home
