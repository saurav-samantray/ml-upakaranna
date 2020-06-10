import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  export const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { selectedItems } = props;
    const numSelected = selectedItems.length;
    const deleteProjects=(items)=>{
      console.log("IN enhancer",items)
    }
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          
          null
          
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete project">
            <IconButton aria-label="delete" onClick={(selectedItems)=>deleteProjects(selectedItems)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : ( null )}
      </Toolbar>
    );
  };
  
  