import React from 'react';
import { Paper,
         Grid ,
         Modal 
         } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';



import ProjectList from '../components/project/project-list/projectlist';
import { CRUDButtonGrp } from "../components/crud-btn-grp/crudbtngroup";
import { ProjectCreateForm } from '../components/project/project-curd/projectCreateForm';

const ProjectHome = (props) => {


    const useStyles = makeStyles((theme) => ({
        ProjectListPaper: {

            marginBottom: theme.spacing(2),
            margin: theme.spacing(2),
        },
        BtnGrpPaper: {
            marginTop: '72px',
            // marginBottom: theme.spacing(2),
            margin: theme.spacing(2),
            padding:'1vh',
        },
        Modal:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
        setOpen(false);
      };




    return <React.Fragment>
                <Grid container >
                        <Grid item  md={12} xs={12}>
                        
                            <Paper className={classes.BtnGrpPaper } elevation={1}>

                            <CRUDButtonGrp ButtonAction1={handleOpen}></CRUDButtonGrp>
                            </Paper>
                        </Grid>
                        <Grid item  md={12} xs={12}>
                            <Paper className={classes.ProjectListPaper} elevation={3}>
                                
                                <ProjectList></ProjectList>
                            </Paper>
                        </Grid>
                </Grid>
              
            
                <Modal
                    className={classes.Modal } 
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                >
                                    
                                  <Grid  className={classes.Modal }  item md={5} xs={10}>
                                        <ProjectCreateForm></ProjectCreateForm>
                                    
                                        </Grid>
                                        
                                </Modal>
                               
                                

            </React.Fragment>
}





export default ProjectHome;