import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  const params = useParams()
  //states
  const [hero, setHero] = useState([])
  const [changeRender, setChangeRender] = useState(false)
  const [name, setName] = useState("")
  const [power, setPower] = useState([])
  const [color, setColor] = useState("")
  const [isAlive, setIsAlive] = useState(true)
  const [age, setAge] = useState(null)
  const [image, setImage] = useState("")

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
    const { age, color, image, isAlive, name, power } = response

    setName(name)
    setAge(age)
    setImage(image)
    setIsAlive(isAlive)
    setColor(color)
    setPower(power)
  }

  const handleDeleteHeroClick = async () => {
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

  // render form
  const handleRenderFormClick = () => {
    setChangeRender(true)
  }
  const handleHideFormClick = () => {
    setName(hero.name)
    setAge(hero.age)
    setImage(hero.image)
    setIsAlive(hero.isAlive)
    setColor(hero.color)
    setPower(hero.power)
    setChangeRender(hero.false)
  }

  // methodes for form

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePowerChange = (e) => {
    setPower(e.target.value)
  }

  const handleColorChange = (e) => {
    setColor(e.target.value)
  }

  const handleIsAliveChange = (e) => {
    setIsAlive(e.target.checked)
  }

  const handleAgeChange = (e) => {
    setAge(e.target.value)
  }

  const handleImageChange = (e) => {
    setImage(e.target.value)
  }

  const handleHeroSubmit = async (e) => {
    e.preventDefault()
    let checkPower = []
    if (typeof power === "string") {
      checkPower = power.split(",")
    }

    const changedHero = {
      slug: hero.slug,
      name: name,
      power: checkPower,
      color: color,
      isAlive: isAlive,
      age: age,
      image: image,
    }
    await fetch(`http://localhost:5000/heroes/${params.slug}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedHero),
    })
    handleHideFormClick()
  }

  return (
    <main>
      {!changeRender ? (
        <article>
          <h1>{hero.name}</h1>
          <img src={hero.image} alt={hero.name} />
          <br />
          <Link to={`/heroes/${params.slug}/powers`}>
            <button>See her/his power</button>
          </Link>
          <button onClick={handleDeleteHeroClick}>Delete this hero ?</button>
          <button onClick={handleRenderFormClick}>Change informations ?</button>
        </article>
      ) : (
        <form action="" onSubmit={handleHeroSubmit}>
          <div>
            <label htmlFor="changeName">Name : </label>
            <input
              onChange={handleNameChange}
              type="text"
              id="changeName"
              value={name}
            />
          </div>
          <div>
            <label htmlFor="changePower">Power : </label>
            <input
              onChange={handlePowerChange}
              type="text"
              id="changePower"
              value={power}
            />
          </div>
          <div>
            <label htmlFor="changeColor">Color : </label>
            <input
              onChange={handleColorChange}
              type="text"
              id="changeColor"
              value={color}
            />
          </div>
          <div>
            <label htmlFor="changeIsAlive">Alive : </label>
            <input
              onChange={handleIsAliveChange}
              type="checkbox"
              id="changeisAlive"
              checked={isAlive}
            />
          </div>
          <div>
            <label htmlFor="changeAge">Age : </label>
            <input
              onChange={handleAgeChange}
              type="number"
              id="changeAge"
              value={age}
            />
          </div>
          <div>
            <label htmlFor="changeImage">Image : </label>
            <input
              onChange={handleImageChange}
              type="url"
              id="changeImage"
              value={image}
            />
          </div>

          <button type="submit"> Change informations</button>
          <button onClick={handleHideFormClick}> Cancel</button>
        </form>
      )}
    </main>
  )
}

export default Hero
