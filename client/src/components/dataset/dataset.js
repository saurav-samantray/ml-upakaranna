import React, {useEffect,forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatasets, deleteDataset  } from './datasetAction';
import {useParams} from 'react-router-dom';
import  CustomTable  from "../utils/table/table";
import MaterialTable from 'material-table';
import { AddBox, ArrowDownward } from "@material-ui/icons";



import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



import { Grid, Paper ,ButtonGroup,Button,Icon,IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatasetLoader } from './datasetLoader/datasetLoader';



const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };




let getDatasetsFunction
const DatasetComponent = (props) => {
    const dispatch = useDispatch();

    let [selectedList,setSelectedList] = useState([]);
    let[dataLimit,setDataLimit]=useState(10);
    let[dataOffset,setOffsetLimit]=useState(0)
    const useStyles = makeStyles((theme) => ({
       
         
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
            // marginBottom: theme.spacing(2),
            // margin: theme.spacing(2),
            padding:'1vh',
        },
        inputFiles: {
            display: 'none',
          },

    }));

    const classes = useStyles();

    let params = useParams();
    let datasetState = useSelector((state) => state.datasetReducer);
    // let {loading ,dataSetList:{count ,next,previous,results: DatasetList} } = useSelector((state) => state.datasetReducer);
    // console.log(count,next,previous,DatasetList,loading);
    getDatasetsFunction = () =>{
        let payload={
            projectId:params.projectId,
            limit:dataLimit,
            offset:dataOffset
        }

        dispatch(getDatasets(payload))
    } ;
    // const tableHeader = [
    //     { id: 'text', numeric: false, disablePadding: true, label: 'Text' },
    //     { id: 'metadata', numeric: false, disablePadding: true, label: 'Metadata' },
        
    //   ];
    let limit=10;
    let offset=0;

    

    const updateSelectedList = (list)=>{
        console.log(list);
        setSelectedList(list);
        console.log("selectedStae",selectedList);
    }
   
    const deleteSelectItems = (event,items)=>{
        let tablePayload={
            projectId:params.projectId,
            limit:dataLimit,
            offset:dataOffset
        }
        items.map(item=>{
            dispatch(deleteDataset(params.projectId,item.id,tablePayload))
        })
        
        // dispatch(getDatasets(payload))


    }


    useEffect(()=>{
        console.log("Make service call here...")
        getDatasetsFunction()
    },[])

    console.log("DatasetList", datasetState.dataSetList)


    
   const  components={
        Action: 
            props => {
                    if(props.action.icon === 'annotate'){
                        return(
                        <Button
                        onClick={(event) => props.action.onClick(event, props.data)}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                        size="small"
                        >
                        Annotate
                        </Button>
                        )
                    }
                    if(props.action.icon === 'delete'){
                        return(
                            <IconButton aria-label="delete" size="small"
            //    disabled={props.data.email === 'admin@pipilika.com'}
               onClick={(event) => props.action.onClick(event, props.data)}
               >
               <DeleteOutline/>
           </IconButton>
                        )
                    }
                }
    }
 
    const actions = [
        {
            icon: 'annotate',
            tooltip: 'annotate',
            position:'row',
            onClick: (event, rowData) => {
                this.onEditClick(null, rowData._id);
            }
        },
        {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (event,selectedList) => deleteSelectItems(null,selectedList)
          }
    ];
 
 
     const options= {
        //  showTitle: false,
         actionsColumnIndex: -1,
        //  searchFieldStyle: {
        //      color: "#fff"
        //  },
         selection: true,
     };
 
     const editable= {
         isEditable: rowData => rowData.dataType === "html", 
         isDeletable: rowData => rowData.dataType === "html", 
     };
     const columns=[
        { title: 'Text', field: 'text' },
        { title: 'Metadata', field: 'meta' }];
 
 

    if(datasetState.loading){
        return <React.Fragment>
                <h4>loading</h4>
            </React.Fragment>   
    }else{
        return <React.Fragment>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.BtnGrpPaper } elevation={1}>
                        <DatasetLoader offset={dataOffset} limit={dataLimit}></DatasetLoader>
                    </Paper>
                </Grid>


                <MaterialTable
             editable={editable}
             title="Dataset List"
             columns={columns}
             data={datasetState.dataSetList}
             actions={actions}
             options={options}
             components={components}
            //  style={{overflow: 'hidden'}}
             icons={tableIcons}
             onSelectionChange={(rows) => updateSelectedList(rows)}
         />
            </React.Fragment>
    }
}



export default DatasetComponent;