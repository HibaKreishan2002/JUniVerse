import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import JuUniVerseAxios from "../../API/JuUniVerseAxios";
import { SellTwoTone } from '@mui/icons-material';
import ResponsiveDev from '../../components/ResponsiveDev';
import Swal from 'sweetalert2';




function FilesManagement() {
    const [Data,setData]=useState([])
    const [refershPage, setRefershPage] = useState(0);
    
useEffect(()=>{ 
    JuUniVerseAxios.get("files/file/pending").then((res) => {
        setData(res?.data?.data)
      }).catch(err=>{
        setData([])

      }) 
},[refershPage])


const onAcceptBtn=(params)=>{
  console.log(params);
  
   Swal.fire({
                        title:`Do you want to Accept this file?` ,
                        showCancelButton: true,
                        showConfirmButton:true,
                        confirmButtonText: `Yes`
  
  
                      }).then((result) => {
                        if (result.isConfirmed) {
                          JuUniVerseAxios.put(`/files/file/${params.id}/accept`).then(res=>{
                            setRefershPage(refershPage+1)
                          })
                          console.log(params);
                          
  
                        } 
                      });

}
const onRejectBtn=(params)=>{ console.log(params);
  
  Swal.fire({
                       title:`Do you want to Reject this file?` ,
                       showCancelButton: true,
                       showConfirmButton:true,
                       confirmButtonText: `Yes`
 
 
                     }).then((result) => {
                       if (result.isConfirmed) {
                         JuUniVerseAxios.put(`/files/file/${params.id}/reject`).then(res=>{
                           setRefershPage(refershPage+1)
                         })
                         console.log(params);
                         
 
                       } 
                     });


}
    const columns = [
        { field: 'ownerUsername', headerName: 'Uploader',    width: 250,  align: 'center',    headerAlign: 'center',
          resizable: false,

        },
        { field: 'name', headerName: 'File', headerAlign: 'center', headerAlign: 'center',align: 'center',    width: 450,    resizable: false,

        },
   
         { field: 'status', headerName: 'Status',  headerAlign: 'center',align: 'center',   width: 200,    resizable: false,

         },     { field: 'action', headerName: 'Action' ,    headerAlign: 'center',align: 'center', width: 250,    resizable: false,

          renderCell: (params) => (
            <>
              <Button variant="contained" color="success" size="small" sx={{ mr: 1 }} onClick={()=>onAcceptBtn(params)}>
                Accept
              </Button>
              <Button variant="contained" color="error" size="small" onClick={()=>onRejectBtn(params)}>
                Reject
              </Button>
            </>
          ),
         },

    ]
  return (
    <ResponsiveDev>
    <Box style={{ height: 300, width: '100%' }}>
    <DataGrid rows={Data} columns={columns}  pageSizeOptions={[10]}
       disableColumnFilter={true}
       disableColumnSorting={true}
       disableColumnResizing 
       disableColumnMenu={true}
       getRowClassName={(params) => `super-app-theme--${params.row.status}`}

       initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }} />
  </Box>
  </ResponsiveDev>
  )
}

export default FilesManagement