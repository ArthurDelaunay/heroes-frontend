import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Heroes = () => {
  //states
  const [heroes, setHeroes] = useState([])
  const [newHeroName, setNewHeroName] = useState("")

  //didMount
  useEffect(() => {
    fetchHeroes()
  }, [])

  // methodes
  const fetchHeroes = async () => {
    const request = await fetch("http://localhost:5000/heroes/")
    const response = await request.json()
    setHeroes(response)
  }

  const handleHeroChange = (e) => {
    setNewHeroName(e.target.value)
  }

  const handleSubmitClick = async (e) => {
    e.preventDefault()
    const newHero = {
      slug: newHeroName,
      name: newHeroName,
      power: [],
      color: "",
      isAlive: null,
      age: null,
      image: "",
    }
    await fetch("http://localhost:5000/heroes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHero),
    })
    fetchHeroes()
  }

  return (
    <main>
      <h1>Heroes</h1>
      <ul>
        {heroes.map((hero) => {
          return (
            <li key={hero.slug}>
              <Link to={`/heroes/${hero.slug}`}>{hero.name}</Link>
            </li>
          )
        })}
      </ul>
      <form action="" onSubmit={handleSubmitClick}>
        <input
          type="text"
          onChange={handleHeroChange}
          placeholder="add new hero"
          value={newHeroName}
        />
        <button type="submit">Add</button>
      </form>
    </main>
  )
}
export default Heroes
