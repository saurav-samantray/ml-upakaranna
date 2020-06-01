import React, { useEffect } from 'react';
import CustomTable from '../../utils/table/table';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsList } from '../projectAction';


const ProjectList = (props) => {
    const dispatch = useDispatch();
    let projectState = useSelector((state) => state.projectReducer);
    
    const getProjects= ()=>dispatch(getProjectsList());

    const tableHeader = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
        { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    ];


    useEffect(() => {
        getProjects();
        
    }, [])
    if(projectState.loading){
        return <React.Fragment>
        <h4>loading</h4>
    </React.Fragment>   
    }else{
        return <React.Fragment>
                <CustomTable tableData={projectState.projectList} tableHeader={tableHeader}></CustomTable>
            </React.Fragment>
    }
}


export default ProjectList;