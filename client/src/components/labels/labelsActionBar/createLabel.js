import React ,{useState}from "react";

import { makeStyles } from '@material-ui/core/styles';

import LabelIcon from '@material-ui/icons/Label';
import CloseIcon from '@material-ui/icons/Close';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PaletteIcon from '@material-ui/icons/Palette';

import { SketchPicker } from 'react-color';


import { Grid,
    ButtonGroup,
    Button,
    Card,
    CardHeader, 
    CardContent,
   IconButton,
   FormControl,
   FormLabel,
   RadioGroup,
   Radio,
   Input,
   InputLabel,
   InputAdornment,
   TextField,
   Select,
   MenuItem,
   FormHelperText,
   FormControlLabel} from '@material-ui/core';


export const CreateLabel = (props)=>{

    const {handleChange,cancelCreate,onFormSubmit} =props;
    const [hexColor ,setHexColor]=useState('') ;
    const [labelName ,setLabelName] = useState ('');
    const [labelKey, setLabelKey] = useState('');

    let labelKeys=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: 475,
          },
          header: {
            color:'white',
            backgroundColor:theme.palette.primary.main
          },
          bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
          },
          title: {
            fontSize: 14,
          },
          pos: {
            marginBottom: 12,
          },
          BtnGrpPaper: {
            marginTop: '72px',
            marginBottom: theme.spacing(2),
            margin: theme.spacing(2),
            padding:'1vh',
        },
        inputFiles: {
            // display: 'none',
          },
          Modal:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        bottomBtngrp:{
            marginTop:'10px'
        },
        cancelBtn:{
            marginRight:"5px"
        },
        SketchPicker:{
            margin:'0 auto'
        },
        colorPickerLabel:{
            paddingTop: "27px",
            marginBottom: "10px",
            display: "block",
            fontSize: '15px',
            color: 'rgba(0, 0, 0, 0.54)'
        }

    }));
    const classes = useStyles();

    const handleColorPickerChange = (color)=>{
        setHexColor(color.hex)
    }

    const onFormDataSubmit =()=>{
        console.log(labelName,labelKey,hexColor);

        let payload = {
            background_color:hexColor,
            prefix_key :null,
            suffix_key:labelKey,
            text:labelName,
        }

        onFormSubmit(payload);
    }

    return(
        <Grid  className={classes.Modal }   item >
                                    <Card style={{minWidth:"400px"}}>
                                    <CardHeader className={classes.header} title="Create Label" 
                                        action={
                                            // handleClose
                                            <IconButton aria-label="close" onClick={cancelCreate}>
                                                <CloseIcon />
                                            </IconButton>
                                    }/>                                 
                                    <CardContent>
                                        <form>
                                        <div className={classes.margin}>
                                            <Grid container spacing={1}  justify="flex-end" alignItems="flex-end">      
                                                    <Grid item xs={1} sm={1}><LabelIcon /></Grid>                               
                                                    <Grid item xs={11} sm={11}><TextField id="input-with-icon-grid" label="Label name" onChange={(e)=>setLabelName(e.target.value)}  fullWidth/></Grid>
                                                    <Grid item xs={1} sm={1}> < VpnKeyIcon/> </Grid> 
                                                    <Grid item xs={11} sm={11}>
                                                        <FormControl className={classes.formControl} fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Key</InputLabel>
                                                            <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            // value={age}
                                                            onChange={(e)=>setLabelKey(e.target.value)}
                                                            >
                                                            {
                                                                labelKeys.map((item)=>(
                                                       
                                                                <MenuItem value={item}>{item}</MenuItem>
                                                                ))
                                                            }
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid  item xs={1} sm={1}><PaletteIcon/></Grid>
                                                    <Grid  item xs={11} sm={11} ><label className={classes.colorPickerLabel}>Select label color</label></Grid>
                                                    <Grid item  xs={12} sm={12}  >               
                                                        <SketchPicker className={classes.SketchPicker} color={ hexColor } onChange={handleColorPickerChange } />
                                                    </Grid>    

                                                    <Grid item >

                                                    <ButtonGroup className={classes.bottomBtngrp}>
                                                        <Button variant="contained"
                                                        className={classes.cancelBtn}
                                                        onClick={cancelCreate}>                                   
                                                            Cancel
                                                        </Button>
                                                        <Button variant="contained" color="primary"
                                                          disabled={( labelName =="" || labelKey == "" || hexColor == "")} 
                                                        className={classes.button}
                                                            // startIcon={<CloudUploadIcon />} 
                                                            onClick={()=>onFormDataSubmit()}
                                                            component="span">
                                                            Create Label
                                                        </Button>
                                                    </ButtonGroup>

                                                    </Grid>                                           
                                            </Grid>
                                        </div>


                                        </form>
                                        
                                    {/* <div>
                                        <FormControl component="fieldset">
                                        <FormLabel component="legend">Select a file format</FormLabel>
                                        <RadioGroup aria-label="file-type" name="docType" value={docType} onChange={(e)=>{setDocType(e.target.value)}}>
                                            <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                                            <FormControlLabel value="json" control={<Radio />} label="JSONL" />
                                        </RadioGroup>
                                        </FormControl>

                                    </div>
                                        <ButtonGroup className={classes.bottomBtngrp}>
                                            <Button variant="contained"  className={classes.cancelBtn}
                                             onClick={cancelDownload}>                                   
                                                Cancel
                                            </Button>
                                        </ButtonGroup>
                                       
                                        <Button variant="contained" color="primary"  disabled={( docType =="")} className={classes.button}
                                            startIcon={<CloudUploadIcon />} 
                                            onClick={()=>onFormDataSubmit()}
                                            ref={ downloadLinkRef}

                                            component="span">
                                            Download dataset
                                        </Button> */}
                                            
                                    </CardContent>
                                    </Card>
                                    
                                        </Grid>
    )

}