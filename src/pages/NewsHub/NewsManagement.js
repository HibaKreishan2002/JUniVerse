import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box, Modal } from "@mui/material";
import ResponsiveDev from '../../components/ResponsiveDev';
import JuUniVerseAxios from '../../API/JuUniVerseAxios';
import Swal from "sweetalert2";


function NewsManagement() {
  const [Data, setData] = useState([])
  const [refershPage, setRefershPage] = useState(0);
  const [newsID, setNewsID] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [txtModelBtn, setTxtModelBtn] = useState("Save"); // Note state



  useEffect(() => {
    JuUniVerseAxios.get("/news").then((res) => {
      setData(res?.data?.data)
    }).catch(err => {
      setData([])

    })
  }, [refershPage])
  const handleSaveNews = () => {
    JuUniVerseAxios.post("/news", { title: newsTitle, content: newsContent }).then(res => {
      setNewsTitle("")
      setNewsContent("")
      setRefershPage(refershPage + 1)
      setOpenModal(false)

    }
    )

  };
  const handleEditNews = () => {
    JuUniVerseAxios.put(`/news/${newsID}`, { title: newsTitle, content: newsContent }).then(res => {
      setNewsTitle("")
      setNewsContent("")
      setNewsID(0)
      setRefershPage(refershPage + 1)
      setOpenModal(false)

    }
    )


  };
  const handleDeleteNews = (params) => {
    Swal.fire({
      title: ` Do you want to Delete "${params.row.title}" news? `,
      showCancelButton: true,
      showDenyButton: true,
      showConfirmButton: false,
      denyButtonText: `Delete`


    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        JuUniVerseAxios.delete(`/news/${params.row.id}`).then(res => {
          setNewsID(0)
          setRefershPage(refershPage + 1)
        }
        )
      }
    });

  }

  const columns = [
    {
      field: "id", headerName: "New's id", width: 200, align: 'center', headerAlign: 'center',
      resizable: false,

    },
    {
      field: "content", headerName: "Content",
      headerAlign: 'center',
      align: 'center',
      width: 280,
      resizable: false,


    },
    {
      field: "title", headerName: "Title", headerAlign: 'center', headerAlign: 'center', align: 'center', width: 200, resizable: false,

    },

    {
      field: "createdAt", headerName: "Date", headerAlign: 'center', align: 'center', width: 200, resizable: false,
      disableColumnMenu: true, renderCell:(Params)=>{
        const date =new Date(Params.value)
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
            }
      


    },
    {
      field: "actions", headerName: "Action", headerAlign: 'center', align: 'center', width: 220, disableColumnMenu: true,
      resizable: false,


      renderCell: (params) => (
        <>
          <Button variant="contained" color="error" size="small" style={{ marginRight: 5 }} onClick={() => handleDeleteNews(params)}>
            Delete
          </Button>
          <Button variant="contained" color="primary" size="small" onClick={() => {
            setTxtModelBtn("Update")
            console.log(params)
            setNewsID(params.row.id)
            setNewsTitle(params.row.title)
            setNewsContent(params.row.content)
            setOpenModal(true)
          }}>
            Edit
          </Button>
        </>
      ),
    },

  ]




  return (
    <ResponsiveDev>
      <Box sx={{ width: "100%", padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
          <Button variant="contained" color="primary" sx={{ width: "120px", alignSelf: "flex-end", marginLeft: "auto", marginBottom: 2 }}
            onClick={() => {
              setTxtModelBtn("Save")
              setOpenModal(true)

            }}>
            Add News
          </Button>      </Box>
        <Box sx={{ height: 371, width: '100%', marginTop: 2 }}>
          <DataGrid rows={Data} columns={columns} pageSizeOptions={[10]}
            disableColumnSorting={true}
            disableColumnResizing={true}
            getRowClassName={(params) => `super-app-theme--${params.row.status}`}

            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }} />
        </Box>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ width: 550, height: 350, backgroundColor: "white", padding: 3, margin: "10% auto", borderRadius: 2 }}>
          <TextField fullWidth label="Title" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} sx={{ marginBottom: 2 }} />
          <TextField fullWidth label="Content" multiline rows={6} value={newsContent} onChange={(e) => setNewsContent(e.target.value)} sx={{ marginBottom: 2 }} />
          <Box sx={{ float: 'right' }}>
            <Button variant="outlined" color="secondary" sx={{ marginRight: 1 }} onClick={() => {
              setOpenModal(false)
              setNewsTitle("")
              setNewsContent("")
              setNewsID(0)
            }}  >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
              if (txtModelBtn == 'Update') {

                handleEditNews();
              } else {
                handleSaveNews();
              }

            }} disabled={!newsTitle || !newsContent}>
              {txtModelBtn}
            </Button>
          </Box>
        </Box>
      </Modal>
    </ResponsiveDev>
  );
};

export default NewsManagement