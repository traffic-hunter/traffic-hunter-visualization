import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Traffic Hunter Visualization</h1>
      <p>Welcome to the traffic visualization dashboard.</p>
    </div>
  )
}