import CounterContext from "./context/CounterContext"
import Context1 from "./contextAPI/Context1"

function App() {
 
  return (
    <div>
  <CounterContext>
    <Context1 />
  </CounterContext>
  </div>
  )
}

export default App
