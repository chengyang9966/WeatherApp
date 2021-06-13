import React, { useRef,useEffect,useState, useCallback } from 'react'
import CSS from 'csstype';
import * as _ from "lodash";      
// General scroll to element function

interface ScrollProps{
    children?:any,
    className?:string,
    style?:CSS.Properties 
}



const ScrollDemo = (props:ScrollProps) => {
    const scrollWrapperRef = useRef<HTMLHeadingElement>(null);
    const scrollWrapperCurrent = scrollWrapperRef.current;
    const [clickStartX, setClickStartX] = useState<any>();
    const [scrollStartX, setScrollStartX] = useState<any>();

    const timing = (1 / 60) * 1000;
    const decay = (v:any) => -0.1 * ((1 / timing) ^ 4) + v;
    const [isDragging, setIsDragging] = useState(false);
    const [lastScreenX, setLastScreenX] = useState(0);  
    const [speed, setSpeed] = useState(0);
    const [direction, setDirection] = useState(0);
    const [momentum, setMomentum] = useState(0);

    const handleLastScrollX = useCallback(  
        _.throttle((screenX:any) => {
          setLastScreenX(screenX);
        }, timing),
        []
      );
      const handleMomentum = useCallback(
        _.throttle((nextMomentum:any) => {
          setMomentum(nextMomentum);
          if(scrollWrapperRef.current){
              scrollWrapperRef.current.scrollLeft = scrollWrapperRef.current.scrollLeft + nextMomentum * timing * direction;
          }
        }, timing),
        [scrollWrapperCurrent, direction]
      );
    useEffect(() => {   
        if (!scrollWrapperRef.current) return;
      if (scrollWrapperRef.current) {
        const handleDragStart = () => {};
        const handleDragMove = () => {};
        const handleDragEnd = () => {};

            if (scrollWrapperRef.current.ontouchstart === undefined) {
              scrollWrapperRef.current.onmousedown = handleDragStart;
              scrollWrapperRef.current.onmousemove = handleDragMove;
              scrollWrapperRef.current.onmouseup = handleDragEnd;
              scrollWrapperRef.current.onmouseleave = handleDragEnd;

        }
      }
    }, [scrollWrapperCurrent]);

    useEffect(() => {
        if (direction !== 0) {
          if (momentum > 0 && !isDragging) {
            handleMomentum(decay(momentum));
          } else if (isDragging) {
            setMomentum(speed);
          } else {
            setDirection(0);
          }
        }
      }, [momentum, isDragging, speed, direction, handleMomentum]);

    const handleDragMove = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        if (clickStartX !== undefined && scrollStartX !== undefined) {
          const touchDelta = clickStartX - e.screenX;
          if(scrollWrapperRef.current){
              scrollWrapperRef.current.scrollLeft = scrollStartX + touchDelta;
              
              if (Math.abs(touchDelta) > 1) {
                setIsDragging(true);
                setDirection(touchDelta / Math.abs(touchDelta));
                setSpeed(Math.abs((lastScreenX - e.screenX) / timing));
                setLastScreenX(e.screenX);
              }
         
            }
        }
      };

      
    const handleDragStart = (e:any) => {
        setClickStartX(e.screenX);
        setDirection(0);
        if(scrollWrapperRef.current){
            setScrollStartX(scrollWrapperRef.current.scrollLeft);
        }
      };
      const handleDragEnd = () => {
        if (clickStartX !== undefined) {
          setClickStartX(undefined);
          setScrollStartX(undefined);
        }
      };
   return (
      <> 
         <div className={props.className} style={props.style} ref={scrollWrapperRef}>
             {props.children}
             </div> 
         {/* <button onClick={executeScroll}> Click to scroll </button>  */}
      </>
   )
}

export default ScrollDemo