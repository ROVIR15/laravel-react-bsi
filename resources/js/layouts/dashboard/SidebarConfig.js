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
import monitorOutline from '@iconify/icons-ant-design/monitor-outline';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: ' ',
    path: '/dashboard/app'
  },
  {
    title: 'Sales',
    name: 'sales',
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
    name: 'production',
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
    name: 'industrial_engineering',
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
        title: 'Sampling Study',
        path: '/dashboard/ie-study/sampling-study'
      },
      {
        title: 'Observation Result',
        path: '/dashboard/ie-study/result'
      }
    ]
  },
  {
    title: 'Material Management',
    name: 'material',
    icon: getIcon(cubeFill),
    children: [
      {
        title: 'Goods',
        path: '/dashboard/material/goods'
      },
      {
        title: 'Machine',
        path: '/dashboard/material/machine'
      }
    ]
  },
  {
    title: 'Inventory Management',
    name: 'inventory',
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
    name: 'human_resources',
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'Labor',
        path: '/dashboard/hrd/labor'
      },
    ]
  },
  {
    title: "Purchasing",
    name: 'purchasing',
    icon: getIcon(shoppingBagFill),
    children: [
      {
        title: 'Vendor',
        path: '/dashboard/purchasing/vendor'
      },
      {
        title: 'Purchase Requisition',
        path: '/dashboard/purchasing/purchase-requisition'
      },
      {
        title: 'Request for Quotation',
        path: '/dashboard/purchasing/request-for-quotation'
      },
      {
        title: 'Purchase Order',
        path: '/dashboard/purchasing/purchase-order'
      }
    ]
  },
  {
    title: "Monitoring",
    name: 'monitoring',
    icon: getIcon(monitorOutline),
    children: [
      {
        title: 'Main',
        path: '/dashboard/monitoring/main'
      },
      {
        title: 'Cutting',
        path: '/dashboard/monitoring/cutting'
      },
      {
        title: 'Supermarket',
        path: '/dashboard/monitoring/supermarket'
      },
      {
        title: 'Sewing',
        path: '/dashboard/monitoring/sewing'
      },
      {
        title: 'QC',
        path: '/dashboard/monitoring/qc'
      },
      {
        title: 'Finished Goods',
        path: '/dashboard/monitoring/finished-goods'
      },
    ]
  },
  {
    title: 'Spreading',
    name: 'operator-spreading',
    path: '/dashboard/inputer-spreading',
  },
  {
    title: 'Cutting',
    name: 'operator-cutting',
    path: '/dashboard/inputer-cutting',
  },
  {
    title: 'Numbering',
    name: 'operator-numbering',
    path: '/dashboard/inputer-numbering',
  },
  {
    title: 'Supermarket',
    name: 'operator-supermarket',
    path: '/dashboard/inputer-supermarket',
  },
  {
    title: 'Sewing',
    name: 'operator-sewing',
    path: '/dashboard/inputer-sewing',
  },
  {
    title: 'QC',
    name: 'operator-qc',
    path: '/dashboard/inputer-qc',
  },
  {
    title: 'Finished Goods',
    name: 'operator-finished',
    path: '/dashboard/inputer-finished-goods',
  },
];

export default sidebarConfig;
