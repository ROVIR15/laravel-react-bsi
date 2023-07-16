import React from 'react';
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';
import flashFill from '@iconify/icons-eva/flash-fill';
import cubeFill from '@iconify/icons-eva/cube-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import settingsOutline from '@iconify/icons-eva/settings-2-outline';
import peopleFill from '@iconify/icons-eva/people-fill';
import carFill from '@iconify/icons-eva/car-fill';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
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
import dollarOutlined from '@iconify/icons-ant-design/dollar-outlined';
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
        path: '/dashboard/order/sales-order'
      }
    ]
  },
  {
    title: 'Production',
    name: 'production',
    icon: getIcon(flashFill),
    children: [
      {
        title: 'Costing',
        path: '/dashboard/production/costing'
      },
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
      },
      {
        title: 'Manufacture Planning',
        path: '/dashboard/production/manufacture-planning'
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
        title: 'Service',
        path: '/dashboard/material/service'
      },
      {
        title: 'Machine',
        path: '/dashboard/material/machine'
      }
    ]
  },
  {
    title: 'Laporan Pertanggungjawaban Penerima Fasilitas KITE',
    name: 'laporan-kite',
    icon: getIcon("fluent-emoji-high-contrast:customs"),
    children: [
      {
        title: 'Laporan Pemasukan Barang dan Bahan',
        path: '/dashboard/inventory/laporan-barang-masuk'
      },
      {
        title: 'UNFINISHED Laporan Pemakaian Bahan Baku',
        path: '/dashboard/bea-cukai-1'
      },
      {
        title: 'Laporan Mutasi Bahan Baku',
        path: '/dashboard/inventory/laporan-mutasi-barang?cat=bahan_baku'
      },
      {
        title: 'Laporan Mutasi Barang Hasil Produksi',
        path: '/dashboard/inventory/laporan-mutasi-barang-jadi?cat=bahan_jadi'
      },
      {
        title: 'Laporan terkait Barang dalam Proses (WIP)',
        path: '/dashboard/inventory/laporan-barang-wip'
      },
      {
        title: 'Laporan Pengeluaran Barang Hasil Produksi',
        path: '/dashboard/inventory/laporan-barang-keluar'
      },
      {
        title: 'Laporan Penyelesaian Barang Berfasilitas KITE',
        path: '/dashboard/inventory/laporan-skrap-barang'
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
        title: 'Vendor',
        path: '/dashboard/purchasing/vendor'
      },
      {
        title: 'Goods Receipt',
        path: '/dashboard/inventory/goods-receipt'
      }
    ]
  },
  {
    title: 'Human Resources and Development',
    name: 'human_resources',
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'Labor',
        path: '/dashboard/hrd/labor'
      }
    ]
  },
  {
    title: 'Purchasing',
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
    title: 'Shipment',
    name: 'shipment',
    icon: getIcon(carFill),
    children: [
      {
        title: 'Incoming Shipment',
        path: '/dashboard/shipment/incoming'
      },
      {
        title: 'Outgoing Shipment',
        path: '/dashboard/shipment/outgoing'
      },
      {
        title: 'Shipment Status',
        path: '/dashboard/shipment/status'
      }
    ]
  },
  {
    title: 'Monitoring',
    name: 'monitoring',
    icon: getIcon(monitorOutline),
    children: [
      {
        title: 'Main',
        path: '/dashboard/monitoring/main'
      },
      {
        title: 'Produksi',
        path: '/dashboard/monitoring/production'
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
      {
        title: 'Order Progress',
        path: '/dashboard/monitoring/order'
      }
    ]
  },
  {
    title: 'Finance',
    name: 'finance',
    icon: getIcon(dollarOutlined),
    path: '/dashboard/finance',
    children: [
      {
        title: 'Currency Exchange Rate',
        path: '/dashboard/finance/currency'
      },
      {
        title: 'Vendor Bills',
        path: '/dashboard/finance/vendor-bills'
      },
      {
        title: 'Invoice',
        path: '/dashboard/finance/invoice'
      },
      {
        title: 'Finance Account',
        path: '/dashboard/finance/account'
      },
      {
        title: 'Finance Transaction',
        path: '/dashboard/finance/transaction'
      },
      {
        title: 'Payment',
        path: '/dashboard/finance/payment'
      }
    ]
  },
  {
    title: 'Report and Analysis',
    name: 'report',
    icon: getIcon(bookOpenFill),
    children: [
      {
        title: 'Invoice Report',
        path: '/dashboard/finance/invoice/report'
      },
      {
        title: 'Order P/L Analysis',
        path: '/dashboard/order-pl-analysis'
      },
      {
        title: 'Running Order by Buyer',
        path: '/dashboard/running-buyer-order'
      },
      {
        title: 'Factory Capacity',
        path: '/dashboard/capacity'
      },
      {
        title: 'Good Garment Valuation',
        path: '/dashboard/goods-valuation'
      }
    ]
  },
  {
    title: 'User Management',
    name: 'user-management',
    path: '/dashboard/user-management'
  },
  {
    title: 'Facility',
    name: 'facility',
    path: '/dashboard/facility'
  },
  {
    title: 'Factory',
    name: 'factory',
    path: '/dashboard/factory'
  },
  {
    title: 'Line Target',
    name: 'line-target',
    path: '/dashboard/facility-target'
  }
];

export default sidebarConfig;
