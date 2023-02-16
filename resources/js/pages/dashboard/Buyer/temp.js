// this code for form
<Grid container spacing={2}>
  <Grid item xs={12}>
    <TextField
      fullWidth
      autoComplete="street"
      type="text"
      label="Alamat"
      {...getFieldProps('street')}
      error={Boolean(touched.street && errors.street)}
      helperText={touched.street && errors.street}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      fullWidth
      autoComplete="city"
      type="text"
      label="Kota"
      {...getFieldProps('city')}
      error={Boolean(touched.city && errors.city)}
      helperText={touched.city && errors.city}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      fullWidth
      autoComplete="province"
      type="text"
      label="Provinsi"
      {...getFieldProps('province')}
      error={Boolean(touched.province && errors.province)}
      helperText={touched.province && errors.province}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      fullWidth
      autoComplete="country"
      type="text"
      label="Country"
      {...getFieldProps('country')}
      error={Boolean(touched.country && errors.country)}
      helperText={touched.country && errors.country}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      fullWidth
      autoComplete="postal code"
      type="text"
      label="Postal Code"
      {...getFieldProps('postal_code')}
      error={Boolean(touched.postal_code && errors.postal_code)}
      helperText={touched.postal_code && errors.postal_code}
    />
  </Grid>
</Grid>;

// Grid data form for contact party
<Grid container spacing={3}>
  <Grid item xs={6}>
    <TextField
      fullWidth
      autoComplete="email"
      type="email"
      label="Email address"
      {...getFieldProps('email')}
      error={Boolean(touched.email && errors.email)}
      helperText={touched.email && errors.email}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      fullWidth
      autoComplete="phone number"
      type="text"
      label="Phone Number"
      {...getFieldProps('phone_number')}
      error={Boolean(touched.phone_number && errors.phone_number)}
      helperText={touched.phone_number && errors.phone_number}
    />
  </Grid>
</Grid>;
