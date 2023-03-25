export function checkStatusPayment(payment_amount, billed_amount) {
  if(payment_amount >= billed_amount) return {status: 'Paid', color: 'rgb(27, 128, 106)', backgroundColor: 'rgba(54, 179, 126, 0.16)'};
  else if(payment_amount > 0) return {status: 'Partially', color: 'rgb(183, 110, 0)', backgroundColor: 'rgba(255, 171, 0, 0.16)'};
  else return {status: 'Unpaid', color: 'rgb(183, 29, 24)', backgroundColor: 'rgba(255, 86, 48, 0.16)'};
}