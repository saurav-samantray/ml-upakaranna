import React, { forwardRef, useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { useParams } from "react-router-dom";
import { SketchPicker } from 'react-color';


import { Grid, Paper ,ButtonGroup,Button,Icon,IconButton, Chip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddBox, ArrowDownward,
        Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,
        Edit,FilterList,FirstPage,LastPage,Remove,
        SaveAlt,Search,ViewColumn } from "@material-ui/icons";


import {fetchLabels,patchLabel, deleteLabel} from "./labelsAction";
import { LabelActionBar } from './labelsActionBar/labelsActionBar';
import  { ColorSelectorElem }  from "./colorSelector";

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





  

 const LabelsComponent = ()=>{
    const dispatch = useDispatch();
    let params = useParams();
    let labelsState = useSelector((state)=>state.labelReducer);
    
    let [selectedList,setSelectedList] = useState([]);
    let [dataLimit,setDataLimit]=useState(10);
    let [dataOffset,setOffsetLimit]=useState(0)
 


    const setColorChange = (color,data) => {
        let payload={
            background_color:color,
            id:data.id,
            projectId:params.projectId

        }
        console.log(data);

        dispatch(patchLabel(payload))
      };
    


    const updateSelectedList = (list)=>{
        console.log(list);
        // setSelectedList(list);
        // console.log("selectedStae",selectedList);
    }
   
    const deleteSelectItems = (event,items)=>{
        items.map(item=>{
            dispatch(deleteLabel(item.id,params.projectId))
        })
        
   


    }


    useEffect(()=>{
        let data={
            projectId:params.projectId
        }
        dispatch(fetchLabels(data))
    },[])

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
          marginBottom: theme.spacing(2),
          margin: theme.spacing(2),
          padding:'1vh',
      },
      inputFiles: {
          display: 'none',
        },



  }));

  const classes = useStyles();




  
    
  const  components={
    Action: 
        props => {
                if(props.action.icon === 'annotate'){
                    
                    return(
                   
                        <ColorSelectorElem elementProps={props} colorChangeAction ={(color,data)=>setColorChange(color,data)}/>
                    
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
            // onEditClick(null, rowData);
            // handleColorPickerClick();
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
    actionsCellStyle:{
        minWidth:"240px",
        
    }
    ,
    selection: true,
 };

 const editable= {
     isEditable: rowData => rowData.dataType === "html", 
     isDeletable: rowData => rowData.dataType === "html", 
 };
 const columns=[
    { title: 'Name', field: 'text' },
    { title: 'Short key', field: 'suffix_key' }
    ];

const localization = {
    header: {
        actions: 'Color'
    }
 }
 


  if(labelsState.loading){
    return <React.Fragment>
            <h4>loading</h4>
        </React.Fragment>   
}else{
    return <React.Fragment>
            <Grid item md={12} xs={12}>
                <Paper className={classes.BtnGrpPaper } elevation={1}>
                    <LabelActionBar offset={dataOffset} limit={dataLimit}></LabelActionBar>
                </Paper>
            </Grid>


            <MaterialTable
         editable={editable}
         title="Dataset List"
         columns={columns}
         data={labelsState.LabelList}
         actions={actions}
         options={options}
         components={components}
        //  style={{overflow: 'hidden'}}
         icons={tableIcons}
         onSelectionChange={(rows) => updateSelectedList(rows)}
         localization = {localization}
     />
        </React.Fragment>
}

}

export default LabelsComponent;