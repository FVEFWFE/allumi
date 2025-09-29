import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { PostHog } from 'posthog-node'

// BTCPay webhook secret (you should set this in your BTCPay webhook settings)
const WEBHOOK_SECRET = process.env.BTCPAY_WEBHOOK_SECRET || ''

// Initialize PostHog for server-side tracking
const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_7oJ1U5BH2JiPLKNqvVQW3PxiCdgJrY7pQ5aXXYfVBeD',
  {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
  }
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('BTCPay-Sig') || ''
    
    // Verify webhook signature if secret is configured
    if (WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(body)
        .digest('hex')
      
      if (signature !== `sha256=${expectedSignature}`) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
    }

    const data = JSON.parse(body)
    
    // Handle different webhook events
    switch (data.type) {
      case 'InvoiceCreated':
        console.log('Invoice created:', data.invoiceId)
        // Track in PostHog
        posthog.capture({
          distinctId: data.metadata?.buyerEmail || `invoice-${data.invoiceId}`,
          event: 'btcpay_invoice_created',
          properties: {
            invoice_id: data.invoiceId,
            amount: data.amount,
            currency: data.currency,
            metadata: data.metadata
          }
        })
        break
        
      case 'InvoiceReceivedPayment':
        console.log('Payment received for invoice:', data.invoiceId)
        // Track payment received
        posthog.capture({
          distinctId: data.metadata?.buyerEmail || `invoice-${data.invoiceId}`,
          event: 'btcpay_payment_received',
          properties: {
            invoice_id: data.invoiceId,
            amount: data.amount,
            currency: data.currency
          }
        })
        break
        
      case 'InvoiceProcessing':
        console.log('Invoice processing:', data.invoiceId)
        // Payment seen in mempool, update status
        posthog.capture({
          distinctId: data.metadata?.buyerEmail || `invoice-${data.invoiceId}`,
          event: 'btcpay_invoice_processing',
          properties: {
            invoice_id: data.invoiceId,
            amount: data.amount,
            currency: data.currency
          }
        })
        break
        
      case 'InvoiceSettled':
        console.log('Payment settled for invoice:', data.invoiceId)
        // Payment confirmed on blockchain - track revenue
        const amount = parseFloat(data.amount || '399')
        posthog.capture({
          distinctId: data.metadata?.buyerEmail || `invoice-${data.invoiceId}`,
          event: 'purchase_completed',
          properties: {
            invoice_id: data.invoiceId,
            product_name: data.metadata?.productName || 'Premium Video Vault',
            revenue: amount,
            currency: data.currency || 'USD',
            payment_method: 'bitcoin',
            metadata: data.metadata
          }
        })
        // Also track as revenue event
        posthog.capture({
          distinctId: data.metadata?.buyerEmail || `invoice-${data.invoiceId}`,
          event: '$revenue',
          properties: {
            revenue: amount,
            currency: data.currency || 'USD'
          }
        })
        break
        
      case 'InvoiceExpired':
        console.log('Invoice expired:', data.invoiceId)
        posthog.capture({
          distinctId: data.metadata?.buyerEmail || `invoice-${data.invoiceId}`,
          event: 'btcpay_invoice_expired',
          properties: {
            invoice_id: data.invoiceId
          }
        })
        break
        
      case 'InvoiceInvalid':
        console.log('Invoice invalid:', data.invoiceId)
        posthog.capture({
          distinctId: data.metadata?.buyerEmail || `invoice-${data.invoiceId}`,
          event: 'btcpay_invoice_invalid',
          properties: {
            invoice_id: data.invoiceId
          }
        })
        break
        
      default:
        console.log('Unhandled webhook event:', data.type)
    }
    
    // Ensure PostHog events are flushed
    await posthog.shutdown()

    // Forward to external webhook if configured
    const externalWebhook = 'https://cleanbackend.medusajs.app/btcpay/webhook'
    if (externalWebhook) {
      try {
        await fetch(externalWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      } catch (error) {
        console.error('Failed to forward webhook:', error)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}