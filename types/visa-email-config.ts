export interface VisaEmailConfig {
  referenceNo: string;
  paymentRefNo: string;
  applicantDetails: {
    name: string;
    passportNo: string;
    arrivalAirport: string;
    dateTimeOfArrival: string;
    flightNo: string;
  };
  dateTimeOfApplicationTransfer: string;
  dateTimeOfVisaDetermination: string;
}

export function generateDefaultConfig(): VisaEmailConfig {
  return {
    referenceNo: '',
    paymentRefNo: '',
    applicantDetails: {
      name: '',
      passportNo: '',
      arrivalAirport: '',
      dateTimeOfArrival: '',
      flightNo: '',
    },
    dateTimeOfApplicationTransfer: '',
    dateTimeOfVisaDetermination: '',
  };
}

