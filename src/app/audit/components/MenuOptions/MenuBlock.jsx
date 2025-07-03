import React, { useState, useEffect, Fragment } from 'react'
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import { useLocation, useNavigate } from 'react-router-dom'

const MenuBlock = ({ title, options }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState({})

  // Abrir automáticamente el Collapse si la ruta actual coincide con una sub-opción

  useEffect(() => {
    options.forEach((option, index) => {
      if (option.options) {
        option.options.forEach((subOption) => {
          if (pathname === subOption.path) {
            setOpen((prevOpen) => ({
              ...prevOpen,
              [index]: true,
            }))
          }
        })
      }
    })
  }, [pathname, options])

  const handleClick = (index) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index],
    }))
  }

  const stylesTitle = {
    margin: '20px 100px 10px 0px',
    backgroundColor: theme.palette.primary.main,
    padding: '10px',
    paddingRight: '200px',
    borderRadius: '0 20px 20px 0',
    color: theme.palette.primary.contrastText,
  }

  return (
    <>
      <div style={stylesTitle}>{title ?? ''}</div>
      <List>
        {options.map(({ icon, label, path, options: subOptions, privilege }, index) => (
          <Fragment key={index}>
            {privilege && (
              <ListItemButton
                selected={path ? pathname === path : null}
                onClick={() => {
                  if (path) {
                    navigate(path)
                  } else {
                    handleClick(index)
                  }
                }}
              >
                <ListItemIcon>{icon ?? null}</ListItemIcon>
                <ListItemText
                  primary={label ?? ''}
                  primaryTypographyProps={{
                    style: {
                      wordBreak: 'break-word',
                    },
                  }}
                />
                {subOptions ? open[index] ? <ExpandLess /> : <ExpandMore /> : null}
              </ListItemButton>
            )}

            {subOptions && (
              <Collapse
                in={open[index]}
                timeout='auto'
                unmountOnExit
              >
                <List
                  component='div'
                  disablePadding
                >
                  {subOptions.map(
                    (
                      { label: subLabel, icon: subIcon, path: subPath, privilege: subPrivilege },
                      subIndex
                    ) => (
                      <React.Fragment key={subIndex}>
                        {subPrivilege && (
                          <ListItemButton
                            selected={pathname === subPath}
                            onClick={() => navigate(subPath)}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subIcon ?? null}</ListItemIcon>
                            <ListItemText
                              primary={subLabel ?? ''}
                              primaryTypographyProps={{
                                style: {
                                  wordBreak: 'break-word',
                                },
                              }}
                            />
                          </ListItemButton>
                        )}
                      </React.Fragment>
                    )
                  )}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
    </>
  )
}

export default MenuBlock
