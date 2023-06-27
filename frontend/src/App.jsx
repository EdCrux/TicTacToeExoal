import Board  from './board/Board'
import Visualizer from './visualizer/Visualizer'


function App() {

  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <div className='bg-slate-900'> 
        <Board />
        <Visualizer />
      </div>
    </>

  )
}

export default App
