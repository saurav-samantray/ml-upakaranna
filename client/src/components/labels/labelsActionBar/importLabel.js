import React from "react";

import { makeStyles } from '@material-ui/core/styles';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import CloseIcon from '@material-ui/icons/Close';

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
   FormControlLabel} from '@material-ui/core';





export const ImportLabel = (props)=>{
    const {handleChange,cancelImport,onFormSubmit,setFiles,files} =props;
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
        sampleCode:{
            maxWidth:"260px",
            marginBottom:"20px"
        }

    }));
    const classes = useStyles();

    return(
        <Grid  className={classes.Modal }  item >
                                    <Card>
                                    <CardHeader className={classes.header} title="Import Label" 
                                        action={
                                            // handleClose
                                            <IconButton aria-label="close" onClick={cancelImport}>
                                                <CloseIcon />
                                            </IconButton>
                                    }/>                                 
                                    <CardContent>
                                    <div>
                                        <div className={classes.sampleCode}>

                                            <h4>Sample format</h4>
                                            
                                            <code>   
                                            [
                                                &#123;
                                                    "text": "Dog",
                                                    "suffix_key": "a",
                                                    "background_color": "#FF0000",
                                                    "text_color": "#ffffff"
                                                &#125;,
                                             </code>
                                             <br></br>
                                             <code>
                                                &#123;
                                                    "text": "Cat",
                                                    "suffix_key": "c",
                                                    "background_color": "#FF0000",
                                                    "text_color": "#ffffff"
                                                &#125;
                                            ]
                                            </code>
                                        </div>
                                        <FormControl  component="fieldset" className={classes.margin}>
                                            <FormLabel htmlFor="input-with-icon-adornment" component="legend">Select a file</FormLabel>
                                            <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                <InsertDriveFileIcon/>
                                                </InputAdornment>
                                            }
                                            accept="application/JSON"
                                            className={classes.inputFiles}
                                            id="contained-button-file"
                                            // multiple
                                            type="file"
                                            onChange={e=>handleChange(e.target.files)}
                                            />
                                        </FormControl>
                                        </div>
                                        <ButtonGroup className={classes.bottomBtngrp}>
                                            <Button variant="contained"  className={classes.cancelBtn}
                                             onClick={cancelImport}>                                   
                                                Cancel
                                            </Button>
                                        </ButtonGroup>
                                        <Button variant="contained" color="primary"  disabled={ files.length == 0 } className={classes.button}
                                            startIcon={<CloudUploadIcon />} 
                                            onClick={()=>onFormSubmit()}
                                            component="span">
                                            Upload Label
                                        </Button>    
                                    </CardContent>
                                    </Card>
                                    
                                        </Grid>
    )

}