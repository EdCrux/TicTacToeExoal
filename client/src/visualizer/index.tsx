import { Player } from '../engine/model'
import './visualizer.css'

type VisualizerProps = {
    player : Player,
    board : any,
    onClickReplay : any
}

const Visualizer = ({ board, onClickReplay } : VisualizerProps) => {
    return (<div className='flex flex-col items-center justify-center lg:h-[80vh]'>
        <div className={`
                w-full               
                text-sky-50 
                lg:text-start
                text-2xl 
                font-bold
                flex
                content-center
                
        `}>
        <div className='
            flex 
            justify-center 
            flex-col 
            align-center 
            text-sky-400 
            border-r-2 
            w-6/12
            text-center
            p-2
            '>
            <div className="border-b-2 font-mono">
                <h1>Player X</h1>
            </div>
            <div>
                <h2>{board.filter((cell : any) => cell === Player.X).length}</h2>
            </div>
        </div>
        <div className='
            flex 
            justify-center 
            flex-col 
            align-center 
            w-6/12
            text-center
            dark:text-gray-100
            text-gray-600
            p-2
        '>
            <div className="border-b-2 font-mono">
                <h1>Player O</h1>
            </div>
            <div className='
                dark:text-gray-100'>
                <h2>{board.filter((cell : any) => cell === Player.O).length}</h2>
            </div>
        </div>
        </div>
        <br />
        <div className='w-full flex mt-8 justify-center'>
            <button 
                onClick={onClickReplay} 
                className="
                    bg-gradient-to-r from-cyan-500 to-blue-500 
                    px-8 
                    py-2 
                    text-3xl 
                    text-gray-100
                    font-mono 
                    rounded-2xl">Replay</button>
        </div>
        <div id="game-container"></div>        
    </div>
    )
}

export default Visualizer;