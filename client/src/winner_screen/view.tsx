

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
            <div className="VictoryScreen-box bg-cyan-950">
                <h2 className="VictoryScreen-title mt-6">Winner:</h2>
                <p className="VictoryScreen-player">{winPlayer}</p>
                <button onClick={onClickReplay} className="VictoryScreen-replay">Replay</button>
            </div>
        </article>
    )
}

export { VictoryScreen }