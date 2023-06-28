import './Board.css';
import { CellProps, BoardProps } from './model';

const Cell = ({ table, onClickCell, indexTable  } : CellProps) => {
    return (
        <div 
            onClick={() => 
            onClickCell(indexTable)} 
            className="cell flex items-center justify-center ">
                {table[indexTable]}
        </div>
    )
}

const Board = ({ table, onClickCell } : BoardProps) => {
    return (
        <>
        <div className='flex flex-col lg:flex-row w-full'>
        <section 
            className={`
                board 
                font-mono
                text-5xl 
                h-[60vh] md:h-[80vh] lg:h-[80vh] 
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


