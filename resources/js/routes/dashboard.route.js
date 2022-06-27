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
  InvoiceReceipt,
  ProcessLayout,
  PSLayout,
  SSLayout,
  ORLayout,
  LaborLayout,
  MOLayout,
  InvLayout
} from '../pages/dashboard';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

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
import AddProcess from '../pages/dashboard/IndustrialEngineeringStudy/Process/add';
import AddPS from '../pages/dashboard/IndustrialEngineeringStudy/ProductionStudy/new';
import AddSS from '../pages/dashboard/IndustrialEngineeringStudy/SamplingStudy/new';
import AddOR from '../pages/dashboard/IndustrialEngineeringStudy/ObservationResult/new';
import AddLabor from '../pages/dashboard/Labor/new';
import AddMO from '../pages/dashboard/ManufactureOrder/new';
import AddOD from '../pages/dashboard/OutboundDelivery/new';
import AddInv from '../pages/dashboard/Finance/Invoice/new';

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
import DisplayProcess from '../pages/dashboard/IndustrialEngineeringStudy/Process/display';
import DisplayPS from '../pages/dashboard/IndustrialEngineeringStudy/ProductionStudy/display';
import DisplaySS from '../pages/dashboard/IndustrialEngineeringStudy/SamplingStudy/display';
import DisplayLabor from '../pages/dashboard/Labor/display';

import DisplayInventoryItem from '../pages/dashboard/Inventory/display';
import DisplayMO from '../pages/dashboard/ManufactureOrder/display';
import DisplayOD from '../pages/dashboard/OutboundDelivery/display';

import DisplayInv from '../pages/dashboard/Finance/Invoice/display';

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
import ShowProcess from '../pages/dashboard/IndustrialEngineeringStudy/Process/show';
import ShowPS from '../pages/dashboard/IndustrialEngineeringStudy/ProductionStudy/show';
import ShowSS from '../pages/dashboard/IndustrialEngineeringStudy/SamplingStudy/show';
import ShowLabor from '../pages/dashboard/Labor/show';
import ShowMO from '../pages/dashboard/ManufactureOrder/show';
import ShowOD from '../pages/dashboard/OutboundDelivery/show';
import ShowInv from '../pages/dashboard/Finance/Invoice/show';

//Document
import DocumentBOM from '../pages/dashboard/BillofMaterial/pages/Document';
import DocumentGR from '../pages/dashboard/GoodsReceipt/pages/Document';
import DocumentRFQ from '../pages/dashboard/RFQ/pages/Document';
import DocumentINV from '../pages/dashboard/Finance/Invoice/pages/Document';

//Play MOW
import PlayMOW from '../pages/dashboard/ManufactureOrder/play';
import FinishMOW from '../pages/dashboard/ManufactureOrder/finish';
import OutboundDeliveryLayout from '../pages/dashboard/OutboundDelivery';

export default function TestRouter() {

  const access_token = localStorage.getItem('_token');

  return useRoutes([
    { path: '/', children: [
        { path: 'register', element: <Register /> },        
        { path: 'login', element: <Login /> },
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { 
          path: 'order/buyer',
          element: <BuyerLayout />,
          redirect: 'order/buyer/display',
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
            { path: 'add', element: <AddInventory/>},
            { path: 'display', element: <DisplayInventoryItem />},
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
          path: 'production/manufacture-order', 
          element: <MOLayout />,
          children: [
            { path: ':id', element: <ShowMO />},
            { path: 'add', element: <AddMO />},
            { path: 'display', element: <DisplayMO />},
            {
              path: ':id/operation/:manufacture_operation_id', 
              element: <PlayMOW />,
            },
            { 
              path: ':id/operation/:manufacture_operation_id/finish',  
              element: <FinishMOW />
            }
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
            { path: 'document/:id', element: <DocumentRFQ/>}
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
            { path: 'document/:id', element: <DocumentGR/>}
          ]
        },
        { 
          path: 'inventory/outbound-delivery', 
          element: <OutboundDeliveryLayout />,
          children: [
            { path: ':id', element: <ShowOD />},
            { path: 'add', element: <AddOD />},
            { path: 'display', element: <DisplayOD />},
            { path: 'document/:id', element: <DocumentGR/>}
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
        //Industrial Engineering Study Route
        { 
          path: 'ie-study/process', 
          element: <ProcessLayout />,
          children: [
            { path: ':id', element: <ShowProcess />},
            { path: 'add', element: <AddProcess />},
            { path: 'display', element: <DisplayProcess />},
          ]
        },
        { 
          path: 'ie-study/production-study', 
          element: <PSLayout />,
          children: [
            { path: ':id', element: <ShowPS />},
            { path: 'add', element: <AddPS />},
            { path: 'display', element: <DisplayPS />},
          ]
        },
        { 
          path: 'ie-study/sampling-study', 
          element: <SSLayout />,
          children: [
            { path: 'add', element: <AddSS />},
            { path: ':id', element: <ShowSS />},
            { path: 'display', element: <DisplaySS />}
          ]
        },
        { 
          path: 'ie-study/result', 
          element: <ORLayout />,
          children: [
            { path: ':id/add', element: <AddOR />}
          ]
        },
        //Industrial Engineering Human Resources Route
        { 
          path: 'hrd/labor', 
          element: <LaborLayout />,
          children: [
            { path: ':id', element: <ShowLabor />},
            { path: 'add', element: <AddLabor />},
            { path: 'display', element: <DisplayLabor />},
          ]
        },
        { 
          path: 'hrd/production-study', 
          element: <PSLayout />,
          children: [
            { path: ':id', element: <ShowPS />},
            { path: 'add', element: <AddPS />},
            { path: 'display', element: <DisplayPS />},
          ]
        },
        { 
          path: 'hrd/result', 
          element: <ORLayout />,
          children: [
            { path: ':id/add', element: <AddOR />}
          ]
        },
        // Finance
        { 
          path: 'finance/invoice', 
          element: <InvLayout />,
          children: [
            { path: 'add', element: <AddInv /> },
            { path: ':id', element: <ShowInv /> },
            { path: 'display', element: <DisplayInv /> },
            { path: 'document/:id', element: <DocumentINV/>}
          ]
        },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]);
}