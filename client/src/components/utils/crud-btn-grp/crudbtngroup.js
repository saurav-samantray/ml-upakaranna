import  React from "react";

import { ButtonGroup , Button } from '@material-ui/core';


export const CRUDButtonGrp = (props)=>{
   
    const {ButtonAction1,ButtonAction2, selectedList} =props;
    console.log(props)
    return(
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button onClick={ButtonAction1}>Create</Button>
            <Button  onClick={ButtonAction2} >Delete</Button>
        </ButtonGroup>
    )
}