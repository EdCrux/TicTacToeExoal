import './Board.css';
import { CellProps, BoardProps } from './model';
import logic from './logic';

const Cell = ({ table, onClickCell, indexTable  } : CellProps) => {
    return (
        <div 
            onClick={() => 
            onClickCell(indexTable)} 
            className="
                cell 
                flex 
                items-center 
                justify-center 
                hover:bg-cyan-700 
                hover:cursor-pointer                 
                transition-all
                duration-200
                ease-in-out">
                {table[indexTable]}
        </div>
    )
}


const Board = ({ table, onClickCell } : BoardProps) => {
    return (
        <>
        <div className='flex flex-col  lg:flex-row'>
        <section 
            style={{    
                display: 'grid',
                gridTemplateColumns: `repeat(${logic.BOARD_LEN_SIZE}, 1fr)`,
                gridTemplateRows:`repeat(${logic.BOARD_LEN_SIZE}, 1fr)`,
                gap: '1rem'
            }}
            className={`
                board
                font-mono
                text-5xl
                w-[90vw]
                md:w-[100vw]
                h-[60vh] 
                md:h-[80vh] 
                lg:h-[80vh] 
                `}>

            {
                table.map((_ : any, index : number) => {
                    return <Cell 
                            key={index} 
                            table={table} 
                            onClickCell={onClickCell} 
                            indexTable={index}/>
            })}


        </section>

        </div>
        </>
    )
}

export default Board;



