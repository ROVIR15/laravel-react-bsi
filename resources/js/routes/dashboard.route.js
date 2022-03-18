import React from 'react';
import { Navigate, useRoutes, Routes, Route } from 'react-router-dom';
// Layout
import DashboardLayout from '../layouts/dashboard';
import {
  BuyerLayout,
  InquiryLayout,
  QuotationLayout,
  SalesOrderLayout,
  GoodsLayout,
  InventoryLayout,
  WorkCenterLayout,
  RoutingLayout,
  BillOfMaterialLayout
} from '../pages/dashboard';
// Add Pages
import AddBuyer from '../pages/dashboard/Buyer/new';
import AddInquiry from '../pages/dashboard/Inquiry/new';
import AddQuotation from '../pages/dashboard/Quotation/new';
import AddSalesOrder from '../pages/dashboard/SalesOrder/new';
import AddBillOfMaterial from '../pages/dashboard/BillofMaterial/new';
import AddRouting from '../pages/dashboard/Routing/new';
import AddWorkCenter from '../pages/dashboard/WorkCenter/new';
import AddInventory from '../pages/dashboard/Inventory/new';
import AddGoods from '../pages/dashboard/Goods/add';

// Display Pages
import DisplayBuyer from '../pages/dashboard/Buyer/display';
import DisplayGoods from '../pages/dashboard/Goods/display';
import DisplayInquiry from '../pages/dashboard/Inquiry/';

// Show Pages
import ShowBuyer from '../pages/dashboard/Buyer/show';
import ShowGoods from '../pages/dashboard/Goods/show';

export default function TestRouter() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { 
          path: 'order/buyer',
          element: <BuyerLayout />,
          children: [
            { path: ':id', element: <ShowBuyer/>},
            { path: 'add', element: <AddBuyer/>},
            { path: 'display', element: <DisplayBuyer />},
          ]
        },
        { 
          path: 'order/inquiry', 
          element: <InquiryLayout />,
          children: [
            { path: ':id', element: <p>show</p>},
            { path: 'add', element: <AddInquiry />},
            { path: 'display', element: <p>display</p>},
          ]
        },
        { 
          path: 'order/quotation', 
          element: <QuotationLayout />,
          children: [
            { path: ':id', element: <p>show</p>},
            { path: 'add', element: <AddQuotation />},
            { path: 'display', element: <p>display</p>},
            { path: 'edit', element: <p>edit</p>}
          ]
        },
        { 
          path: 'order/sales-order', 
          element: <SalesOrderLayout />,
          children: [
            { path: ':id', element: <p>show</p>},
            { path: 'add', element: <AddSalesOrder />},
            { path: 'display', element: <p>display</p>},
            { path: 'edit', element: <p>edit</p>}
          ]
        },
        { 
          path: 'material/goods', 
          element: <GoodsLayout/>, 
          children: [
            { path: ':id', element: <ShowGoods />},
            { path: 'add', element: <AddGoods />},
            { path: 'display', element: <DisplayGoods />},
            { path: 'edit', element: <p>edit</p>}
          ]
        },
        { 
          path: 'inventory/inventory-items', 
          element: <InventoryLayout />,
          children: [
            { path: ':id', element: <p>show</p>},
            { path: 'add', element: <p>new</p>},
            { path: 'display', element: <p>display</p>},
            { path: 'edit', element: <p>edit</p>}
          ]
        },
        { 
          path: 'production/work-center', 
          element: <WorkCenterLayout />,
          children: [
            { path: ':id', element: <p>show</p>},
            { path: 'add', element: <p>new</p>},
            { path: 'display', element: <p>display</p>},
            { path: 'edit', element: <p>edit</p>}
          ]
        },
        { 
          path: 'production/routing', 
          element: <RoutingLayout />,
          children: [
            { path: ':id', element: <p>show</p>},
            { path: 'add', element: <p>new</p>},
            { path: 'display', element: <p>display</p>},
            { path: 'edit', element: <p>edit</p>}
          ]
        },
        { 
          path: 'production/bom-production', 
          element: <BillOfMaterialLayout />,
          children: [
            { path: ':id', element: <p>show</p>},
            { path: 'add', element: <p>new</p>},
            { path: 'display', element: <p>display</p>},
            { path: 'edit', element: <p>edit</p>}
          ]
        },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]);
}