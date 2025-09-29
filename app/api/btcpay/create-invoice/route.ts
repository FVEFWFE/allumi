import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const BTCPAY_INSTANCE = process.env.NEXT_PUBLIC_BTCPAY_URL || 'https://btcpay.arbvault.io'
const STORE_ID = process.env.BTCPAY_STORE_ID || '4xdhCb2JyeBAY8BFz4joxEKuDoRCS56e22htNaWRSy5L'
const API_KEY = process.env.BTCPAY_API_KEY || '124a9da249445843e1e22f32b13763cabb8668da'

export async function POST(request: NextRequest) {
  try {
    const { email, metadata, price, currency, orderId, itemDesc } = await request.json()

    // Create invoice for Premium Vault access
    const invoiceData = {
      amount: price?.toString() || '399',
      currency: currency || 'USD',
      metadata: {
        orderId: orderId || `premium-vault-${Date.now()}`,
        buyerEmail: email || '',
        productName: itemDesc || 'Premium Video Vault - Annual Access',
        ...metadata
      },
      checkout: {
        speedPolicy: 'HighSpeed',
        paymentMethods: ['BTC', 'BTC-LightningNetwork'],
        redirectURL: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dexvolkov.com'}/videos/premium/success`,
        redirectAutomatically: true,
        requiresRefundEmail: false,
      },
      notificationUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dexvolkov.com'}/api/btcpay/webhook`,
      receipt: {
        enabled: true,
        showQR: true,
        showPayments: true,
      }
    }

    const response = await axios.post(
      `${BTCPAY_INSTANCE}/api/v1/stores/${STORE_ID}/invoices`,
      invoiceData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${API_KEY}`,
        },
      }
    )

    // Track invoice creation in PostHog
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('invoice_created', {
        invoice_id: response.data.id,
        amount: price,
        currency: currency,
        product: itemDesc
      })
    }

    return NextResponse.json({
      success: true,
      checkoutLink: response.data.checkoutLink,
      invoiceId: response.data.id,
    })
  } catch (error) {
    console.error('BTCPay invoice creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create invoice',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}