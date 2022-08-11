import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Hero from "./pages/Hero"
import Heroes from "./pages/Heroes"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Power from "./pages/Power"

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/heroes">
            <button>Heroes</button>
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heroes" element={<Heroes />} />
        <Route path="/heroes/:slug" element={<Hero />} />
        <Route path="/heroes/:slug/powers" element={<Power />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
