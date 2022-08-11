import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Power = () => {
  const params = useParams()
  //states
  const [powers, setPowers] = useState([])
  const [hero, setHero] = useState(null)
  const [newPower, setNewPower] = useState("")

  //didMount
  useEffect(() => {
    fetchPowers()
    fetchHero()
    // eslint-disable-next-line
  }, [])

  // methodes
  const fetchPowers = async () => {
    const request = await fetch(
      `http://localhost:5000/heroes/${params.slug}/powers`
    )
    const response = await request.json()
    setPowers(response)
  }

  const fetchHero = async () => {
    const request = await fetch(`http://localhost:5000/heroes/${params.slug}`)
    const response = await request.json()
    setHero(response)
  }

  const handleDeleteClick = async (power) => {
    await fetch(`http://localhost:5000/heroes/${params.slug}/powers/${power}`, {
      method: "DELETE",
    })
  }
  const handleSubmitClick = async (e) => {
    e.preventDefault()
    const newHero = { ...hero }
    newHero.power = newPower
    console.log(newHero)
    setHero(newHero)

    const request = await fetch(
      `http://localhost:5000/heroes/${params.slug}/powers`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHero),
      }
    )
    console.log(await request.json())
  }

  const handleNewPowerChange = (e) => {
    setNewPower(e.target.value)
  }

  return (
    <main>
      <article>
        <h1>Powers</h1>

        <ul>
          {powers.map((power) => {
            return (
              <li key={power}>
                <span>{power} </span>
                <button onClick={() => handleDeleteClick(power)}>
                  Delete this power ?
                </button>
              </li>
            )
          })}
        </ul>
        <form action="" onSubmit={handleSubmitClick}>
          <input
            type="text"
            onChange={handleNewPowerChange}
            placeholder="add new power"
            value={newPower}
          />
          <button type="submit">Add</button>
        </form>
      </article>
    </main>
  )
}

export default Power
