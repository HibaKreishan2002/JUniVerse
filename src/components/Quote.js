import React, { useState ,useEffect} from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import JuUniVerseAxios from '../API/JuUniVerseAxios';

function Quote() {
  const [quote, setQuote] = useState('');
  const [quoteInput, setQuoteInput] = useState('');
  const [refershPage, setRefershPage] = useState(0);

  const updateQuote = () => {
    if (quoteInput.trim()) {
      JuUniVerseAxios.put(`/dashboard/quotes?quote=${quoteInput}`).then(()=>{
        setQuote(`“${quoteInput}”`);
      setQuoteInput('');
        setRefershPage(refershPage+1)
        
      })
 
    }
  };
  useEffect(() => {
    JuUniVerseAxios.get("/dashboard/quotes/quote").then((res) => {
      setQuote(res?.data?.data)
    }).catch(err => {

    })
  }, [refershPage])

  return (
    <>
      <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
        Today's quote
      </Typography>
      <Box display="flex" alignItems="flex-start" mt={2} mb={2}>
        <Box sx={{ width: '4px', bgcolor: '#6861bd', marginRight: 2 }} />
        <Typography variant="body2" sx={{ fontStyle: 'italic' }} >
          {quote}
        </Typography>
      </Box>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Update the quote..."
        value={quoteInput}
        onChange={(e) => setQuoteInput(e.target.value)}
        onFocus={()=>{
          setQuoteInput(quote)
        }}
        sx={{ mb: 1 }}
      />
      <Button
        variant="contained"
        sx={{ bgcolor: '#22a9d3', textTransform: 'none' }}
        onClick={updateQuote}
      >
        Update Quote
      </Button>
    </>
  );
}

export default Quote;
