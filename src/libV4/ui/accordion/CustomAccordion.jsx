import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Typography,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

const CustomAccordion = ({
  children,
  icon,
  badge,
  title,
  backgroundColor,
  accordionprops,
  titleSx = {},
  titleVariant = 'body1',
  accordionSx = {},
}) => {
  return (
    <Accordion
      {...accordionprops}
      sx={{ mb: 1, ...accordionSx }}
    >
      <AccordionSummary
        className='backgroundGray2'
        expandIcon={
          <ExpandMore
            fontSize='large'
            color='primary'
          />
        }
        sx={{ ...accordionSx }}
      >
        <Box
          display='flex'
          gap={2}
          alignItems='center'
        >
          {icon}
          <Typography
            color='primary'
            variant={titleVariant}
            sx={{ textTransform: 'uppercase', ...titleSx }}
          >
            {title}
          </Typography>
          {badge !== 0 && badge && (
            <Badge
              badgeContent={badge}
              color='primary'
            />
          )}
        </Box>
      </AccordionSummary>
      {accordionprops?.expanded ? (
        accordionprops?.expanded === true ? (
          <AccordionDetails sx={{ bgcolor: backgroundColor ?? 'backgroundGray1' }}>
            {children}
          </AccordionDetails>
        ) : null
      ) : (
        <AccordionDetails sx={{ bgcolor: backgroundColor ?? 'backgroundGray1' }}>
          {children}
        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default CustomAccordion
