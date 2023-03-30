import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import { fShortenNumber } from '../utils/formatNumber';

//Icons
import { Icon } from '@iconify/react';
import checkmarkCircle from '@iconify/icons-eva/checkmark-circle-2-fill';
import closeCircle from '@iconify/icons-eva/close-circle-fill';
import fileIcon from '@iconify/icons-eva/file-fill';
import pieChart from '@iconify/icons-eva/pie-chart-2-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import baselineSummarize from '@iconify/icons-ic/baseline-summarize';
import { isEmpty, isUndefined } from 'lodash';

const StyledBox = styled(Box)(({ theme }) => ({
  overflowX: 'auto'
}));

const StyledInnerComponent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: '16px',
  paddingBottom: '16px'
}));

const StyledComponent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minWidth: '200px'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: '0px',
  fontWeight: 700,
  lineHeight: 1.55556,
  fontSize: '1.0625rem',
  fontFamily: '"Public Sans", sans-serif'
}));

const StyledSpanTypography = styled('span')(({ theme }) => ({
  color: 'rgb(99, 115, 129)',
  lineHeight: 1.57143,
  fontSize: '0.875rem',
  fontFamily: '"Public Sans", sans-serif',
  fontWeight: 400
}));

const StyledComponentIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
}));

const StyledComponentInformation = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '16px'
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: '0px',
  flexShrink: 0,
  borderWidth: '0px thin 0px 0px',
  borderColor: 'rgba(145, 158, 171, 0.24)',
  height: 'auto',
  alignSelf: 'stretch',
  borderStyle: 'dashed'
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transform: 'rotate(-90deg)',
  color: 'rgba(145, 158, 171, 0.16)',
  opacity: '0.46'
}));

const obj = [
  {
    name: 'Delivered',
    icon: checkmarkCircle,
    numbers_document: 0,
    amount: 0,
    color: 'rgb(54, 179, 126)'
  },
  {
    name: 'On Going',
    icon: pieChart,
    numbers_document: 0,
    amount: 0,
    color: 'rgb(255, 171, 0)'
  },
  {
    name: 'Scheduled',
    icon: archiveFill,
    numbers_document: 0,
    amount: 0,
    color: 'rgb(51 102 255)'
  },
  {
    name: 'Cancelled',
    icon: closeCircle,
    numbers_document: 0,
    amount: 0,
    color: 'rgb(255, 86, 48)'
  }
];

export default function SummaryPaper({ data }) {
  const [filteredData, setFilteredData] = useState(obj);

  useEffect(() => {

    let result = data?.reduce(function (initial, next) {
      //check
      let targeted = initial?.map((item, index) => {
        if (item.name.toLowerCase() === next?.status[0]?.status_type?.name?.toLowerCase())
          return {
            ...item,
            amount: item.amount + parseFloat(next?.sum[0]?.total_qty),
            numbers_document: item.numbers_document + 1,
            percentage: ((item.numbers_document + 1)/data.length)*100
          };
        else return item;
      });

      return targeted;
    }, obj);

    setFilteredData(result);
  }, [data]);

  let total = data?.reduce(
    function (initial, next) {
      return {
        ...initial,
        numbers_document: initial.numbers_document + 1,
        amount: initial.amount + parseFloat(next?.sum[0]?.total_qty),
      };
    },
    { numbers_document: 0, amount: 0 }
  );

  return (
    <Paper elevation={2} style={{marginBottom: '20px'}}>
      <StyledBox>
        <StyledInnerComponent>
          <StyledComponent>
            <StyledComponentIcon style={{ color: 'rgb(0, 184, 217)' }}>
              <Icon
                icon={baselineSummarize}
                style={{ width: '24px', height: '24px', position: 'absolute', color: 'inherit' }}
              />
              <StyledCircularProgress
                variant="determinate"
                value={100}
                style={{ width: '56px', height: '56px', color: 'inherit' }}
              />
            </StyledComponentIcon>
            <StyledComponentInformation>
              <StyledTypography variant="h6">Total</StyledTypography>
              <StyledTypography variant="h6">
                {`${total.numbers_document} `}
                <StyledSpanTypography>shipment</StyledSpanTypography>
              </StyledTypography>
              <StyledTypography variant="h6" style={{ color: 'rgb(0, 184, 217)' }}>
                {`${fShortenNumber(total.amount)}`}
              </StyledTypography>
            </StyledComponentInformation>
          </StyledComponent>
          <StyledDivider variant="dashed" />
          {filteredData.map((item, index) => {
            const last = index === obj.length - 1;
            return (
              <>
                <StyledComponent>
                  <StyledComponentIcon style={{ color: item.color }}>
                    <Icon
                      icon={item.icon}
                      style={{
                        width: '24px',
                        height: '24px',
                        position: 'absolute',
                        color: 'inherit'
                      }}
                    />
                    <StyledCircularProgress
                      variant="determinate"
                      value={parseInt(item?.percentage)}
                      style={{ width: '56px', height: '56px', color: 'inherit' }}
                    />
                  </StyledComponentIcon>
                  <StyledComponentInformation>
                    <StyledTypography variant="h6">{item.name}</StyledTypography>
                    <StyledTypography variant="h6">
                      {`${item.numbers_document} `}
                      <StyledSpanTypography>shipment</StyledSpanTypography>
                    </StyledTypography>
                    <StyledTypography variant="h6" style={{ color: item.color }}>
                      {`${fShortenNumber(item.amount)}`}
                    </StyledTypography>
                  </StyledComponentInformation>
                </StyledComponent>
                <StyledDivider variant="dashed" style={last ? { display: 'none' } : null} />
              </>
            );
          })}
        </StyledInnerComponent>
      </StyledBox>
    </Paper>
  );
}
