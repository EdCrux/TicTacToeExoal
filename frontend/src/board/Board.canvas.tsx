
enum BoardConfig {
    CELLSIZE = 230,
    LINE_WIDTH = 5,
    STROKE_STYLE = 'black'
}


type BoardInterface = {
    draw(ctx : CanvasRenderingContext2D, canvasInfo:any) : void
}

const BoardDrawer : BoardInterface = {

    draw : (ctx : CanvasRenderingContext2D, canvasInfo : any) => {
        
        const canvasHeight = canvasInfo.height * 3 * BoardConfig.CELLSIZE;
        ctx.clearRect(0,0, canvasInfo.width, canvasInfo.height)
        
        ctx.strokeStyle = BoardConfig.STROKE_STYLE;
        ctx.lineWidth = BoardConfig.LINE_WIDTH;

        // Vertical Lines
        // ctx.beginPath();
        // ctx.moveTo(BoardConfig.CELLSIZE, 0)
        // ctx.lineTo(BoardConfig.CELLSIZE, canvasHeight)
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(BoardConfig.CELLSIZE * 2, 0)
        // ctx.lineTo(BoardConfig.CELLSIZE * 2, canvasHeight)
        // ctx.stroke();

        // Horizontal Lines
        // ctx.beginPath();
        // ctx.moveTo(0, BoardConfig.CELLSIZE)
        // ctx.lineTo(canvasInfo.width, BoardConfig.CELLSIZE)
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(0, BoardConfig.CELLSIZE * 2)
        // ctx.lineTo(canvasInfo.width, BoardConfig.CELLSIZE * 2)
        // ctx.stroke();
    }
}

export default BoardDrawer;