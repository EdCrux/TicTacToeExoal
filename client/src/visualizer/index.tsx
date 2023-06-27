import './visualizer.css'
import characters from '../assets/characters.png';

const Visualizer = ({ player }) => {

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
            >Turn of: <span className={player === 'X' ? `text-amber-400` : `text-sky-50` }> {player}</span>
        </h1>

        
    </>)
}

export default Visualizer;