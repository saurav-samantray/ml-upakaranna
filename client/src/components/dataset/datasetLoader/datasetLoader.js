import React, {useState } from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';



import {
         ButtonGroup,
         Button,
         Modal,
       } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



import {uploadDataset, downloadDataset } from '../datasetAction';
import { DatasetUpload } from './datasetUpload';
import { DatasetDownload } from "./datasetDownload";



  export const DatasetLoader = (props)=>{
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
    const [files,setFiles]=useState([]);
    const [docType,setDocType]=useState("");
    const [modalType,setModalType] =useState("");

    const handleOpen = (type) => {
        setOpen(true);
        setModalType(type)
      };
    const handleClose = () => {
        setOpen(false);
      };


    const handleImportFileChange =(Inputfiles)=>{
        setFiles(Inputfiles[0]);
        console.log(files); 
    }


    const onUploadFormSubmit =()=>{
    
        let data={
                file:files,
                format:docType
            }
        let tablePayload={
                projectId:params.projectId,
                limit:limit,
                offset:offset
            }
        dispatch(uploadDataset(data,params.projectId,tablePayload))
       
       
    }
    const onDownloadFormSubmit =()=>{
        dispatch(downloadDataset(docType,params.projectId))

    }
    
    
    const cancelUpload=()=>{
        setDocType("");
        setFiles([]);
        setOpen(false);

    }
    const cancelDownload=()=>{
        setDocType("");
        setOpen(false);
    }

     return<React.Fragment>
                 <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button
                     variant="contained"
                     color="default"
                     className={classes.button}
                     onClick={()=>handleOpen('uploadModal')}
                     startIcon={<CloudUploadIcon />}
                    >
                       Import dataset 
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        onClick={()=>handleOpen('downloadModal')}
                        startIcon={<CloudDownloadIcon />}
                    >
                        Export dataset
                    </Button>
                    </ButtonGroup>


                    <Modal
                    className={classes.Modal } 
                                open={open}
                                onClose={modalType =='downloadModal' ? cancelDownload : cancelUpload}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                >
                                { modalType =='uploadModal'?
                                  <DatasetUpload 
                                  cancelUpload={cancelUpload}
                                  onFormSubmit={onUploadFormSubmit}
                                  handleChange={handleImportFileChange}
                                  setDocType={setDocType}
                                  setFiles ={setFiles}
                                  docType ={docType}
                                  files={files}
                                   />
                                   : 
                                  <DatasetDownload
                                    cancelDownload ={cancelDownload}
                                    onFormSubmit ={(downloadLinkRef)=>onDownloadFormSubmit(downloadLinkRef)}
                                    setDocType={setDocType}
                                    docType={docType}
                                    />
                                   
                                }
                                        
                </Modal>
          </React.Fragment>
          
    
  }