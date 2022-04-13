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
  BillOfMaterialLayout,
  VendorLayout,
  PurchaseRequisitionLayout,
  RFQLayout,
  PurchaseOrderLayout,
  GoodsReceipt,
  InvoiceReceipt
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
import AddVendor from '../pages/dashboard/Vendor/new';
import AddPurchaseRequisition from '../pages/dashboard/PurchaseRequisition/new';
import AddRFQ from '../pages/dashboard/RFQ/new';
import AddPurchaseOrder from '../pages/dashboard/PurchaseOrder/new';
import AddGR from '../pages/dashboard/GoodsReceipt/new';
import AddIR from '../pages/dashboard/InvoiceReceipt/new';

// Display Pages
import DisplayBuyer from '../pages/dashboard/Buyer/display';
import DisplayGoods from '../pages/dashboard/Goods/display';
import DisplayInquiry from '../pages/dashboard/Inquiry/display';
import DisplayQuote from '../pages/dashboard/Quotation/display';
import DisplaySalesOrder from '../pages/dashboard/SalesOrder/display';
import DisplayBOM from '../pages/dashboard/BillofMaterial/display';
import DisplayWorkCenter from '../pages/dashboard/WorkCenter/display';
import DisplayVendor from '../pages/dashboard/Vendor/display';
import DisplayPurchaseReq from '../pages/dashboard/PurchaseRequisition/display';
import DisplayRFQ from '../pages/dashboard/RFQ/display';
import DisplayPO from '../pages/dashboard/PurchaseOrder/display';
import DisplayGR from '../pages/dashboard/GoodsReceipt/display';
import DisplayIR from '../pages/dashboard/InvoiceReceipt/display';

// Show Pages
import ShowBuyer from '../pages/dashboard/Buyer/show';
import ShowGoods from '../pages/dashboard/Goods/show';
import ShowInquiry from '../pages/dashboard/Inquiry/show';
import ShowQuote from '../pages/dashboard/Quotation/show';
import ShowSalesOrder from '../pages/dashboard/SalesOrder/show';
import ShowBOM from '../pages/dashboard/BillofMaterial/show';
import ShowWorkCenter from '../pages/dashboard/WorkCenter/show';
import ShowVendor from '../pages/dashboard/Vendor/show';
import ShowPurchaseReq from '../pages/dashboard/PurchaseRequisition/show';
import ShowRFQ from '../pages/dashboard/RFQ/show';
import ShowPO from '../pages/dashboard/PurchaseOrder/show';
import ShowGR from '../pages/dashboard/GoodsReceipt/show';
import ShowIR from '../pages/dashboard/InvoiceReceipt/show';

//Document
import DocumentBOM from '../pages/dashboard/BillofMaterial/pages/Document';

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
            { path: ':id', element: <ShowInquiry />},
            { path: 'add', element: <AddInquiry />},
            { path: 'display', element: <DisplayInquiry />},
          ]
        },
        { 
          path: 'order/quotation', 
          element: <QuotationLayout />,
          children: [
            { path: ':id', element: <ShowQuote/>},
            { path: 'add', element: <AddQuotation />},
            { path: 'display', element: <DisplayQuote />},
          ]
        },
        { 
          path: 'order/sales-order', 
          element: <SalesOrderLayout />,
          children: [
            { path: ':id', element: <ShowSalesOrder />},
            { path: 'add', element: <AddSalesOrder />},
            { path: 'display', element: <DisplaySalesOrder />},
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
            { path: ':id', element: <ShowWorkCenter />},
            { path: 'add', element: <AddWorkCenter />},
            { path: 'display', element: <DisplayWorkCenter/>},
            { path: 'edit', element: <p>edit</p>}
          ]
        },
        { 
          path: 'production/routing', 
          element: <RoutingLayout />,
          children: [
            { path: ':id', element: <p>show</p>},
            { path: 'add', element: <AddRouting />},
            { path: 'display', element: <p>display</p>},
            { path: 'edit', element: <p>edit</p>}
          ]
        },
        { 
          path: 'production/bom', 
          element: <BillOfMaterialLayout />,
          children: [
            { path: ':id', element: <ShowBOM />},
            { path: 'add', element: <AddBillOfMaterial />},
            { path: 'display', element: <DisplayBOM />},
            { path: 'edit', element: <p>edit</p>},
            { path: 'document/:id', element: <DocumentBOM/>}
          ]
        },
        { 
          path: 'purchasing/vendor', 
          element: <VendorLayout />,
          children: [
            { path: ':id', element: <ShowVendor />},
            { path: 'add', element: <AddVendor />},
            { path: 'display', element: <DisplayVendor />},
          ]
        },
        { 
          path: 'purchasing/purchase-requisition', 
          element: <PurchaseRequisitionLayout />,
          children: [
            { path: ':id', element: <ShowPurchaseReq />},
            { path: 'add', element: <AddPurchaseRequisition />},
            { path: 'display', element: <DisplayPurchaseReq />},
          ]
        },
        { 
          path: 'purchasing/request-for-quotation', 
          element: <RFQLayout />,
          children: [
            { path: ':id', element: <ShowRFQ />},
            { path: 'add', element: <AddRFQ />},
            { path: 'display', element: <DisplayRFQ />},
          ]
        },
        { 
          path: 'purchasing/purchase-order', 
          element: <PurchaseOrderLayout />,
          children: [
            { path: ':id', element: <ShowPO />},
            { path: 'add', element: <AddPurchaseOrder />},
            { path: 'display', element: <DisplayPO />},
          ]
        },
        { 
          path: 'inventory/goods-receipt', 
          element: <GoodsReceipt />,
          children: [
            { path: ':id', element: <ShowGR />},
            { path: 'add', element: <AddGR />},
            { path: 'display', element: <DisplayGR />},
          ]
        },
        { 
          path: 'material/invoice-receipt', 
          element: <InvoiceReceipt />,
          children: [
            { path: ':id', element: <ShowGR />},
            { path: 'add', element: <AddGR />},
            { path: 'display', element: <DisplayGR />},
          ]
        },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]);
}