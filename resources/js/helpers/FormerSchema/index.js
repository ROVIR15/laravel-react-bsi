import * as Yup from 'yup';

export const LaborSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    name: Yup.string().required('Name is required'),
    npwp: Yup.string().required('NPWP is required'),
    role_type_id: Yup.number().required('Bagian is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('city is required'),
    province: Yup.string().required('province is required'),
    country: Yup.string().required('country is required'),
    postal_code: Yup.string().required('postal_code is required'),
    phone_number: Yup.string().required('Phone Number is required'),
  });

export const BuyerSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  name: Yup.string().required('Name is required'),
  npwp: Yup.string().required('NPWP is required'),
  role_type_id: Yup.number().required('Kategori is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('city is required'),
  province: Yup.string().required('province is required'),
  country: Yup.string().required('country is required'),
  postal_code: Yup.string().required('postal_code is required'),
  phone_number: Yup.string().required('Phone Number is required'),
});

export const RFQSchema = Yup.object().shape({
  po_number: Yup.string().required('Inquiry References is required'),
  ship_to: Yup.number().required('Inquiry References is required'),
  bought_from: Yup.number().required('Inquiry References is required'),
  issue_date: Yup.date().required('PO Date is required'),
  valid_thru: Yup.date().required('Valid To is required'),
  delivery_date: Yup.date().required('Delivery Date is required')
});

export const QuotationSchema = Yup.object().shape({
  po_number: Yup.string().required('Inquiry References is required'),
  ship_to: Yup.number().required('Inquiry References is required'),
  sold_to: Yup.number().required('Inquiry References is required'),
  issue_date: Yup.date().required('PO Date is required'),
  valid_thru: Yup.date().required('Valid To is required'),
  delivery_date: Yup.date().required('Delivery Date is required')
});

export const PurchaseOrderSchema = Yup.object().shape({
  order_id: Yup.string().required('Order ID is required'),
  quote_id: Yup.string().required('Quote ID is required'),
  bought_from: Yup.string().required('Supplier is required'),
  ship_to: Yup.string().required('Penerima is required'),
  po_number: Yup.string().required('PO Number is required'),
  issue_date: Yup.date().required('province is required'),
  valid_thru: Yup.date().required('city is required'),
  delivery_date: Yup.date().required('province is required')
});

