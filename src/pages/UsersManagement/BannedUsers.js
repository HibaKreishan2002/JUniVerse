import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box, Modal } from "@mui/material";
import ResponsiveDev from '../../components/ResponsiveDev';
import JuUniVerseAxios from '../../API/JuUniVerseAxios';
import Swal from "sweetalert2";

function BannedUsers() {
  const [Data, setData] = useState([])
  const [refershPage, setRefershPage] = useState(0);
   
  useEffect(() => {
    JuUniVerseAxios.get("/users/banned").then((res) => {
      setData(res?.data?.data)
    }).catch(err => {
      setData([])

    })
  }, [refershPage])

  const handleBan=(id,username)=>{
    console.log(username);
    
  
            Swal.fire({
              title: ` Do you want to unban  "${username}" ? `,
              showCancelButton: true,
              showDenyButton: true,
              showConfirmButton: false,
              denyButtonText: `Unban`,
              denyButtonColor: "#556cd6",
        
        
            }).then((result) => {
              if (result.isDenied) {
                JuUniVerseAxios.put(`/users/${id}/unban`).then(res=>{
          
                  setRefershPage(refershPage+1)
                  Swal.fire({
                    title: "Success",
                    icon: "success",
                  });
                        }).catch(err=>{
                          console.log(err)
                        })
              }
            });
      }
   const columns = [
          {
            field: "userId", headerName: "ID", width: 120, align: 'center', headerAlign: 'center',
            resizable: false,
      
          },
          {
            field: "firstName", headerName: "First Name",
            headerAlign: 'center',
            align: 'center',
            width: 200,
            resizable: false,
      
      
          },
          {
            field: "lastName", headerName: "Last Name", headerAlign: 'center', headerAlign: 'center', align: 'center', width: 200, resizable: false,
      
          },
      
          {
            field: "email", headerName: "Email", headerAlign: 'center', align: 'center', width: 260, resizable: false,
            disableColumnMenu: true,
      
      
          },
          {
            field: "role", headerName: "Role", headerAlign: 'center', align: 'center', width: 170, resizable: false,
            disableColumnMenu: true,
      
      
          },
          {
            field: "actions", headerName: "Action", headerAlign: 'center', align: 'center', width: 200, disableColumnMenu: true,
            resizable: false,
      
      
            renderCell: (params) => (
              <>
                <Button variant="contained" color="primary" size="small" style={{ marginRight: 5 }} onClick={()=>handleBan(params.id,params.row.username)}>
                  Unban
                </Button>
             
              </>
            ),
          },
      
        ]
  
  return (
     <ResponsiveDev>
              <DataGrid rows={Data} columns={columns} pageSizeOptions={[10]}
                disableColumnSorting={true}
                disableColumnResizing={true}
                getRowClassName={(params) => `super-app-theme--${params.row.status}`}
    
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }} />
        </ResponsiveDev>
  )
}

export default BannedUsers