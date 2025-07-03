import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'

export const renderAccordion = (label, content) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMore />}
      aria-controls='panel2a-content'
      id='panel2a-header'
    >
      <Typography>{label}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box sx={{ borderTop: '1px solid #0000001f', borderRadius: '5px' }}>
        {content.map((item, index) => (
          <Box key={index}>{item}</Box>
        ))}
      </Box>
    </AccordionDetails>
  </Accordion>
)
