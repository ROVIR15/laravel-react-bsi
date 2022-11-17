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
  InvLayout,
  MachineLayout,
  ServiceLayout,
  UserManagementLayout,
  OrderProgressLayout,
  FacilityTargetLayout,
  MPLayout
} from '../pages/dashboard';

import UserRoles from '../pages/dashboard/UserManagement/role';
import UserPage from '../pages/dashboard/UserManagement/pages';
import UserRegister from '../pages/dashboard/UserManagement/register';
import UserTest from '../pages/dashboard/UserManagement/test';
import DisplayUser from '../pages/dashboard/UserManagement/display';

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
import AddService from '../pages/dashboard/Service/add';
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
import AddMachine from '../pages/dashboard/Machine/add';
import AddLineTarget from '../pages/dashboard/LineTarget/add';
import AddOutgoingShipment from '../pages/dashboard/Shipment/Outgoing/new';
import AddIncomingShipment from '../pages/dashboard/Shipment/Incoming/new';
import AddMP from '../pages/dashboard/ManufacturePlanning/add';

// Display Pages
import DisplayBuyer from '../pages/dashboard/Buyer/display';
import DisplayGoods from '../pages/dashboard/Goods/display';
import DisplayService from '../pages/dashboard/Service/display';
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
import DisplayMachine from '../pages/dashboard/Machine/display';
import DisplayOutputPerSalesOrder from '../pages/dashboard/OrderProgress/display';
import DisplayOutputPerSalesOrderDetail from '../pages/dashboard/OrderProgress/show';
import DisplayLineTarget from '../pages/dashboard/LineTarget/display';

import DisplayOutgoingShipment from '../pages/dashboard/Shipment/Outgoing/display';
import DisplayIncomingShipment from '../pages/dashboard/Shipment/Incoming/display';

import DisplayMP from '../pages/dashboard/ManufacturePlanning/display';

// Show Pages
import ShowBuyer from '../pages/dashboard/Buyer/show';
import ShowGoods from '../pages/dashboard/Goods/show';
import ShowService from '../pages/dashboard/Service/show';
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
import ShowMachine from '../pages/dashboard/Machine/show';
import ShowLineTarget from '../pages/dashboard/LineTarget/show';

import ShowOutgoingShipment from '../pages/dashboard/Shipment/Outgoing/show';
import ShowIncomingShipment from '../pages/dashboard/Shipment/Incoming/show';

import ShowMP from '../pages/dashboard/ManufacturePlanning/show';

//Document
import DocumentBOM from '../pages/dashboard/BillofMaterial/pages/Document';
import DocumentGR from '../pages/dashboard/GoodsReceipt/pages/Document';
import DocumentQuotation from '../pages/dashboard/Quotation/pages/Document';
import DocumentRFQ from '../pages/dashboard/RFQ/pages/Document';
import DocumentPO from '../pages/dashboard/PurchaseOrder/pages/Document';
import DocumentSO from '../pages/dashboard/SalesOrder/pages/Document';
import DocumentINV from '../pages/dashboard/Finance/Invoice/pages/Document';

//Play MOW
import PlayMOW from '../pages/dashboard/ManufactureOrder/play';
import FinishMOW from '../pages/dashboard/ManufactureOrder/finish';
import OutboundDeliveryLayout from '../pages/dashboard/OutboundDelivery';

//Monitoring
import Ininih from '../pages/dashboard/Monitoring';

import MonitoringFinishedGoodsLayout from '../pages/dashboard/Monitoring/FinishedGoods'; //
import MonitoringFinishedGoods from '../pages/dashboard/Monitoring/FinishedGoods/add'; //layout
import DisplayMonitoringFinishedGoods from '../pages/dashboard/Monitoring/FinishedGoods/display';

import MonitoringSewingLayout from '../pages/dashboard/Monitoring/Sewing'; //
import MonitoringSewing from '../pages/dashboard/Monitoring/Sewing/add'; //layout
import DisplayMS from '../pages/dashboard/Monitoring/Sewing/display';

import MonitoringQCLayout from '../pages/dashboard/Monitoring/QC'; //
import MonitoringQC from '../pages/dashboard/Monitoring/QC/add'; //layout
import DisplayMQC from '../pages/dashboard/Monitoring/QC/display';

import CuttingLayout from '../pages/dashboard/Monitoring/cutting-layout';

import MonitoringSpreadLayout from '../pages/dashboard/Monitoring/Spreading'; //
import MonitoringSpread from '../pages/dashboard/Monitoring/Spreading/add'; //
import DisplayMSpread from '../pages/dashboard/Monitoring/Spreading/display'; //

import MonitoringCuttingLayout from '../pages/dashboard/Monitoring/Cutting'; //
import MonitoringCutting from '../pages/dashboard/Monitoring/Cutting/add'; //
import DisplayMCutting from '../pages/dashboard/Monitoring/Cutting/display'; //

import MonitoringNumberingLayout from '../pages/dashboard/Monitoring/Numbering'; //
import MonitoringNumbering from '../pages/dashboard/Monitoring/Numbering/add'; //
import DisplayMNumbering from '../pages/dashboard/Monitoring/Numbering/display'; //

import MonitoringSupermarketLayout from '../pages/dashboard/Monitoring/Supermarket'; //
import MonitoringSupermarket from '../pages/dashboard/Monitoring/Supermarket/add'; //
import DisplayMSupermarket from '../pages/dashboard/Monitoring/Supermarket/display'; //

import { 
  IncomingLayout,
  OutgoingLayout,
  StatusLayout
} from '../pages/dashboard/Shipment'
import { Typography } from '@mui/material';

