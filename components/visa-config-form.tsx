"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VisaEmailConfig, generateDefaultConfig } from '@/types/visa-email-config'
import VisaEmailTemplate from './visa-email-template'
import { generateReferenceNumber } from '@/utils/reference-generator'

export default function VisaConfigForm() {
  const [config, setConfig] = useState<VisaEmailConfig>(generateDefaultConfig())

  const [showTemplate, setShowTemplate] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setConfig(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof VisaEmailConfig] as Record<string, string>),
          [child]: value
        }
      }))
    } else {
      setConfig(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalConfig = {
      ...config,
      referenceNo: config.referenceNo || generateReferenceNumber('REF'),
      paymentRefNo: config.paymentRefNo || generateReferenceNumber('PAY')
    }
    setConfig(finalConfig)
    setShowTemplate(true)
  }

  if (showTemplate) {
    return <VisaEmailTemplate config={config} />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Visa Email Configuration</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="referenceNo">Reference No. (Leave blank for random)</Label>
            <Input
              id="referenceNo"
              name="referenceNo"
              value={config.referenceNo}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="paymentRefNo">Payment Ref No. (Leave blank for random)</Label>
            <Input
              id="paymentRefNo"
              name="paymentRefNo"
              value={config.paymentRefNo}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Applicant Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="applicantDetails.name">Name</Label>
            <Input
              id="applicantDetails.name"
              name="applicantDetails.name"
              value={config.applicantDetails.name}
              onChange={handleInputChange}
              placeholder='John Doe'
              required
            />
          </div>
          <div>
            <Label htmlFor="applicantDetails.passportNo">Passport No.</Label>
            <Input
              id="applicantDetails.passportNo"
              name="applicantDetails.passportNo"
              value={config.applicantDetails.passportNo}
              placeholder='X1234567X'
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="applicantDetails.arrivalAirport">Arrival Airport</Label>
            <Input
              id="applicantDetails.arrivalAirport"
              name="applicantDetails.arrivalAirport"
              value={config.applicantDetails.arrivalAirport}
              onChange={handleInputChange}
              placeholder="BKK - Suvarnabhumi Intl."
              required
            />
          </div>
          <div>
            <Label htmlFor="applicantDetails.dateTimeOfArrival">Date/Time of Arrival</Label>
            <Input
              id="applicantDetails.dateTimeOfArrival"
              name="applicantDetails.dateTimeOfArrival"
              value={config.applicantDetails.dateTimeOfArrival}
              onChange={handleInputChange}
              placeholder='20/12/2024 at 10:15 AM'
              required
            />
          </div>
          <div>
            <Label htmlFor="applicantDetails.flightNo">Flight No.</Label>
            <Input
              id="applicantDetails.flightNo"
              name="applicantDetails.flightNo"
              value={config.applicantDetails.flightNo}
              onChange={handleInputChange}
              placeholder='SQ706'
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Application Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateTimeOfApplicationTransfer">Date/Time of Application Transfer</Label>
            <Input
              id="dateTimeOfApplicationTransfer"
              name="dateTimeOfApplicationTransfer"
              value={config.dateTimeOfApplicationTransfer}
              placeholder='12/12/2024 09:30 AM'
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="dateTimeOfVisaDetermination">Date/Time of Visa Determination</Label>
            <Input
              id="dateTimeOfVisaDetermination"
              name="dateTimeOfVisaDetermination"
              value={config.dateTimeOfVisaDetermination}
              onChange={handleInputChange}
              placeholder='15/12/2024 02:00 PM'
              required
            />
          </div>
        </div>
      </div>

      <Button type="submit">Generate Email Template</Button>
    </form>
  )
}

