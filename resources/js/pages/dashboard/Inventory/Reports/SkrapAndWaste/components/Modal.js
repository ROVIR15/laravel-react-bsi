import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton, Stack } from '@mui/material';

import { Icon } from '@iconify/react';
import closeCircle from '@iconify/icons-eva/close-outline';
import { isEmpty, isNull } from 'lodash';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};

export default function BasicModal({ payload, open, handleClose }) {
  function padStartWithZero(number) {
    if (isNull(number)) return '0000';
    return number?.toString().padStart(4, '0');
  }

  return (
    <div>
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
                  Informasi Barang Skrap / Waste
                </Typography>
                <IconButton onClick={handleClose} color="error">
                  <Icon icon={closeCircle} />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <div className="wk_table wk_style1">
                <div className="wk_border">
                  <div className="wk_table_responsive">
                    <table style={{ fontSize: '11px' }}>
                      <tr>
                        <td className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                          SKU ID
                        </td>
                        <td className="wk_width_1 wk_padd_8_20 wk_text_left">
                          {!isEmpty(payload) ? payload?.sku_id : '----'}
                        </td>
                      </tr>

                      <tr>
                        <td className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                          Nama Barang
                        </td>
                        <td className="wk_width_1 wk_padd_8_20 wk_text_left">
                          {!isEmpty(payload) ? payload?.item_name : '----'}
                        </td>
                      </tr>

                      <tr>
                        <td className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                          BOM / CBD
                        </td>
                        <td className="wk_width_1 wk_padd_8_20 wk_text_left">
                          <a href={`../production/costing/show-bom/${payload?.costing_id}`} target="_blank">
                            CBD-{padStartWithZero(payload?.costing_id)}
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                          Tanggal Dokumen BC
                        </td>
                        <td className="wk_width_1 wk_padd_8_20 wk_text_left">
                          {payload?.document_date}
                        </td>
                      </tr>

                      <tr>
                        <td className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                          Nomor Dokumen BC
                        </td>
                        <td className="wk_width_1 wk_padd_8_20 wk_text_left">
                          {payload?.document_number}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">**Klik untuk menuju dokumen</Typography>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </div>
  );
}
