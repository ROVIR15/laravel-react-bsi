import * as React from 'react';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Autocomplete,
  Button,
  CardActions,
  Grid,
  MenuItem,
  Select,
  TextField
} from '@mui/material';

import { useFormik, Form, FormikProvider } from 'formik';

// Components
import API from '../../../../../helpers';

import { isNull, isArray, isEmpty, isString, isUndefined } from 'lodash';
import Table from './TableCosting';
import { useLocation, useParams } from 'react-router-dom';
import { isEditCondition } from '../../../../../helpers/data';

import { IconButton, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import closeCircle from '@iconify/icons-eva/close-outline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};

export default function BasicModal({
  update,
  open,
  handleClose,
  list,
  selected,
  setSelected,
}) {
  const { id } = useParams();

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Items
              </Typography>
              <IconButton onClick={handleClose} color="error">
                <Icon icon={closeCircle} />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Table
              initialRowsPerPage={10}
              list={list}
              selected={selected}
              setSelected={setSelected}
              update={update}
              unsetPaper={true}
            />
          </Grid>
        </Grid>

        <CardActions sx={{ justifyContent: 'end' }}>
          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            // loading={isSubmitting}
            sx={{ m: 1 }}
          >
            Save
          </LoadingButton>
          <Button size="medium" color="grey" variant="contained" sx={{ m: 1 }}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
