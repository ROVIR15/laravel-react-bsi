import React from 'react';
import { Navigate, useRoutes, Routes, Route, Link } from 'react-router-dom';

// Layout
import DashboardLayout from '../layouts/dashboard';
import {
  BuyerLayout,
  InquiryLayout,
  QuotationLayout,
  SalesOrderLayout,
  GoodsLayout,
  InventoryLayout,
  StockAdjustmentLayout,
  WorkCenterLayout,
  RoutingLayout,
  BillofMaterialLayout,
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
  VendorBillsLayout,
  MachineLayout,
  ServiceLayout,
  UserManagementLayout,
  OrderProgressLayout,
  FacilityTargetLayout,
  FacilityLayout,
  FactoryLayout,
  MPLayout,
  PaymentLayout,
  FinanceAccountLayout,
  FinanceAccountTransactionLayout,
  OrderPLAnalysisLayout,
  MaterialTransferLayout,
  CostingLayout,
  ScrapLayout,
  SubcontractLayout,
  ExportLayout,
  ImportLayout,
  LogsLayout,
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
import AddCosting from '../pages/dashboard/Costing/new';
import AddBillofMaterial from '../pages/dashboard/BillofMaterial/new';
import AddRouting from '../pages/dashboard/Routing/new';
import AddWorkCenter from '../pages/dashboard/WorkCenter/new';
import AddInventory from '../pages/dashboard/Inventory/new';
import AddStockAdjustment from '../pages/dashboard/Inventory/StockOpname/new';
import AddMaterialTransfer from '../pages/dashboard/Inventory/MaterialTransfer/new';
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
import AddInv from '../pages/dashboard/Finance/Invoice/new';
import AddVInv from '../pages/dashboard/Finance/VendorBills/new';
import AddMachine from '../pages/dashboard/Machine/add';
import AddLineTarget from '../pages/dashboard/LineTarget/add';
import AddFacility from '../pages/dashboard/Facility/add';
import AddFactory from '../pages/dashboard/Factory/add';
import AddOutgoingShipment from '../pages/dashboard/Shipment/Outgoing/new';
import AddIncomingShipment from '../pages/dashboard/Shipment/Incoming/new';
import AddSubcontractShipment from '../pages/dashboard/Shipment/Subcontract/new';
import AddMP from '../pages/dashboard/ManufacturePlanning/add';
import AddFinanceAccount from '../pages/dashboard/Finance/FinanceAccount/new';
import AddFinanceAccountTransaction from '../pages/dashboard/Finance/FinanceAccountTransaction/new';
import AddPayment from '../pages/dashboard/Finance/Payment/new';
import AddScrap from '../pages/dashboard/Inventory/Scrap/add';

// Display Pages
import DisplayBuyer from '../pages/dashboard/Buyer/display';
import DisplayGoods from '../pages/dashboard/Goods/display';
import DisplayService from '../pages/dashboard/Service/display';
import DisplayInquiry from '../pages/dashboard/Inquiry/display';
import DisplayQuote from '../pages/dashboard/Quotation/display';
import DisplaySalesOrder from '../pages/dashboard/SalesOrder/display';
import DisplayCosting from '../pages/dashboard/Costing/display';
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
import DisplayStockAjustment from '../pages/dashboard/Inventory/StockOpname/display';
import DisplayMaterialTranfer from '../pages/dashboard/Inventory/MaterialTransfer/display';
import DisplayMO from '../pages/dashboard/ManufactureOrder/display';

import DisplayInv from '../pages/dashboard/Finance/Invoice/display';
import DisplayVInv from '../pages/dashboard/Finance/VendorBills/display';
import DisplayMachine from '../pages/dashboard/Machine/display';
import DisplayOutputPerSalesOrder from '../pages/dashboard/OrderProgress/display';
import DisplayOutputPerSalesOrderDetail from '../pages/dashboard/OrderProgress/show';
import DisplayLineTarget from '../pages/dashboard/LineTarget/display';
import DisplayFacility from '../pages/dashboard/Facility/display';
import DisplayFactory from '../pages/dashboard/Factory/display';
import DisplayOutgoingShipment from '../pages/dashboard/Shipment/Outgoing/display';
import DisplayIncomingShipment from '../pages/dashboard/Shipment/Incoming/display';
import DisplaySubcontractShipment from '../pages/dashboard/Shipment/Subcontract/display';
import DisplayMP from '../pages/dashboard/ManufacturePlanning/display';
import DisplayFinanceAccount from '../pages/dashboard/Finance/FinanceAccount/display';
import DisplayFinanceAccountTransaction from '../pages/dashboard/Finance/FinanceAccountTransaction/display';
import DisplayPayment from '../pages/dashboard/Finance/Payment/display';
import DispayScrap from '../pages/dashboard/Inventory/Scrap/display';
import DisplayOrderPLAnalysis from '../pages/dashboard/OrderPLAnalysis/display';

// Show Pages
import ShowBuyer from '../pages/dashboard/Buyer/show';
import ShowGoods from '../pages/dashboard/Goods/show';
import ShowService from '../pages/dashboard/Service/show';
import ShowInquiry from '../pages/dashboard/Inquiry/show';
import ShowQuote from '../pages/dashboard/Quotation/show';
import ShowSalesOrder from '../pages/dashboard/SalesOrder/show';
import ShowCosting from '../pages/dashboard/Costing/show';
import ShowBillofMaterial from '../pages/dashboard/BillofMaterial/show';
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
import ShowInv from '../pages/dashboard/Finance/Invoice/show';
import ShowVInv from '../pages/dashboard/Finance/VendorBills/show';
import ShowMachine from '../pages/dashboard/Machine/show';
import ShowLineTarget from '../pages/dashboard/LineTarget/show';
import ShowFacility from '../pages/dashboard/Facility/show';
import ShowFactory from '../pages/dashboard/Factory/show';
import ShowStockAdjustment from '../pages/dashboard/Inventory/StockOpname/show';

import ShowOutgoingShipment from '../pages/dashboard/Shipment/Outgoing/show';
import ShowIncomingShipment from '../pages/dashboard/Shipment/Incoming/show';
import ShowSubcontractShipment from '../pages/dashboard/Shipment/Subcontract/show';

import ShowMP from '../pages/dashboard/ManufacturePlanning/show';
import ShowFinanceAccount from '../pages/dashboard/Finance/FinanceAccount/show';
// import ShowFinanceAccountTransaction from '../pages/dashboard/Finance/FinanceAccountTransaction/show';
import ShowPayment from '../pages/dashboard/Finance/Payment/show';

import ShowMaterialTransfer from '../pages/dashboard/Inventory/MaterialTransfer/show';
import ShowScrap from '../pages/dashboard/Inventory/Scrap/show';

//Document
import DocumentCosting from '../pages/dashboard/Costing/pages/Document';
import DocumentGR from '../pages/dashboard/GoodsReceipt/pages/Document';
import DocumentShipment from '../pages/dashboard/Shipment/Outgoing/pages/Document';
import DocumentQuotation from '../pages/dashboard/Quotation/pages/Document';
import DocumentRFQ from '../pages/dashboard/RFQ/pages/Document';
import DocumentPO from '../pages/dashboard/PurchaseOrder/pages/Document';
import DocumentSO from '../pages/dashboard/SalesOrder/pages/Document';
import DocumentINV from '../pages/dashboard/Finance/Invoice/pages/Document';
import DocumentVINV from '../pages/dashboard/Finance/VendorBills/pages/Document';
import DocumentMaterialTransfer from '../pages/dashboard/Inventory/MaterialTransfer/document';

//Report
import ReportINV from '../pages/dashboard/Finance/Invoice/pages/Report';
import ReportVB from '../pages/dashboard/Finance/VendorBills/pages/Report';

//Play MOW
import PlayMOW from '../pages/dashboard/ManufactureOrder/play';
import FinishMOW from '../pages/dashboard/ManufactureOrder/finish';

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

import MonitoringProduction from '../pages/dashboard/Monitoring/Production';

import AddOrderPLAnalysis from '../pages/dashboard/OrderPLAnalysis/new';
import ShowOrderPLAnalysis from '../pages/dashboard/OrderPLAnalysis/show';

import { 
  IncomingLayout,
  OutgoingLayout,
  StatusLayout
} from '../pages/dashboard/Shipment';

import CurrencyExchange from '../pages/dashboard/Finance/CurrencyExchange';
import { Typography } from '@mui/material';

import ValuationTable from '../pages/dashboard/ValuationAnalysis';
import NewFeatureUnamed from '../pages/dashboard/NewFeatureUnamed';
import Capacity from '../pages/dashboard/CapacityAnalysis';

import NotifMaterialTransfer from '../pages/dashboard/Inventory/MaterialTransfer/check';

// Berikat
import Inbound from '../pages/dashboard/Inventory/Reports/Pemasukan';
import Outbound from '../pages/dashboard/Inventory/Reports/Pengeluaran';
import WIPReport from '../pages/dashboard/Inventory/Reports/LaporanBarangWIP';
import WIPReport_Pemasukkan from '../pages/dashboard/Inventory/Reports/LaporanBarangWIPPemasukan';
import MaterialTransferReport from '../pages/dashboard/Inventory/Reports/MutasiHasilProduksi';
import MutasiBahanBaku from '../pages/dashboard/Inventory/Reports/MutasiBahanBaku';
import MaterialSkrapReport from '../pages/dashboard/Inventory/Reports/SkrapAndWaste/index';
import UsageReport from '../pages/dashboard/Inventory/Reports/Pemakaian';
import FGReport from '../pages/dashboard/Inventory/Reports/LaporanHasilProduksi';
import WasteReport from '../pages/dashboard/Inventory/Reports/LaporanWaste'
// KITE 
import AddImport from '../pages/dashboard/KITE/Import/new';
import ShowImport from '../pages/dashboard/KITE/Import/show';
import DisplayImport from '../pages/dashboard/KITE/Import/display';

import AddExport from '../pages/dashboard/KITE/Export/new';
import ShowExport from '../pages/dashboard/KITE/Export/show';
import DisplayExport from '../pages/dashboard/KITE/Export/display';

import NotificationList from '../layouts/dashboard/NotificationList';

import InventoryAdjustment from '../pages/dashboard/Inventory/StockOpname';

import PPICChart from '../pages/dashboard/OSR/PPIC';

export default function TestRouter() {

  return useRoutes([
    { path: '/', children: [
        { path: 'register', element: <Register /> },        
        { path: 'login', element: <Login /> },
      ]
    },
    // {
    //   path: '/downloads', children: [
    //     { path: 'purchase-order/:id', element: <TestVendor />}
    //   ]
    // },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'notifications',
          element: <NotificationList />
        },
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
            { path: 'display', element: <DisplayInventoryItem />}
          ]
        },
        { 
          path: 'inventory/adjustment', 
          element: <StockAdjustmentLayout />,
          children: [
            { path: ':id', element: <ShowStockAdjustment/>},
            { path: 'new', element: <AddStockAdjustment/>},
            { path: 'display', element: <DisplayStockAjustment />}
          ]
        },
        {
          path: 'inventory/scrap-management',
          element: <ScrapLayout />,
          children: [
            { path: ':id', element: <ShowScrap/>},
            { path: 'new', element: <AddScrap/>},
            { path: 'display', element: <DispayScrap/>},
          ]
        },
        {
          path: 'inventory/material-transfer',
          element: <MaterialTransferLayout/>,
          children: [
            { path: ':id', element: <ShowMaterialTransfer />},
            { path: 'new', element: <AddMaterialTransfer />},
            { path: 'display', element: <DisplayMaterialTranfer />},
            { path: 'notif', element: <NotifMaterialTransfer/>},
            { path: 'document/:id', element: <DocumentMaterialTransfer/>}
          ]
        },
        {
          path: 'material-transfer',
          children: [
            { path: 'request', element: <AddMaterialTransfer/> },
            { path: 'list', element: <DisplayMaterialTranfer/> },
            { path: 'list/:id', element: <ShowMaterialTransfer />}
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
          path: 'production/costing', 
          element: <CostingLayout />,
          children: [
            { path: ':id', element: <ShowCosting />},
            { path: 'add', element: <AddCosting />},
            { path: 'display', element: <DisplayCosting />},
            { path: 'document/:id', element: <DocumentCosting/>}
          ]
        },
        {
          path: 'production/bom',
          element: <BillofMaterialLayout/>,
          children: [
            { path: 'new', element: <AddBillofMaterial />},
            { path: ':id', element: <ShowBillofMaterial />},
            { path: 'display', element: <DisplayBOM />},
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
            { path: 'display', element: <DisplayVendor />}
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
          path: 'current-stock',
          element: <DisplayInventoryItem/>
        },
        {
          path: 'laporan-kite/laporan-barang-masuk',
          element: <Inbound/>
        },
        {
          path: 'laporan-kite/laporan-pengeluaran-barang-hasil-produksi',
          element: <Outbound/>
        },
        {
          path: 'laporan-kite/laporan-barang-pemakaian-subcontract',
          element: <WIPReport/>
        },
        {
          path: 'laporan-kite/laporan-barang-pemasukan-subcontract',
          element: <WIPReport_Pemasukkan/>
        },
        {
          path: 'laporan-kite/laporan-mutasi-hasil-produksi',
          element: <MaterialTransferReport />
        },
        {
          path: 'laporan-kite/laporan-mutasi-bahan-baku',
          element: <MutasiBahanBaku />
        },
        {
          path: 'laporan-kite/laporan-skrap-barang',
          element: <MaterialSkrapReport />
        },
        {
          path: 'laporan-kite/laporan-pemasukan-hasil-produksi',
          element: <FGReport/>
        },
        {
          path: 'laporan-kite/laporan-pemakaian',
          element: <UsageReport/>
        },
        {
          path: 'laporan-kite/laporan-mutasi-skrap',
          element: <WasteReport/>
        },
        {
          path: 'laporan-kite/cctv-factory',
          // element: <> {window.open('http://192.168.30.10/doc/page/login.asp?_168956862511', '_blank')} </>
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
            },
            {
              path: 'production',
              element: <MonitoringProduction />
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
            { path: 'document/:id', element: <DocumentINV/>},
            { path: 'report', element: <ReportINV/>}
          ]
        },
        { 
          path: 'finance/vendor-bills', 
          element: <VendorBillsLayout />,
          children: [
            { path: 'add', element: <AddVInv /> },
            { path: ':id', element: <ShowVInv /> },
            { path: 'display', element: <DisplayVInv /> },
            { path: 'document/:id', element: <DocumentVINV/>},
            { path: 'report', element: <ReportVB/>}
          ]
        },
        {
          path: 'finance/payment',
          element: <PaymentLayout/>,
          children: [
            { path: 'add', element: <AddPayment /> },
            { path: ':id', element: <ShowPayment /> },
            { path: 'display', element: <DisplayPayment /> }
          ]
        },
        {
          path: 'finance/account',
          element: <FinanceAccountLayout/>,
          children: [
            { path: 'add', element: <AddFinanceAccount /> },
            { path: ':id', element: <ShowFinanceAccount /> },
            { path: 'display', element: <DisplayFinanceAccount /> }
          ]
        },
        {
          path: 'finance/transaction',
          element: <FinanceAccountTransactionLayout/>,
          children: [
            { path: 'add', element: <AddFinanceAccountTransaction /> },
            // { path: ':id', element: <ShowFinanceAccountTransaction /> },
            { path: 'display', element: <DisplayFinanceAccountTransaction /> }
          ]
        },
        {
          path: 'finance/currency',
          element: <CurrencyExchange />
        },
        // Finance
        { 
          path: 'factory', 
          element: <FactoryLayout />,
          children: [
            { path: 'add', element: <AddFactory /> },
            { path: ':id', element: <ShowFactory /> },
            { path: 'display', element: <DisplayFactory /> },
          ]
        },
        {
          path: 'order-pl-analysis',
          element: <OrderPLAnalysisLayout />,
          children: [
            { path: 'add', element: <AddOrderPLAnalysis /> },
            { path: ':id', element: <ShowOrderPLAnalysis /> },
            { path: 'display', element: <DisplayOrderPLAnalysis /> },
          ]
        },
        {
          path: 'logs', 
          element: <LogsLayout />,
          children: [
            { path: 'display', element: <DisplayFacility /> }
          ]
        },
        { 
          path: 'facility', 
          element: <FacilityLayout />,
          children: [
            { path: 'add', element: <AddFacility /> },
            { path: ':id', element: <ShowFacility /> },
            { path: 'display', element: <DisplayFacility /> }
          ]
        },
        { 
          path: 'facility-target', 
          element: <FacilityTargetLayout />,
          children: [
            { path: 'add', element: <AddLineTarget /> },
            { path: ':id', element: <ShowLineTarget /> },
            { path: 'display', element: <DisplayLineTarget /> }
          ]
        },
        //KITE,
        {
          path: 'kite',
          children: [
            {
              path: 'import', 
              element: <ImportLayout />,
              children: [
                { path: 'add', element: <AddImport /> },
                { path: ':id', element: <ShowImport /> },
                { path: 'display', element: <DisplayImport /> }
              ]
            },
            {
              path: 'export', 
              element: <ExportLayout />,
              children: [
                { path: 'add', element: <AddExport /> },
                { path: ':id', element: <ShowExport /> },
                { path: 'display', element: <DisplayExport /> }
              ]
            }
          ]
        },
        // Shipment
        {
          path: 'shipment/incoming',
          element: <IncomingLayout/>,
          children: [
            { path: 'add', element: <AddIncomingShipment /> },
            { path: ':id', element: <ShowIncomingShipment /> },
            { path: 'display', element: <DisplayIncomingShipment /> },
            { path: 'document-gr/:id', element: <DocumentGR/>}
          ]
        },
        {
          path: 'shipment/outgoing',
          element: <OutgoingLayout/>,
          children: [
            { path: 'add', element: <AddOutgoingShipment /> },
            { path: ':id', element: <ShowOutgoingShipment /> },
            { path: 'display', element: <DisplayOutgoingShipment /> },
            { path: 'document/:id', element: <DocumentShipment /> }
          ]
        },
        {
          path: 'shipment/subcontract',
          element: <SubcontractLayout/>,
          children: [
            { path: 'add', element: <AddSubcontractShipment /> },
            { path: ':id', element: <ShowSubcontractShipment /> },
            { path: 'display', element: <DisplaySubcontractShipment /> },
            // { path: 'document/:id', element: <DocumentShipment /> }
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
            { path: ':id', element: <UserTest /> }
          ]
        },
        {
          path: 'capacity',
          element: <Capacity />
        },
        {
          path: 'osr-ppic-p',
          element: <PPICChart />
        },
        {
          path: 'goods-valuation',
          element: <ValuationTable />
        },
        {
          path: 'running-buyer-order',
          element: <NewFeatureUnamed />
        },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]);
}