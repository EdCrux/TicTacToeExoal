
import Board from './board/view'
import Visualizer from './visualizer/index';
import useBoard from './board/controller';

function App() {

  const {
    player,
    board,
    winner,
    onClickCell
  } = useBoard()

  return (
    <div className="bg-cyan-950 h-[150vh]">
    {winner && <h1 className={`transition-all
                duration-700
                ease-in-out
                pt-10
                lg:pl-4
                lg:pt-10
                text-amber-400 
                font-mono
                text-center
                lg:text-start
                text-3xl 
                font-bold
                `}>{winner} you win! </h1>}

    <h1 className={`
                transition-all
                duration-700
                ease-in-out
                pt-10
                lg:pl-4
                lg:pt-10
                text-amber-400 
                font-mono
                text-center
                lg:text-start
                text-3xl 
                font-bold
                `
                }>
          Tic-tac-toe
    </h1>
    {/* Wrapper */}
    <div className='w-full h-[100vh]'>

      {/* Left side */}
      <div className="flex lg:float-left w-12/12 lg:w-5/12 m-4">
          <Board
              table={board} 
              player={player} 
              onClickCell={onClickCell} 
            />
      </div>

      {/* Right side */}
      <div className='lg:float-right w-12/12 lg:w-6/12' >
        <Visualizer player={player} />
      </div>

    </div>
    
    </div>
  )
}

export default App
