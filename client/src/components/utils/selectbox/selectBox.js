import React from "react";

import { 
   TextField,
   MenuItem
    } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';



export const SelectBox = (props)=>{
    const { label, name, values, onChange, selectedValue } = props;
    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: 275,
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

    }));

    const classes = useStyles();

    
    
    
    return(
        <TextField
        select
        label={label}
        className={classes.textField}
        value={selectedValue}
        onChange={onChange}
        // SelectProps={{
        //   MenuProps: {
        //     className: classes.menu
        //   }
        // }}
        // helperText="Please select your role"
        margin="normal"
        variant="outlined"
      fullWidth>
        {values.map(option => (
          <MenuItem key={option.value} value={option.value} selected={selectedValue == option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );

}