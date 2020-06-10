import  React from "react";
import { useDispatch } from 'react-redux';

import { 
    Grid ,
    Card ,
    CardActions,
    CardContent ,
    CardHeader ,
    TextField,
    IconButton,
    Select,
    Button,MenuItem, Checkbox
    } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { Form, Formik, Field ,ErrorMessage } from 'formik';
import * as Yup from 'yup';


// InApp Imports

import { SelectBox } from "../../utils/selectbox/selectBox";
import { createProject } from "../projectAction.js";



const initialValues = {
    'name': '',
    'description': '',
    'guideline':"Please write annotation guideline.",
    'project_type': 'DocumentClassification',
    'resourcetype':'TextClassificationProject',
    'randomize_document_order':false,
    'collaborative_annotation':false
}

const projectTypeOptions =[
    {
        value:'DocumentClassification',
        label:'Text Classification'    
    },
    {
        value:'SequenceLabeling',
        label:'Sequence Labeling'
    },
    {
        value:'Seq2seq',
        label:'Sequence to sequence'
    },
]



export const ProjectCreateForm = (props)=>{
    const {handleClose} = props;
    const themes = useTheme();
    const dispatch =useDispatch();
    const createProjectAction= (data)=>dispatch(createProject(data));

    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: 275,
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

    }));

    const classes = useStyles();





    const onFormSubmit = (values,helperFunctions)=>{
        console.log(values)
        createProjectAction(values);


    }

    const handleChange = (event)=>{
        console.log(event);
    }


    return ( <React.Fragment>

            <Card className={classes.root}>
                <CardHeader className={classes.header} title="Add Project" 
                action={
                    // handleClose
                    <IconButton aria-label="close" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                }/>
                    <CardContent>
                        <Formik initialValues={initialValues} 
                            validationSchema={
                                Yup.object({
                                name: Yup.string().required(),
                                description: Yup.string().required(),
                                project_type: Yup.string().required(),
                                randomize_document_order:Yup.boolean(),
                                collaborative_annotation:Yup.boolean()
                                })
                            } 
                            onSubmit={onFormSubmit} >
                          {({ values, errors, touched, isSubmitting, isValidating ,handleChange ,setFieldValue }) => (
                            <Form>
                                <Field name="name" 
                                    as={TextField} 
                                    label="Project Name" 
                                    error={touched.username && errors.username ? true : false} 
                                    helperText={touched.username && errors.username ? errors.username : ''} 
                                    variant="outlined" 
                                    margin="normal" 
                                    required fullWidth>
                                </Field>
                                <ErrorMessage name='name'></ErrorMessage>
                                <Field name="description"
                                    as={TextField} 
                                    label="description" 
                                    error={touched.password && errors.password ? true : false} helperText={touched.password && errors.password ? errors.password : ''} 
                                    variant="outlined" 
                                    type="text" 
                                    margin="normal" 
                                    required fullWidth>
                                </Field>
                                <ErrorMessage name='description'></ErrorMessage>
                                <SelectBox 
                                    label ={'Project Type'}
                                    name ="project_type"
                                    values = {projectTypeOptions}
                                    selectedValue={values.project_type}
                                    onChange = { e =>{
                                        if(e.target.value == 'DocumentClassification'){
                                            setFieldValue('resourcetype', 'textClassificationProject')
                                        } else if(e.target.value == 'SequenceLabeling'){
                                            setFieldValue('resourcetype', 'SequenceLabelingProject')
                                        }else if(e.target.value == 'Seq2seq'){
                                            setFieldValue('resourcetype', 'Seq2seqProject')
                                        }
                                        setFieldValue('project_type',e.target.value)
                                    }
                                   
                                 }
                                    // value = {values.projectType}
                                />
                                <ErrorMessage name='project_type'></ErrorMessage>  
                                <label>
                                <Field 
                                    as={Checkbox}
                                    type="checkbox"
                                    name="collaborative_annotation" 
                                    variant="outlined" 
                                    margin="normal" />
                                    Share annotation
                                </label>
                                <label>
                                <Field 
                                    as={Checkbox}
                                    type="checkbox"
                                    name="randomize_document_order" 
                                    variant="outlined" 
                                    margin="normal" />
                                    Randomize order
                                </label>
                                <Button type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit} 
                                    disabled={isSubmitting}>
                                        Submit
                                </Button>                    
                            </Form>   )}

                        </Formik>
                    </CardContent>
            </Card>
        </React.Fragment>
    );
}