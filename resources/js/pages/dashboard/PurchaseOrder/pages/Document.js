import React, { useState, useEffect, useRef } from 'react';
import Page from '../../../../components/Page';

import { styled } from '@mui/material/styles';

import {Box, Button, Divider, Grid, IconButton, Paper, Stack, Typography} from '@mui/material';
import { MHidden } from '../../../../components/@material-extend';

import {useLocation, useParams} from 'react-router-dom';

// Components
import Table from '../components/TableINV';

//API
import API from '../../../../helpers'
import { productFeatureArrangedData, productItemArrangedData } from '../../../../helpers/data';

//Icons
import editFill from '@iconify/icons-eva/edit-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import { Icon } from '@iconify/react';

//pdf
import { jsPDF } from 'jspdf'
import { toBlob, toPng } from 'html-to-image';

import useAuth from '../../../../context';
import { getPages } from '../../../../utils/getPathname';

import Dialog from '../../../../components/DialogBox/dialog';

const RootStyle = styled(Page)(({ theme }) => ({

}));

const IDontKnow = styled('span')(({ theme }) => ({
  height: "22px", 
  minWidth: "22px", 
  lineHeight: "0", 
  borderRadius: "6px", 
  cursor: "default", 
  alignItems: "center", 
  whiteSpace: "nowrap", 
  display: "inline-flex", 
  justifyContent: "center", 
  padding: "0px 8px", 
  color: "rgb(86, 187, 241)", 
  fontSize: "1.25rem", 
  backgroundColor: "rgb(77, 119, 255, 0.2)", 
  fontWeight: "700", 
  textTransform: "uppercase", 
  marginBottom: "8px"
}));

const BOXColumn = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column'
}))

const PaperStyled = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '85%',
    margin: 'auto',
    backgroundColor: "rgb(255, 255, 255)", 
    color: "rgb(33, 43, 54)", 
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", 
    backgroundImage: "none", 
    overflow: "hidden", 
    position: "relative", 
    boxShadow: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px", 
    borderRadius: "16px", 
    zIndex: "0", 
    paddingTop: "40px", 
    paddingLeft: "40px", 
    paddingRight: "40px"
  }
}));

const SpaceBetween = styled(Box)(({theme}) => ({
  display: "flex", 
  justifyContent: "space-between", 
  marginBottom: "40px"
}))

const GridItemX = styled('div')(({ theme }) => ({
  height: "100%", 
  overflow: "unset"
}));

