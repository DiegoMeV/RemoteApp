import { Box, Slide } from "@mui/material"

const SlideContainer = ({ openSidebar, children }) => {
  return (
    <Slide
      in={openSidebar}
      direction='left'
    >
      <Box
        width='100%'
        backgroundColor='backgroundWhite1'
        height='100%'
      >
        {children}
      </Box>
    </Slide>
  )
}

export default SlideContainer
