import  React from "react";


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



export const DatasetUpload =(props)=>{

    const { docType,files,handleChange,cancelUpload,onFormSubmit,setDocType,setFiles} =props;
    
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





    return(
        <Grid  className={classes.Modal }  item >
                                    <Card>
                                    <CardHeader className={classes.header} title="Import Dataset" 
                                        action={
                                            // handleClose
                                            <IconButton aria-label="close" onClick={cancelUpload}>
                                                <CloseIcon />
                                            </IconButton>
                                    }/>                                 
                                    <CardContent>
                                    <div>
                                        <FormControl component="fieldset">
                                        <FormLabel component="legend">Select a file format</FormLabel>
                                        <RadioGroup aria-label="file-type" name="docType" value={docType} onChange={(e)=>{setDocType(e.target.value)}}>
                                            <FormControlLabel value="plain" control={<Radio />} label="Plain Text" />
                                            <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                                            <FormControlLabel value="json" control={<Radio />} label="JSONL" />
                                        </RadioGroup>
                                        </FormControl>

                                    </div>
                                    <div>
                                        <FormControl  component="fieldset" className={classes.margin}>
                                            <FormLabel htmlFor="input-with-icon-adornment" component="legend">Select a file</FormLabel>
                                            <Input
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                <InsertDriveFileIcon/>
                                                </InputAdornment>
                                            }
                                            accept=".csv,text/csv,.txt,text/html,application/JSON"
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
                                             onClick={cancelUpload}>                                   
                                                Cancel
                                            </Button>
                                        </ButtonGroup>
                                        <Button variant="contained" color="primary"  disabled={( docType =="") || (files.length == 0)} className={classes.button}
                                            startIcon={<CloudUploadIcon />} 
                                            onClick={()=>onFormSubmit()}
                                            component="span">
                                            Upload dataset
                                            </Button>
                                    </CardContent>
                                    </Card>
                                    
                                        </Grid>
    )
}