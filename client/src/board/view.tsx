import './Board.css';
import { CellProps, BoardProps } from './model';
import logic from './logic';

const Cell = ({ table, onClickCell, indexTable, disabled  } : CellProps) => {
    

    return (
        <button
            disabled={disabled}
            onClick={() => 
            onClickCell(indexTable)} 
            className="
                cell 
                flex 
                items-center 
                justify-center 
                dark:hover:bg-cyan-700
                hover:bg-cyan-300
                hover:cursor-pointer                
                transition-all
                text-slate-800
                dark:text-gray-100
                duration-200
                ease-in-out">
                {table[indexTable]}
        </button>
    )
}


const Board = ({ table, disabled ,onClickCell } : BoardProps) => {
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
                            disabled={disabled}
                            onClickCell={onClickCell} 
                            indexTable={index}/>
            })}


        </section>

        </div>
        </>
    )
}

export default Board;



