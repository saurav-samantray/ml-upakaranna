import React, {useState } from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CreateIcon from '@material-ui/icons/Create';



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

    const handleOpen = (type) => {
        setOpen(true);
        setModalType(type)
      };
    const handleClose = () => {
        setOpen(false);
      };





    const onUploadFormSubmit =()=>{
    
     
        let tablePayload={
                projectId:params.projectId,
                limit:limit,
                offset:offset
            }
        // dispatch(uploadDataset(data,params.projectId,tablePayload))
       
       
    }
    const onDownloadFormSubmit =()=>{
       

    }
    
    
    const cancelUpload=()=>{
        setOpen(false);

    }
    const cancelDownload=()=>{
        setOpen(false);
    }

     return<React.Fragment>
                 <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                 <Button
                     variant="contained"
                     color="default"
                     className={classes.button}
                     onClick={()=>handleOpen('uploadModal')}
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
                        onClick={()=>handleOpen('downloadModal')}
                        startIcon={<CloudDownloadIcon />}
                    >
                        Export label
                    </Button>
                    </ButtonGroup>


                    <Modal
                    className={classes.Modal } 
                                open={open}
                                onClose={modalType =='downloadModal' ? cancelDownload : cancelUpload}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                >
                                {
                                // modalType =='uploadModal'?
                                //   <DatasetUpload 
                                //   cancelUpload={cancelUpload}
                                //   onFormSubmit={onUploadFormSubmit}
                                //   handleChange={handleImportFileChange}
                                //   setDocType={setDocType}
                                //   setFiles ={setFiles}
                                //   docType ={docType}
                                //   files={files}
                                //    />
                                //    : 
                                //   <DatasetDownload
                                //     cancelDownload ={cancelDownload}
                                //     onFormSubmit ={(downloadLinkRef)=>onDownloadFormSubmit(downloadLinkRef)}
                                //     setDocType={setDocType}
                                //     docType={docType}
                                //     />
                                   
                                }
                                        
                </Modal>
          </React.Fragment>
          
    
  }