export default function TestRouter() {

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
            { path: 'document/:id', element: <DocumentQuotation/>}
          ]
        },
        { 
          path: 'order/sales-order', 
          element: <SalesOrderLayout />,
          children: [
            { path: ':id', element: <ShowSalesOrder />},
            { path: 'add', element: <AddSalesOrder />},
            { path: 'display', element: <DisplaySalesOrder />},
            { path: 'edit', element: <p>edit</p>},
            { path: 'document/:id', element: <DocumentSO/>}
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
          path: 'material/service', 
          element: <ServiceLayout/>, 
          children: [
            { path: ':id', element: <ShowService />},
            { path: 'add', element: <AddService />},
            { path: 'display', element: <DisplayService />},
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
          path: 'production/manufacture-planning', 
          element: <MPLayout />,
          children: [
            { path: ':id', element: <ShowMP />},
            { path: 'add', element: <AddMP />},
            { path: 'display', element: <DisplayMP />},
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
          path: 'inventory/vendor', 
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
            { path: 'document/:id', element: <DocumentPO/>}
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
        {
          path: 'material/machine',
          element: <MachineLayout />,
          children: [
            { path: ':id', element: <ShowMachine />},
            { path: 'add', element: <AddMachine />},
            { path: 'display', element: <DisplayMachine />},
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
        // Monitoring
        { 
          path: 'monitoring/', 
          children: [
            { path: 'main', element: <Ininih /> },
            { path: 'cutting', 
              element: <CuttingLayout/>,
              children: [
                { path: 'insert', element: <MonitoringSewing /> },
                { path: 'display', element: <DisplayMS/>},
                { path: 'spreading', 
                  element: <MonitoringSpreadLayout/>,
                  children: [
                    { path: 'insert', element: <MonitoringSpread />},
                    { path: 'display', element: <DisplayMSpread />},
                  ]
                },
                { path: 'cutting', 
                  element: <MonitoringCuttingLayout/>,
                  children: [
                    { path: 'insert', element: <MonitoringCutting />},
                    { path: 'display', element: <DisplayMCutting />},
                  ]
                },
                { path: 'numbering', 
                  element: <MonitoringNumberingLayout/>,
                  children: [
                    { path: 'insert', element: <MonitoringNumbering />},
                    { path: 'display', element: <DisplayMNumbering />},
                  ]
                }
              ]
            },
            { path: 'supermarket', 
              element: <MonitoringSupermarketLayout/>,
              children: [
                { path: 'insert', element: <MonitoringSupermarket /> },
                { path: 'display', element: <DisplayMSupermarket />}
              ]
            },
            { path: 'sewing', 
              element: <MonitoringSewingLayout/>,
              children: [
                { path: 'insert', element: <MonitoringSewing /> },
                { path: 'display', element: <DisplayMS/>}
              ]
            },
            { path: 'qc', 
              element: <MonitoringQCLayout/>,
              children: [
                { path: 'insert', element: <MonitoringQC /> },
                { path: 'display', element: <DisplayMQC/>}
              ]
            },
            { path: 'finished-goods', 
              element: <MonitoringFinishedGoodsLayout/>,
              children: [
                { path: 'insert', element: <MonitoringFinishedGoods />},
                { path: 'display', element: <DisplayMonitoringFinishedGoods />}
              ]
            },
            { 
              path: 'order', 
              element: <OrderProgressLayout/>,
              children: [
                { path: 'display', element: <DisplayOutputPerSalesOrder/>},
                { path: ':id', element: <DisplayOutputPerSalesOrderDetail/>}
              ]
            }
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
        // Finance
        { 
          path: 'facility/target', 
          element: <FacilityTargetLayout />,
          children: [
            { path: 'add', element: <AddLineTarget /> },
            { path: ':id', element: <ShowLineTarget /> },
            { path: 'display', element: <DisplayLineTarget /> }
          ]
        },
        // Shipment
        {
          path: 'shipment/incoming',
          element: <IncomingLayout/>,
          children: [
            { path: 'add', element: <AddIncomingShipment /> },
            { path: ':id', element: <ShowIncomingShipment /> },
            { path: 'display', element: <DisplayIncomingShipment /> }
          ]
        },
        {
          path: 'shipment/outgoing',
          element: <OutgoingLayout/>,
          children: [
            { path: 'add', element: <AddOutgoingShipment /> },
            { path: ':id', element: <ShowOutgoingShipment /> },
            { path: 'display', element: <DisplayOutgoingShipment /> }
          ]
        },
        {
          path: 'shipment/status',
          element: <StatusLayout/>,
          children: [
            { path: 'display', element: <Typography>Display</Typography> }
          ]
        },
        { path: 'inputer-spreading', 
          element: <MonitoringSpread /> 
        },
        { path: 'inputer-cutting', 
          element: <MonitoringCutting /> 
        },
        { path: 'inputer-numbering', 
          element: <MonitoringNumbering /> 
        },
        { path: 'inputer-supermarket', 
          element: <MonitoringSupermarket /> 
        },
        { path: 'inputer-sewing', 
          element: <MonitoringSewing /> 
        },
        { path: 'inputer-qc', 
          element: <MonitoringQC /> 
        },
        { path: 'inputer-finished-goods', 
          element: <MonitoringFinishedGoods />
        },
        { 
          path: 'user-management', 
          element: <UserManagementLayout />,
          children: [
            { path: 'reg-user', element: <UserRegister /> },
            { path: 'display', element: <DisplayUser /> },
            { path: 'display/:id', element: <UserTest /> }
          ]
        },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]);
}