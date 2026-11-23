import { createContext, useState} from 'react';

const CountContext = createContext();

function CounterContext({children}) {
    const [count, setCount] = useState(0)
  return (
    <CountContext.Provider value={{count, setCount}}>
        {children}
    </CountContext.Provider>
  )
}

export {CountContext}
export default CounterContext;
