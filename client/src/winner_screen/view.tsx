 

import { Player } from '../board/model'
import './winnerScreen.css'

type VictoryScreenProps = {
    winPlayer : Player,
    onClickReplay : any
}

const VictoryScreen = (
    { winPlayer, onClickReplay } : VictoryScreenProps) => {
    return(
        <article className="VictoryScreen">
            <div className="VictoryScreen-box dark:bg-gradient-to-r from-slate-800 to-slate-900 ">
                <h2 className="VictoryScreen-title mt-6">Winner:</h2>
                <p className="VictoryScreen-player">{winPlayer}</p>
                <button onClick={onClickReplay} className="VictoryScreen-replay bg-gradient-to-r from-cyan-500 to-blue-500 ">Replay</button>
            </div>
        </article>
    )
}

export { VictoryScreen }