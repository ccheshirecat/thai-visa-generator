import { VisaEmailConfig } from '@/types/visa-email-config';

export function generateReferenceNumber(prefix: 'REF' | 'PAY'): string {
  return `${prefix}${Array.from({ length: 8 }, () => 
    Math.floor(Math.random() * 10)).join('')}`;
}

export function getQRCodeUrl(reference: string): string {
  // Using a QR code generation service
  return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(reference)}`;
}

export function getBarcodeUrl(reference: string): string {
  // Using a barcode generation service
  return `https://barcodeapi.org/api/code128/${encodeURIComponent(reference)}`;
}

// New function to generate a default config with random reference numbers
export function generateDefaultConfigWithRandomRefs(): VisaEmailConfig {
  return {
    referenceNo: generateReferenceNumber('REF'),
    paymentRefNo: generateReferenceNumber('PAY'),
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

