import React, { useState , useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import JuUniVerseAxios from "../../API/JuUniVerseAxios";
import Events from "../../components/Events";


function News() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [newsItems,setnewsItems]=useState([])
    useEffect (() => {
    JuUniVerseAxios.get("/news").then(res=>{
        setnewsItems(res.data.data)
    })

},[])

    const handleNext = () => {
        console.log(newsItems.length);
        
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
    };
    useEffect(() => {
        const intervalId = setInterval(handleNext, 5000); // Move to next every 5 seconds

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [newsItems]);


    return (
        <> 
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "500px",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                backgroundImage: "linear-gradient(135deg, #000000 0%,rgb(166, 185, 201) 25%,rgb(155, 146, 173) 50%,rgb(65, 60, 60) 75%, #808080 100%)",
fontWeight:"bold"
            }}
        >
            <IconButton onClick={handlePrev} sx={{ position: "absolute", left: 20, color: "white" }}>
                <ArrowBackIos />
            </IconButton>
            <Box sx={{  display: "flex", flexDirection: "column" , }}>
            <Typography variant="h3" component={"div"} sx={{ fontWeight: "bold"}}>
                {newsItems[currentIndex]?.title}
            </Typography>
            <Typography variant="h5"  component={"div"}  sx={{ fontWeight: "bold" }}>
                {newsItems[currentIndex]?.content}
            </Typography>
            </Box>
            <IconButton onClick={handleNext} sx={{ position: "absolute", right: 20, color: "white" }}>
                <ArrowForwardIos />
            </IconButton>
        </Box>
        <Typography sx={{color:"black" , fontSize:"20px" , fontWeight:"bold" ,  position: "center",
    textAlign: "center",
    fontFamily: 'Courier New  monospace',
    marginTop: "20px", 
}}> Stay connected with what's going on in KASIT school!
 </Typography>
 <Events></Events>
        </>
        
    );
}

export default News;
