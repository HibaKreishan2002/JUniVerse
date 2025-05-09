// import React, { useState } from 'react';
// import {
//   Box,
//   Grid,
//   Typography,
//   Divider,
//   TextField,
//   Button,
//   Checkbox,
//   Paper,
// } from '@mui/material';



// function FilesSection() {

//   const [Data,setData]=useState([])
//     const [refershPage, setRefershPage] = useState(0);
//       const [fileID, setFileID] = useState(0);
         
// useEffect(()=>{ 
//   JuUniVerseAxios.get("/dashboard/files/pending").then((res) => {
//       setData(res?.data?.data)
//     }).catch(err=>{
//       setData([])

//     }) 
// },[refershPage])
// useEffect(()=>{ 
//   JuUniVerseAxios.get("/dashboard/files/accepted").then((res) => {
//       setData(res?.data?.data)
//     }).catch(err=>{
//       setData([])

//     }) 
// },[refershPage])

//   return (
//     <> 
//     <Box textAlign="center" mb={3}>
//     <Typography
//       variant="h6"
//       sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#2e2e2e' }}
//     >
//       Last files <span style={{ fontSize: '1.2rem' }}>🪐</span>
//     </Typography>
//   </Box>

//   <Grid container spacing={4}>
//     {/* Accepted Files */}
//     <Grid item xs={12} md={6}>
//       <Paper
//         sx={{
//           padding: 3,
//           backgroundColor: '#f6f6ff',
//           minHeight: 200,
//         }}
//         elevation={1}
//       >
//         <Typography
//           variant="subtitle1"
//           sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#6861bd', mb: 2 }}
//         >
//           Accepted files
//         </Typography>
//         <Grid container>
//           <Grid item xs={4}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//               File name
//             </Typography>
//           </Grid>
//           <Grid item xs={4}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//               Uploaded at
//             </Typography>
//           </Grid>
//           <Grid item xs={4}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//               Accepted at
//             </Typography>
//           </Grid>
//         </Grid>
//         {/* When API is ready, map accepted files here */}
//       </Paper>
//     </Grid>

//     {/* Pending Files */}
//     <Grid item xs={12} md={6}>
//       <Paper
//         sx={{
//           padding: 3,
//           backgroundColor: '#f6f6ff',
//           minHeight: 200,
//         }}
//         elevation={1}
//       >
//         <Typography
//           variant="subtitle1"
//           sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#22a9d3', mb: 2 }}
//         >
//           Pending files
//         </Typography>
//         <Grid container>
//           <Grid item xs={6}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//               File name
//             </Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//               Uploaded at
//             </Typography>
//           </Grid>
//         </Grid>
//         {/* When API is ready, map pending files here */}
//       </Paper>
//     </Grid>
//   </Grid>
//   </>
//   )
// }

// export default FilesSection

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import JuUniVerseAxios from '../API/JuUniVerseAxios';

function FilesSection() {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [refreshPage, setRefreshPage] = useState(0);

  useEffect(() => {
    JuUniVerseAxios.get('/dashboard/files/accepted')
      .then(res => setAcceptedFiles(res?.data?.data || []))
      .catch(() => setAcceptedFiles([]));

    JuUniVerseAxios.get('/dashboard/files/pending')
      .then(res => setPendingFiles(res?.data?.data || []))
      .catch(() => setPendingFiles([]));
  }, [refreshPage]);

  // Define columns
  const acceptedColumns =sessionStorage.getItem("role") == "STUDENT"? [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'File Name', flex: 1 },
    { field: 'uploadDate', headerName: 'Uploaded At', flex: 1 , renderCell:(Params)=>{
const date =new Date(Params.value)
return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }},
    { field: 'monitoredAt', headerName: 'Accepted At', flex: 1  ,renderCell:(Params)=>{
      const date =new Date(Params.value)
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
          }},
  ]: [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'File Name', flex: 1 },
    { field: 'uploadDate', headerName: 'Uploaded At', flex: 1 , renderCell:(Params)=>{
const date =new Date(Params.value)
return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }},

  ];

  const pendingColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'File Name', flex: 1 },
    { field: 'uploadDate', headerName: 'Uploaded At', flex: 1 , renderCell:(Params)=>{
      const date =new Date(Params.value)
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
          }},
  ];

  return (
    <Box>
      <Box textAlign="center" mb={3}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#2e2e2e' }}
        >
          Last files <span style={{ fontSize: '1.2rem' }}>🪐</span>
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Accepted Files Table */}
        <Grid item xs={12} md={ sessionStorage.getItem("role") == "STUDENT"?6:12} sx={{marginLeft:"auto",marginRight:"auto"}}>
          <Paper sx={{ padding: 2, backgroundColor: '#f6f6ff' }} elevation={1}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#6861bd', mb: 2 }}
            >
              Uploaded Files
            </Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={acceptedFiles}
                columns={acceptedColumns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
                getRowId={(row) => row.id} // Make sure each file has a unique 'id'
              />
            </div>
          </Paper>
        </Grid>

        {/* Pending Files Table */}
        {            sessionStorage.getItem("role") == "STUDENT" ?<Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, backgroundColor: '#f6f6ff' }} elevation={1}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#22a9d3', mb: 2 }}
            >
              Pending Files
            </Typography>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={pendingFiles}
                columns={pendingColumns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
                getRowId={(row) => row.id} // Ensure each row has unique id
              />
            </div>
          </Paper>
        </Grid>:""
        }
        
      </Grid>
    </Box>
  );
}

export default FilesSection;