function FirstPage(){
  const { id } = useParams();
  const { user } = useAuth();
  const pdfRef = useRef(null);
  const { pathname } = useLocation();

  const [submit, setSubmit] = useState(false);
  const [review, setReview] = useState(false);
  const [approve, setApprove] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [comment, setComment] = useState(false);
  const [commentCtn, setCommentCtn] = useState('');
  const [warning, setWarning] = useState({
    title: "",
    message: ""
  });

  function handleDialog(key) {

    switch (key) {
      case 'submit':
        setWarning({
          title: "Submit Purchase Order?",
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'submit',
          send: (type, content) => handleSubmission(type, content)
        })
        setDialogOpen(true);
        break;

      case 'review':
        setWarning({
          title: "Review Purchase Order?",
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'review',
          send: (type, content) => handleSubmission(type, content)
        })
        setDialogOpen(true);
        break;

      case 'approve':
        setWarning({
          title: "Apporve Purchase Order?",
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'approve',
          send: (type, content) => handleSubmission(type, content)
        })
        setDialogOpen(true);
        break;

      default:
        break;
    }
  }  

  useEffect(() => {
    const { role } = user;
    const name = getPages(pathname.split('/'));

    role.map(function(x){
      if(x.name === name){
        setSubmit(Boolean(x.submit));
        setReview(Boolean(x.review));
        setApprove(Boolean(x.approve));
      }
    })
  }, [])

  const handleDownloadPdf = () => {
    const content = pdfRef.current;

    const doc = new jsPDF('l','mm',[210, 297]);

    doc.html(content, {
      callback: (doc) => {
        doc.save('wow.pdf')
      },
    })
  }
  

  const handleDownloadPng = React.useCallback(() => {
    const content = pdfRef.current;

    // toBlob(content, {cacheBust: true})
    // .then((blob) => {
    //   const doc = new jsPDF();

    //   doc.addImage(blob);
    //   doc.save('hehe.pdf')
    // })
    // .catch((err) => {
    //   alert(err)
    // })

    toPng(content, {cacheBust: true})
    .then((dataUrl) => {
      const doc = new jsPDF();

      doc.addImage(dataUrl, 5, 5);
      doc.save('hehe.pdf')
    })
    .catch((err) => {
      alert(err)
    })
  }, [pdfRef]);
  
  const [data, setData] = useState({
    id: '',
    po_number: '',
    party: {
      name: ''
    },
    issue_date: '',
    quote_items: []
  })

  useEffect(async () => {
    API.getAPurchaseOrder(id, function(res){
      if (!res) return;
      else {
        const quoteItem = res.data.order_item.map(function(key, index){
          const {id, product_id, name, size, color} = productItemArrangedData(key.product_feature)
          return {
            'id': key.id,
            'product_id' : product_id,
            'product_feature_id' : id,
            'name' : name,
            'size' : size,
            'color' : color,
            'qty' : key.qty,
            'unit_price' : key.unit_price
          }
        });


        setData({
          ...data, 
          id: res.data.id,
          order_id: res.data.order_id,
          po_number: res.data.po_number,
          issue_date: res.data.issue_date,
          quote_items: quoteItem,
          party: res.data.bought_from
        })

      }
    })

    
  }, [id]);

  function handleSubmission(key, description){
    let payload = { user_id: id, status_type: '', order_id: data.order_id };
    switch (key) {
      case 'submit':
        payload = {...payload, status_type: 'Submit', description: ''};
        break;

      case 'review':
        payload = {...payload, status_type: 'Review', description};
        break;

      case 'reject-review':
        payload = {...payload, status_type: 'Reject Review', description};
        break;

      case 'approve':
        payload = {...payload, status_type: 'Approve', description: ''};
        break;

      case 'reject-approve':
        payload = {...payload, status_type: 'Reject Approve', description};
        break;        

      default:
        payload
        break;
    }
    // alert(JSON.stringify(payload));
    // return;
    try {
      API.insertOrderStatus(payload, (res) => {
        if(!res) return undefined;
        if(!res.success) new Error('Failed');
        else alert('Success')
      })      
    } catch (error) {
      alert('error');
    }

    setDialogOpen(false);
  }  

  return (
      <MHidden width="mdDown">
        <Dialog 
          title={warning.title}
          message={warning.message}
          setOpen={setDialogOpen} 
          open={dialogOpen}
          comment={comment}
          setComment={setComment}
          type={warning.type}
          send={warning.send}
        />
        <SpaceBetween>
          <div >
            <IconButton>
              <Icon icon={editFill} width={20} height={20} />
            </IconButton>
            <IconButton>
              <Icon icon={downloadFill} width={20} height={20} />
            </IconButton>
          </div>

          <div>
            <Button
              onClick={() => handleDialog('submit')}
              disabled={!submit}
            >
              Submit
            </Button>
            <Button
              onClick={() => handleDialog('review')}
              disabled={!review}
            >
              Review
            </Button>
            <Button
              onClick={() => handleDialog('approve')}
              disabled={!approve}
            >
              Tandai Approve
            </Button>
          </div>

        </SpaceBetween>
        <RootStyle >
          <PaperStyled ref={pdfRef} sx={{ width: "210mm", height: "279mm", margin: 'auto'}}>
            {/* Header Info */}
            <Stack direction="column" spacing={2}>
            <Grid container sx={{
              boxSizing: "border-box",
              display: "flex",
              flexFlow: "row wrap",
              width: "100%",
            }}>
              <Grid item md={6} sx={{width: '50%', marginBottom: '1em'}}>
                <Box
                  component="img"
                  src="https://1.bp.blogspot.com/-Jl8W1ycfiDY/Xa_nji0dXaI/AAAAAAAALrw/j4oS4c5mQmkO89tCzn6o9PcrU_0W9V3JgCLcBGAsYHQ/s1600/FB_IMG_1571808912832.jpg"
                  sx={{width: '15%', height: '80px', marginLeft: '0.75 em'}}
                />
              </Grid>
              <Grid item={6} sx={{width: '50%', marginBottom: '1em'}}>
                <Box sx={{textAlign: 'right'}}>
                  <IDontKnow>Purchase Order</IDontKnow>
                  <Typography variant="h3">PO-{data.id}-A</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={7}>
                <Stack>
                  <Box>
                    <Typography
                      variant="overline" 
                      display="block" 
                      gutterBottom
                    >
                      PO Number
                    </Typography>
                    <Typography
                      variant="h6" 
                      gutterBottom 
                      component="div"
                    >
                      {data.po_number}
                    </Typography>
                  </Box>

                  <BOXColumn>
                    <Typography
                      variant="overline" 
                      display="block" 
                      gutterBottom
                    >
                      Created Date
                    </Typography>
                    <Typography
                      variant="h6" 
                      gutterBottom 
                      component="div"
                    >
                      {data.issue_date}
                    </Typography>
                  </BOXColumn>
                </Stack>

              </Grid>
              <Grid item xs={5}>
                <Box>
                  <div>
                    <Typography
                      variant="overline" 
                      display="block" 
                      gutterBottom
                    >
                      Supplier
                    </Typography>
                    <Typography
                      variant="h6" 
                      component="div"
                    >
                      {data.party.name}
                    </Typography>
                    <Typography variant="body1">{data.party.address?.street}</Typography>
                    <Typography variant="body1">{`${data.party.address?.city}, ${data.party.address?.province}, ${data.party.address?.country}`}</Typography>
                  </div>
                </Box>
              </Grid>

              </Grid>

              <GridItemX >
                <Table payload={data.quote_items}/>
              </GridItemX>

              <Divider fullWidth />
              <Grid container>
                <Box sx={{marginBottom: 15}}>
                  <Typography variant="h6">
                    This Document Generated Automatically
                  </Typography>
                </Box>
              </Grid>
            </Stack>
          </PaperStyled>
        </RootStyle>
      </MHidden>
  )
}

export default FirstPage;