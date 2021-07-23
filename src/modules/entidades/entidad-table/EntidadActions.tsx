import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';

const EntidadActions = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem style={{ fontSize: 14 }} onClick={handleClose}>
          Ver
        </MenuItem>
        <MenuItem style={{ fontSize: 14 }} onClick={handleClose}>
          Editar
        </MenuItem>
        <MenuItem style={{ fontSize: 14 }} onClick={handleClose}>
          Eliminar
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default EntidadActions;