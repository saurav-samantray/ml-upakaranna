import  React,{createRef} from "react";
import { useSelector } from 'react-redux';


import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';


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
import { Link } from "react-router-dom";



export const DatasetDownload =(props)=>{
    let downloadData= useSelector(state=>state.datasetReducer.downloadDatasetURL);
    let downloadLinkRef = createRef();
    const { docType,handleChange,cancelDownload,onFormSubmit,setDocType,} =props;
    
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
        }

    }));
    const classes = useStyles();
  
    const onFormDataSubmit = ()=>{
        onFormSubmit();
        // downloadurl = window.URL.createObjectURL(downloadData)


    }
   



    return(
        <Grid  className={classes.Modal }  item >
                                    <Card>
                                    <CardHeader className={classes.header} title="Export Dataset" 
                                        action={
                                            // handleClose
                                            <IconButton aria-label="close" onClick={cancelDownload}>
                                                <CloseIcon />
                                            </IconButton>
                                    }/>                                 
                                    <CardContent>
                                    <div>
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
                                        </Button>
                                            
                                    </CardContent>
                                    </Card>
                                    
                                        </Grid>
    )
}