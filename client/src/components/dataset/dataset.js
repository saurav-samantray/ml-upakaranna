import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDatasets } from './datasetAction'
import {useParams} from 'react-router-dom'

let getDatasetsFunction
const DatasetPage = (props) => {
    const dispatch = useDispatch();
    let params = useParams();
    const DatasetList = useSelector((state) => state.datasetReducer);
    getDatasetsFunction = (id,limit,offset) => dispatch(getDatasets(id,limit,offset));
    const tableHeader = [
        { id: 'text', numeric: false, disablePadding: true, label: 'Text' },
        { id: 'metadata', numeric: false, disablePadding: true, label: 'Metadata' },
        { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
      ];


    useEffect(()=>{
        console.log("Make service call here...")
        getDatasetsFunction(params.projectId,10,0)
    },[])

    console.log("DatasetList", DatasetList)

 

    return <React.Fragment>

        {/* <CustomTable tableData={DatasetList.list} tableHeader={tableHeader}></CustomTable> */}

    </React.Fragment>
}



export default DatasetPage;