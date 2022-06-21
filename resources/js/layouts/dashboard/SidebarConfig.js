import React from 'react';
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';
import flashFill from '@iconify/icons-eva/flash-fill';
import cubeFill from '@iconify/icons-eva/cube-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import settingsOutline from '@iconify/icons-eva/settings-2-outline';
import peopleFill from '@iconify/icons-eva/people-fill';

//Inactive
import shoppingCart from '@iconify/icons-eva/shopping-cart-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import cardOutlined from '@iconify/icons-eva/credit-card-outline';
import dollarCircle from '@iconify/icons-ant-design/dollar-circle-filled';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: ' ',
    path: '/dashboard/app'
  },
  {
    title: 'Sales',
    icon: getIcon(briefcaseFill),
    children: [
      {
        title: 'Buyer',
        path: '/dashboard/order/buyer'
      },
      {
        title: 'Quotation',
        path: '/dashboard/order/quotation'
      },
      {
        title: 'Sales Order',
        path: '/dashboard/order/sales-order',
      },
      {
        title: 'Outbound Delivery',
        path: '/dashboard/inventory/outbound-delivery'
      }
    ]
  },
  {
    title: 'Production',
    icon: getIcon(flashFill),
    children: [
      {
        title: 'Bill of Material',
        path: '/dashboard/production/bom'
      },
      {
        title: 'Work Center',
        path: '/dashboard/production/work-center'
      },
      {
        title: 'Manufacture Order',
        path: '/dashboard/production/manufacture-order',
        disabled: true
      }
    ]
  },
  {
    title: 'Industrial Engineering Study',
    icon: getIcon(settingsOutline),
    children: [
      {
        title: 'Process',
        path: '/dashboard/ie-study/process'
      },
      {
        title: 'Production Study',
        path: '/dashboard/ie-study/production-study'
      },
      {
        title: 'Observation Result',
        path: '/dashboard/ie-study/result'
      }
    ]
  },
  {
    title: 'Material Management',
    icon: getIcon(cubeFill),
    children: [
      {
        title: 'Goods',
        path: '/dashboard/material/goods'
      },
      {
        title: 'Invoice Receipt',
        path: '/dashboard/material/invoice-receipt'
      }
    ]
  },
  {
    title: 'Inventory Management',
    icon: getIcon(archiveFill),
    children: [
      {
        title: 'Inventory Item',
        path: '/dashboard/inventory/inventory-items'
      },
      {
        title: 'Goods Receipt',
        path: '/dashboard/inventory/goods-receipt'
      }
    ]
  },
  {
    title: "Human Resources and Development",
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'Labor',
        path: '/dashboard/hrd/labor'
      },
    ]
  }
];

export default sidebarConfig;
