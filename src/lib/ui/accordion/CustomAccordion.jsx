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
  expandedValue,
  disabledAccordion,
  onClickAccordion,
  defaultExpanded,
  backgroundColor,
  sx,
}) => {
  return (
    <Accordion
      expanded={expandedValue}
      disabled={disabledAccordion}
      onChange={onClickAccordion}
      defaultExpanded={defaultExpanded}
      sx={{ mb: 1, ...sx }}
    >
      <AccordionSummary
        sx={{ backgroundColor: 'backgroundGrey2' }}
        expandIcon={
          <ExpandMore
            fontSize='large'
            color='primary'
          />
        }
      >
        <Box
          display='flex'
          gap={2}
          alignItems='center'
        >
          {icon}
          <Typography
            color='primary'
            sx={{ textTransform: 'uppercase' }}
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
      {expandedValue === true || expandedValue === undefined ? (
        <AccordionDetails sx={{ bgcolor: backgroundColor ?? 'backgroundGrey1' }}>
          {children}
        </AccordionDetails>
      ) : null}
    </Accordion>
  )
}

export default CustomAccordion
