import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <span className="font-bagel text-7xl text-farm-leaf-dark">404</span>
      <h1 className="text-2xl font-semibold mt-4">This path isn't on the farm</h1>
      <p className="text-muted-foreground mt-2 max-w-md">The page you're looking for has been retired, or perhaps a coconut fell on it.</p>
      <Link to="/" className="mt-6 bg-farm-leaf hover:bg-farm-leaf-dark text-white font-semibold px-6 py-3 rounded-full gentle-animation">
        Back to the farm
      </Link>
    </div>
  )
}
