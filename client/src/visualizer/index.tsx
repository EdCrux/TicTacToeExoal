import { Player } from '../board/model'
import './visualizer.css'

//import characters from '../assets/characters.png';

type VisualizerProps = {
    player : Player
}

const Visualizer = ({ player } : VisualizerProps) => {

    return (<>
        <h1 
            className={`                
                text-sky-50 
                font-mono
                text-center
                lg:text-start
                text-3xl 
                font-bold
            `}
            >Turn of: 
                <span 
                    className={player === 'X' ? `text-amber-400` : `text-sky-50` }> 
                    {player}</span>
        </h1>

        
    </>)
}

export default Visualizer;