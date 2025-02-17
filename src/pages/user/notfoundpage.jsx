import { Link } from "react-router"
import { Button } from "../../components/ui/button"

const Notfoundpage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-6xl font-bold text-white font-Arapey">404</h1>
      <p className="text-2xl text-white mb-8 font-Arapey">Page Not Found</p>
      <Button className="rounded-xl"><Link to="/" >Return Home</Link></Button>
    </div>
  )
}

export default Notfoundpage