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
      const [fileID, setFileID] = useState(0);
    
    
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
 const getFileByID = (fileID, transaction) => {
  console.log(transaction);
  
    JuUniVerseAxios.get(`/files/file/${fileID}`).then(res => {
      console.log(res)
   
      if (transaction == "Download") {
        console.log(transaction);
        
        handleDownload(res.data.data.fileAsBase64, "JuUnFile", res.data.data.extension)
      } else {
        console.log(transaction);

        handleView(res.data.data.fileAsBase64, res.data.data.extension)
      }
    })
      .catch(err => {

      })
  }

  const handleDownload = (base64FileContent, fileName, fileExtension) => {
    const mimeTypes = {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      xls: "application/vnd.ms-excel",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ppt: "application/vnd.ms-powerpoint",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      css: "text/css",
      html: "text/html",
      txt: "text/plain",  // Fixed incorrect MIME type
      php: "application/x-httpd-php",
      java: "text/x-java-source",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      js: "application/javascript",
      mpeg: "video/mpeg",
    };
console.log(fileName);
console.log(base64FileContent);
console.log(fileExtension);

    const mimeType = mimeTypes[fileExtension.toLowerCase()];
    if (!mimeType) {
      alert("Unsupported file type");
      return;
    }

    // Convert Base64 to binary
    const byteCharacters = atob(base64FileContent);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Create object URL
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor tag to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${fileExtension}`; // Set filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the object URL to free memory
    console.log(url);
    
    URL.revokeObjectURL(url);
  };
  const handleView = (base64FileContent, fileExtension) => {
    const mimeTypes = {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      xls: "application/vnd.ms-excel",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ppt: "application/vnd.ms-powerpoint",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      css: "text/css",
      html: "text/html",
      txt: "text/html",
      php: "application/x-httpd-php",
      java: "text/x-java-source",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      js: "application/javascript",
      mpeg: "video/mpeg",
    };

    const mimeType = mimeTypes[fileExtension.toLowerCase()];
    if (!mimeType) {
      alert("Unsupported file type");
      return;
    }

    // Convert Base64 to binary
    const byteCharacters = atob(base64FileContent);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Create object URL and open in new tab
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
    const columns = [
        { field: 'ownerUsername', headerName: 'Uploader',    width: 250,  align: 'center',    headerAlign: 'center',
          resizable: false,

        },
        { 
          field: 'folderName', 
          headerName: 'Folder Name', 
          headerAlign: 'center', 
          align: 'center', 
          width: 200, 
          resizable: false ,
          
          
        },
        { field: 'name', headerName: 'File', headerAlign: 'center', headerAlign: 'center',align: 'center',    width: 300,    resizable: false,

          renderCell: (params) => (
            <span
              style={{ cursor: "pointer", color: "#3953cd" }}
              onClick={() => getFileByID(params.id, "View")
              }
            >
              {params.value}
            </span>
          ),
        
    
        },
   
         { field: 'status', headerName: 'Download',  headerAlign: 'center',align: 'center',   width: 200,    resizable: false,
          disableColumnMenu : true,
          renderCell: (params) => (
            <>
              <Button 
    variant="contained" 
    color="primary" 
    size="small" 
    onClick={() => {
        setFileID(params.id);
        getFileByID(params.id, "Download");
        // setMenuData({ anchorEl: null });
        // console.log(menuData.selectedMsg);
    }}
>
    DOWNLOAD
</Button>
            </>
        )},  
         { fiLeld: 'action', headerName: 'Action' ,    headerAlign: 'center',align: 'center', width: 200,    disableColumnMenu :true,
          resizable: false,

          
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
    <Box style={{ height: 635, width: '100%' }}>
    <DataGrid rows={Data} columns={columns}  pageSizeOptions={[10]}
       disableColumnSorting={true}
       disableColumnResizing={true}
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