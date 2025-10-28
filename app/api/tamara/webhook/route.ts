import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    
    console.log("Tamara Webhook received:", payload)
    
    // Verify webhook signature if needed (check Tamara docs)
    // You would use the Notification key from the dashboard here
    
    // Handle different webhook event types
    switch (payload.event_type) {
      case "order.created":
        // Handle order creation
        break
      case "order.paid":
        // Handle successful payment
        break
      case "order.cancelled":
        // Handle cancelled order
        break
      default:
        console.log("Unknown webhook event:", payload.event_type)
    }
    
    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}

