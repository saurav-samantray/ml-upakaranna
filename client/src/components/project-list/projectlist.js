import React, { useEffect } from 'react';
import CustomTable from '../../components/table/table'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from './projectAction'


let getProjectsFunction
const ProjectList = (props) => {
    const dispatch = useDispatch();
    const projectList = useSelector((state) => state.projectReducer);
    getProjectsFunction = () => dispatch(getProjects());

    const tableHeader = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
        { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    ];


    useEffect(() => {
        getProjectsFunction()
    }, [])

    console.log("projectList", projectList)



    return <React.Fragment>
        <CustomTable tableData={projectList.list} tableHeader={tableHeader}></CustomTable>
    </React.Fragment>
}



export default ProjectList;