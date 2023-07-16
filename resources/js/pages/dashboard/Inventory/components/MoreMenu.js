import React from 'react';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import paperFill from '@iconify/icons-eva/paper-plane-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';
// ----------------------------------------------------------------------

function getEditPathname(array, param) {
  if(!array.length > 5) return null;
  if(array.length === 4) 
    if(array[3] !== 'display') 
      return ('/' + array[1] + '/' + array[2] + `/${array[3]}/${param}`) 
    else return ('/' + array[1] + '/' + array[2] + `/${param}`)
  if(array.length === 3) return '/' + array[1] + '/' + array[2] + `/${param}`;
  return '/' + array[1] + '/' + array[2] + `/${array[3]}/${param}`;
}

export default function MoreMenu({ handleDelete, handleOpenModalForScrap, name="Edit", deleteActive=true, document=false, scrapActive=false, id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const {pathname} = useLocation();

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {document ? (
        <MenuItem component={RouterLink} to={getEditPathname(pathname.split('/'), `document/${id}`)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={paperFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Document" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        ) : null }

        <MenuItem component={RouterLink} to={getEditPathname(pathname.split('/'), id)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={name} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {
          deleteActive ? (
            <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete}>
              <ListItemIcon>
                <Icon icon={trash2Outline} width={24} height={24} color="red"/>
              </ListItemIcon>
              <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2', color: 'red' }} />
            </MenuItem>
          ) : null
        }

        {
          scrapActive ? (
            <MenuItem sx={{ color: 'text.secondary' }} onClick={handleOpenModalForScrap}>
              <ListItemIcon>
                <Icon icon={trash2Outline} width={24} height={24}/>
              </ListItemIcon>
              <ListItemText primary="Tambah Scrap" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ): null
        }

      </Menu>
    </>
  );
}
