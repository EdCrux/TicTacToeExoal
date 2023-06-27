import Canvas from './Canvas';
import React from 'react';
import BoardDrawer from './Board.canvas';

const Board = () => {

    //return <div></div>
    return <Canvas
                draw={BoardDrawer.draw} 
                width={700}
                height={500} 
            />
}

export default Board;