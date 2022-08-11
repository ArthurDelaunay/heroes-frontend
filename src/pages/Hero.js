import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  const params = useParams()
  //states
  const [hero, setHero] = useState([])

  //didMount
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  // methodes

  const fetchData = async () => {
    const request = await fetch(`http://localhost:5000/heroes/${params.slug}`)
    const response = await request.json()
    setHero(response)
  }

  const handleDeleteClick = async () => {
    const request = await fetch(`http://localhost:5000/heroes/${params.slug}`, {
      method: "DELETE",
    })
    const response = await request.json()
    if (request.status === 200) {
      navigate("/heroes")
    } else if (request.status === 404) {
      alert(response)
    }
  }

  return (
    <main>
      <article>
        <h1>{hero.name}</h1>
        <img src={hero.image} alt={hero.name} />
        <Link to={`/heroes/${params.slug}/powers`}>
          <button>See her/his power</button>
        </Link>
        <button onClick={handleDeleteClick}>Delete this hero ?</button>
      </article>
    </main>
  )
}

export default Hero
