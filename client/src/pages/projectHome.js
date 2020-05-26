import React from 'react';
import ProjectList from '../components/project-list/projectlist'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const ProjectHome = (props) => {


    const useStyles = makeStyles((theme) => ({
        paper: {

            marginBottom: theme.spacing(2),
            margin: theme.spacing(2),
            marginTop: '72px'
        }
    }));
    const classes = useStyles();

    return <Paper className={classes.paper} elevation={3}>
        <ProjectList></ProjectList>
    </Paper>
}



export default ProjectHome;