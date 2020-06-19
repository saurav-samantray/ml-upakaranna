import React, {useState } from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CreateIcon from '@material-ui/icons/Create';


import{ createLabel ,uploadLabel,downloadLabel } from "../labelsAction";
import { CreateLabel } from "./createLabel";
import { ImportLabel } from "./importLabel";




import {
         ButtonGroup,
         Button,
         Modal,
       } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';






  export const LabelActionBar = (props)=>{
    const {offset,limit} = props;
    const dispatch =useDispatch();
    let params = useParams();
    const useStyles = makeStyles((theme) => ({
        
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
    const [open, setOpen] = React.useState(false);
    const [modalType,setModalType] =useState("");
    const [files ,setFiles] =useState([]);

    const handleOpen = (type) => {
        setOpen(true);
        setModalType(type)
      };
    const handleClose = () => {
        setOpen(false);
      };





    const handleImportLabel =(inputFiles)=>{
        console.log(inputFiles)  
        setFiles(inputFiles)
        
    }

    const onCreateFormSubmit =(data)=>{
        let payload ={
            background_color: data.background_color,
            prefix_key: data.prefix_key,
            projectId: params.projectId,
            suffix_key: data.suffix_key,
            text: data.text,
            text_color: "#ffffff" ,
        }
        dispatch(createLabel(payload))
       
    }


     const onImportFormSubmit=()=>{
        dispatch(uploadLabel(files,params.projectId));  
     }
    
    
    const cancelImport=()=>{
        setOpen(false);

    }
    const cancelCreate=()=>{
        setOpen(false);
    }
    const downloadLabelClick = () =>{
        console.log("test",params.projectId)
        dispatch(downloadLabel(params.projectId))
    }

     return<React.Fragment>
                 <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                 <Button
                     variant="contained"
                     color="default"
                     className={classes.button}
                     onClick={()=>handleOpen('createModal')}
                     startIcon={<CreateIcon />}
                    >
                       Create label
                    </Button>
                    
                    <Button
                     variant="contained"
                     color="default"
                     className={classes.button}
                     onClick={()=>handleOpen('uploadModal')}
                     startIcon={<CloudUploadIcon />}
                    >
                       Import label 
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        onClick={downloadLabelClick}
                        startIcon={<CloudDownloadIcon />}
                    >
                        Export label
                    </Button>
                    </ButtonGroup>


                    <Modal
                    className={classes.Modal } 
                                open={open}
                                onClose={modalType =='createModal' ? cancelCreate : cancelImport}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                >
                                {
                                modalType =='createModal'?
                                  <CreateLabel 
                                  cancelCreate={cancelCreate}
                                  onFormSubmit={onCreateFormSubmit}
                                   />
                                   : 
                                  <ImportLabel
                                    cancelImport ={cancelImport}
                                    onFormSubmit ={onImportFormSubmit}
                                    handleChange={handleImportLabel}
                                    setFiles ={setFiles}
                                    files={files}
                                    
                                    />
                                   
                                }
                                        
                </Modal>
          </React.Fragment>
          
    
  }