 

import { Player } from '../engine/model'
import './winnerScreen.css'

type VictoryScreenProps = {
    winPlayer : Player,
    onClickReplay : any
}

const VictoryScreen = (
    { winPlayer, onClickReplay } : VictoryScreenProps) => {
    return(
        <article className="VictoryScreen">
            <div className="
                VictoryScreen-box 
                dark:bg-gradient-to-r from-slate-800 to-slate-900
                bg-gradient-to-r from-slate-200 to-slate-300
                ">
                <h2 
                    className="
                        VictoryScreen-title 
                        mt-6 
                        text-2xl
                        text-slate-800
                        dark:bg-white-100
                        text-3xl
                        lg:text-5xl">{winPlayer !== Player.tie && 'Winner:'} &nbsp;</h2>
                <p className="
                    VictoryScreen-player 
                    text-slate-800 
                    text-5xl
                    font-mono
                ">{winPlayer}</p>
                <button 
                    onClick={onClickReplay} 
                    className="
                        VictoryScreen-replay
                        text-gray-100
                        bg-gradient-to-r from-cyan-500 to-blue-500
                        hover:bg-red-400
                        min-w-[100px]
                        font-mono
                        text-lg">Replay</button>
            </div>
        </article>
    )
}

export { VictoryScreen }