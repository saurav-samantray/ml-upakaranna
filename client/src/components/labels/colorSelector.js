import  React ,{ useState } from "react";
import { SketchPicker } from 'react-color';

import { makeStyles } from '@material-ui/core/styles';
import { Chip} from '@material-ui/core';



export const ColorSelectorElem = (elemProps)=>{

    let {elementProps:props ={},colorChangeAction} =elemProps;
    let [ displayColorPicker ,setDisplayColorPicker] =useState(false);
    let [hexColor ,setHexColor] =useState(props.data.background_color)


    const handleColorPickerClick = () => {
        setDisplayColorPicker(true)
      };
    
    const handleColorPickerClose = (e) => {
        colorChangeAction(hexColor,props.data);
        setDisplayColorPicker(false);
      };
    
      const handleColorPickerChange = (color) => {
        setHexColor(color.hex)
        
      };

    const useStyles = makeStyles((theme) => ({ 
    
        color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
          },
          swatch: {
            // padding: '5px',
            // background: '#fff',
            // borderRadius: '1px',
            // boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            // display: 'inline-block',
            margin:'0 auto',
            // cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
            marginTop: '36px',
            // display: 'inline-block'
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },


  }));

  const classes = useStyles();


    return(
        <React.Fragment>
        <Chip
        onClick={(event) => {props.action.onClick(event, props.data); handleColorPickerClick()}}
        className={classes.swatch}
        style={{backgroundColor:props.data.background_color,color:props.data.text_color }}
        label={props.data.background_color}
        />
        
        { displayColorPicker ? <div className={classes.popover } >
        <div className={classes.cover } onClick={(e,hexColor)=>handleColorPickerClose(e,hexColor) }/>
        <SketchPicker color={ hexColor } onChange={handleColorPickerChange } />
      </div> : null 
        }
        </React.Fragment>
    )
};
