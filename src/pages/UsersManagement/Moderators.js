import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box, Modal } from "@mui/material";
import ResponsiveDev from '../../components/ResponsiveDev';
import JuUniVerseAxios from '../../API/JuUniVerseAxios';
import Swal from "sweetalert2";

function Moderators() {
  
    
      const columns = [
        {
          field: "id", headerName: "Moderator's id", width: 200, align: 'center', headerAlign: 'center',
          resizable: false,
    
        },
        {
          field: "Fname", headerName: "First Name",
          headerAlign: 'center',
          align: 'center',
          width: 280,
          resizable: false,
    
    
        },
        {
          field: "Lname", headerName: "Last Name", headerAlign: 'center', headerAlign: 'center', align: 'center', width: 200, resizable: false,
    
        },
    
        {
          field: "Email", headerName: "Email", headerAlign: 'center', align: 'center', width: 200, resizable: false,
          disableColumnMenu: true,
    
    
        },
        {
          field: "actions", headerName: "Action", headerAlign: 'center', align: 'center', width: 220, disableColumnMenu: true,
          resizable: false,
    
    
          renderCell: (params) => (
            <>
              <Button variant="contained" color="error" size="small" style={{ marginRight: 5 }}>
                Ban
              </Button>
              <Button variant="contained" color="primary" size="small">
                Make a Students
              </Button>
            </>
          ),
        },
    
      ]
      const [Data, setData] = useState([])

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

export default Moderators