import { VisaEmailConfig, generateDefaultConfig } from '@/types/visa-email-config'
import Image from 'next/image'
import { Table, TableCell, TableRow } from "@/components/ui/table"
import { getQRCodeUrl, getBarcodeUrl, generateReferenceNumber } from '@/utils/reference-generator'

interface VisaEmailTemplateProps {
  config?: Partial<VisaEmailConfig>;
}

export default function VisaEmailTemplate({ config }: VisaEmailTemplateProps) {
  const mergedConfig: VisaEmailConfig = {
    ...generateDefaultConfig(),
    ...config,
    applicantDetails: {
      ...generateDefaultConfig().applicantDetails,
      ...(config?.applicantDetails || {})
    }
  };

  const {
    referenceNo = generateReferenceNumber('REF'),
    paymentRefNo = generateReferenceNumber('PAY'),
    applicantDetails,
    dateTimeOfApplicationTransfer,
    dateTimeOfVisaDetermination,
  } = mergedConfig;

  const qrCodeUrl = getQRCodeUrl(referenceNo);
  const barcodeUrl = getBarcodeUrl(paymentRefNo);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl bg-white">
        {/* Header */}
        <div className="relative">
          <div className="bg-[#0072bc] h-20 flex items-center">
            <div className="px-6">
              <Image
                src="/visa-logo.png?height=60&width=180"
                alt="eVisa Thailand Logo"
                width={180}
                height={60}
                className="h-16 w-auto"
              />
            </div>
          </div>
          <div className="h-4 bg-[#8cc63f]" />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Reference Numbers */}
          <div className="mb-8 flex justify-between text-gray-600">
            <div>
              <span>Reference No. </span>
              <span className="text-black">{referenceNo}</span>
            </div>
            <div>
              <span>Payment Ref No. </span>
              <span className="text-black">{paymentRefNo}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <p>Dear</p>
            
            <p>Thank you for your application for the Electronic Visa on Arrival to the Kingdom of Thailand.</p>
            
            <p>We are delighted to inform you that your application has been approved.</p>

            <h2 className="mt-8 text-xl text-gray-600">Your Electronic Visa on Arrival details</h2>

            {/* Visa Details Table */}
            <div className="border border-gray-200">
              <Table>
                <tbody>
                  <TableRow className="bg-[#e6f3f7]">
                    <TableCell className="w-[100px] font-medium">QR Code</TableCell>
                    <TableCell className="w-[500px] font-medium">Detail</TableCell>
                    <TableCell className="w-[180px] font-medium whitespace-nowrap">E-VOA Pre-Approval Code</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="align-top w-[100px] p-4">
                      <div className="w-[100px] h-[100px]">
                        <Image
                          src={qrCodeUrl}
                          alt="QR Code"
                          width={100}
                          height={100}
                          className="w-full h-auto"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="align-top space-y-2">
                      <p><span className="text-gray-600">Name:</span> {typeof applicantDetails.name === 'string' ? applicantDetails.name.toUpperCase() : applicantDetails.name}</p>
                      <p><span className="text-gray-600">Passport No.:</span> {typeof applicantDetails.passportNo === 'string' ? applicantDetails.passportNo.toUpperCase() : applicantDetails.passportNo}</p>
                      <p><span className="text-gray-600">Arrival Airport:</span> {typeof applicantDetails.arrivalAirport === 'string' ? applicantDetails.arrivalAirport.toUpperCase() : applicantDetails.arrivalAirport}</p>
                      <p><span className="text-gray-600">Date/time of Arrival:</span> {typeof applicantDetails.dateTimeOfArrival === 'string' ? applicantDetails.dateTimeOfArrival.toUpperCase() : applicantDetails.dateTimeOfArrival}</p>
                      <p><span className="text-gray-600">Flight No:</span> {typeof applicantDetails.flightNo === 'string' ? applicantDetails.flightNo.toUpperCase() : applicantDetails.flightNo}</p>
                    </TableCell>
                    <TableCell className="align-top w-[180px] p-4">
                      <div className="w-[180px]">
                        <Image
                          src={barcodeUrl}
                          alt="E-VOA Pre-Approval Code"
                          width={180}
                          height={48}
                          className="w-full h-auto"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </tbody>
              </Table>
            </div>

            <div className="space-y-2 text-gray-600">
              <p>Date/time of application transfer: <span className="text-black">{dateTimeOfApplicationTransfer}</span></p>
              <p>Date/time of visa determination: <span className="text-black">{dateTimeOfVisaDetermination}</span></p>
            </div>

            {/* Important Notice */}
            <div className="mt-8 space-y-4">
              <p className="font-bold">PRINT OUT THIS EMAIL TOGETHER WITH THE ATTACHED TM88 FORM. YOU MUST PRESENT THE DOCUMENTS UPON ARRIVAL AT THE IMMIGRATION CHECKPOINT</p>
              
              <div>
                <h3 className="font-semibold">Important:</h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Please note that the Immigration Bureau of Thailand grants you the Electronic Visa on Arrival and reserves the right to conduct further due diligence upon arrival at the immigration checkpoint in Thailand. The Electronic Visa on Arrival does not guarantee your entry into Thailand.</li>
                  <li>Upon arrival, you may be asked to present confirmed return flight ticket, confirmation of your accommodation in Thailand, and proof of funds of at least 10,000 Baht per person or 20,000 Baht per family during your stay.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Remark:</h3>
                <p>To obtain the service fee receipt, you may request at our eVisa Thailand counter at the destination airport. To obtain the visa fee receipt, please click here to download.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 space-y-2 text-right">
              <p>If you have any questions, please contact Contact@evisathailand.com</p>
              <p>Best regards,</p>
              <p>eVisa Thailand</p>
            </div>

            {/* Logos */}
            <div className="mt-8 flex justify-center gap-8 border-t pt-8">
              <Image
                src="/visa-footer-logo.png?height=50&width=100"
                alt="eVisa Logo"
                width={100}
                height={50}
                className="h-12 w-auto"
              />
              <Image
                src="/gw-logo.png?height=50&width=100"
                alt="GW Logo"
                width={100}
                height={50}
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

