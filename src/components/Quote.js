import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

function Quote() {
  const [quote, setQuote] = useState(
    '“When we strive to become better than we are, everything around us becomes better too.”'
  );
  const [quoteInput, setQuoteInput] = useState('');

  const updateQuote = () => {
    if (quoteInput.trim()) {
      setQuote(`“${quoteInput}”`);
      setQuoteInput('');
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
        Today's quote
      </Typography>
      <Box display="flex" alignItems="flex-start" mt={2} mb={2}>
        <Box sx={{ width: '4px', bgcolor: '#6861bd', marginRight: 2 }} />
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
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
