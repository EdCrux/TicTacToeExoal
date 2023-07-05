
import Board from './board/view'
import Visualizer from './visualizer/index';
import useBoard from './board/controller';
import { VictoryScreen } from './winner_screen/view';

function App() {

    const {
        player,
        board,
        winner,
        disable,
        onClickCell,
        onClickReplay
    } = useBoard()

    return (
        <div className="
            antialiased
 
            h-[150vh] 
            mx-auto 
            max-w-[1280px]">

            {winner && <VictoryScreen
                winPlayer={winner}
                onClickReplay={onClickReplay}
            />}
            <div className='m-4'>

                <h1 className={`
                    transition-all
                    duration-700
                    ease-in-out
                    text-gray-300 
                    font-mono
                    text-center
                    text-3xl 
                    font-bold
                    lg:text-start
                    lg:pl-4

                    dark:text-slate-100
                    text-slate-800
                    `
                }>
                    Tic-tac-toe
                </h1>
            </div>
            {/* Wrapper */}
            <div className='flex justify-center flex-wrap  w-full h-[100vh]'>

                {/* Left side */}
                <div className="w-12/12 lg:w-7/12 m-4">
                    <Board
                        table={board}
                        player={player}
                        disabled={disable}
                        onClickCell={onClickCell}
                    />
                </div>

                {/* Right side */}
                <div className="w-8/12 lg:w-4/12 m-4" >
                    <Visualizer 
                        player={player} 
                        onClickReplay={onClickReplay}
                        board={board}
                    />
                </div>
            </div>

        </div>
    )
}

export default App
