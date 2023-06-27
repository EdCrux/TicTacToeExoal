import React from 'react'
import { useEffect, useRef } from "react";
import './views.css';

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>,HTMLCanvasElement> & {
    draw : (context: CanvasRenderingContext2D, config : any) => void;
};

const Canvas : React.FC<CanvasProps> = ({ draw, ...props }) =>  {
   
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect( () => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const context = canvas.getContext('2d');
        if(!context) return;
        draw(context, props)


    }, [draw])

    return <canvas 
        ref={canvasRef} 
        height={props.height} 
        width={props.width} 
        />
}

export default Canvas;