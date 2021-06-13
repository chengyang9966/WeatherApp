import react from "react";
import { IconContext } from "react-icons";
import { CgPlayButton } from "react-icons/all";
import CSS from 'csstype';
interface ButtonProps{
    style?:CSS.Properties,
    containerStyle?:CSS.Properties,
    className?:string,
    onClick?:(e: any) => void
}
const button = (props: ButtonProps) => {
  return (
    <div className={props.className} style={props.containerStyle} >
     
        <IconContext.Provider value={{ size:'3rem',className:'CarosalButton',style:props.style }}>
          <div onClick={props.onClick}>
            <CgPlayButton />
          </div>
        </IconContext.Provider>

    </div>
  );
};

export default button;
