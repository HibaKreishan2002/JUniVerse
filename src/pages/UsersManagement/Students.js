import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box, Modal } from "@mui/material";
import ResponsiveDev from '../../components/ResponsiveDev';
import JuUniVerseAxios from '../../API/JuUniVerseAxios';
import Swal from "sweetalert2";

function Students() {
    const [Data, setData] = useState([])
    const [refershPage, setRefershPage] = useState(0);

    const handleBan=(id,username)=>{
  console.log(username);
  

          Swal.fire({
            title: ` Do you want to Ban "${username}" ? `,
            showCancelButton: true,
            showDenyButton: true,
            showConfirmButton: false,
            denyButtonText: `Ban`
      
      
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
              JuUniVerseAxios.put(`/users/${id}/ban`).then(res=>{
        
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
    const handlePromote=(id,username)=>{
 

      Swal.fire({
        title: ` Do you want to Promote "${username}" ? `,
        showCancelButton: true,
        showDenyButton: true,
        showConfirmButton: false,
        denyButtonText: `Promote`
  
  
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isDenied) {
          JuUniVerseAxios.put(`/users/${id}/promote`).then(res=>{
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
  
    useEffect(() => {
      JuUniVerseAxios.get("/users/STUDENT").then((res) => {
        setData(res?.data?.data)
      }).catch(err => {
        setData([])
  
      })
    }, [refershPage])
    
      const columns = [
        {
          field: "userId", headerName: "Student's id", width: 200, align: 'center', headerAlign: 'center',
          resizable: false,
    
        },
        {
          field: "firstName", headerName: "First Name",
          headerAlign: 'center',
          align: 'center',
          width: 220,
          resizable: false,
    
    
        },
        {
          field: "lastName", headerName: "Last Name", headerAlign: 'center', headerAlign: 'center', align: 'center', width: 220, resizable: false,
    
        },
    
        {
          field: "email", headerName: "Email", headerAlign: 'center', align: 'center', width: 280, resizable: false,
          disableColumnMenu: true,
    
    
        },
        {
          field: "actions", headerName: "Action", headerAlign: 'center', align: 'center', width: 220, disableColumnMenu: true,
          resizable: false,
    
    
          renderCell: (params) => (
            <>
              <Button variant="contained" color="error" size="small" onClick={()=>handleBan(params.id,params.row.username)} sx={{ marginRight: 5 }}>
                Ban
              </Button>
              <Button variant="contained" color="primary" size="small"  onClick={()=>handlePromote(params.id,params.row.username)} >
                Promote
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

export default Students