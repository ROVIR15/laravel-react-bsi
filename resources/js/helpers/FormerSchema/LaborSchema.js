import * as Yup from 'yup';

export const LaborSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    name: Yup.string().required('Name is required'),
    npwp: Yup.string().required('NPWP is required'),
    role_type_id: Yup.number().required('NPWP is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('city is required'),
    province: Yup.string().required('province is required'),
    country: Yup.string().required('country is required'),
    postal_code: Yup.string().required('postal_code is required'),
    phone_number: Yup.string().required('Phone Number is required'),
  });