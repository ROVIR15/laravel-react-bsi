import React from 'react';
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';
import flashFill from '@iconify/icons-eva/flash-fill';
import cubeFill from '@iconify/icons-eva/cube-fill';
import shoppingCart from '@iconify/icons-eva/shopping-cart-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
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
        title: 'Inquiry',
        path: '/dashboard/order/inquiry',
      },
      {
        title: 'Quotation',
        path: '/dashboard/order/quotation'
      },
      {
        title: 'Sales Order',
        path: '/dashboard/order/sales-order',
      },
      // {
      //   title: 'Shipment',
      //   path: '/dashboard/order/order-shipment'
      // },
      // {
      //   title: 'Outbound Delivery',
      //   path: '/dashboard/order/outbound-delivery'
      // },
      // {
      //   title: 'Goods Issue',
      //   path: '/dashboard/order/goods-isssue'
      // }
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
      // {
      //   title: 'Routing',
      //   path: '/dashboard/production/routing'
      // },
      {
        title: 'Work Center',
        path: '/dashboard/production/work-center'
      },
      {
        title: 'Manufacture Order',
        path: '/dashboard/manufacture-order'
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
      },
      // {
      //   title: 'Service',
      //   path: '/dashboard/material/service'
      // },
      // {
      //   title: 'Non-Material',
      //   path: '/dashboard/material/non-material-goods'
      // },
      // {
      //   title: 'Material Grouping',
      //   path: '/dashboard/material/material-grouping'
      // }
    ]
  },
  {
    title: 'Inventory Management',
    icon: getIcon(archiveFill),
    children: [
      // {
      //   title: 'Stock',
      //   path: '/dashboard/inventory/stocks'
      // },
  //     {
  //       title: 'Inventory Item',
  //       path: '/dashboard/inventory/inventory-items'
  //     },
      {
        title: 'Goods Receipt',
        path: '/dashboard/inventory/goods-receipt'
      },
  //     {
  //       title: 'Goods Issue',
  //       path: '/dashboard/material/non-material-goods'
  //     }
    ]
  },
  {
    title: "Purchasing",
    icon: getIcon(shoppingCart),
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
  }
];

export default sidebarConfig;
