import { type NextRequest, NextResponse } from "next/server"

const TAMARA_API_KEY = process.env.TAMARA_API_KEY
const TAMARA_MERCHANT_ID = process.env.TAMARA_MERCHANT_ID
const TAMARA_API_URL = "https://api-sandbox.tamara.co"

export async function POST(request: NextRequest) {
  try {
    const { customer, items, total } = await request.json()

    // Generate unique order reference
    const orderReference = `INV-${Date.now()}`

    // Prepare Tamara checkout payload
    const tamaraPayload = {
      order_reference_id: orderReference,
      total_amount: {
        amount: total,
        currency: "SAR",
      },
      shipping_amount: {
        amount: 0,
        currency: "SAR",
      },
      tax_amount: {
        amount: 0,
        currency: "SAR",
      },
      description: "Invoice Payment",
      country_code: "SA",
      payment_type: "PAY_BY_INSTALMENTS",
      instalments: 3,
      locale: "en_US",
      platform: "web",
      is_mobile: false,
      items: items.map((item: any) => ({
        reference_id: item.id,
        type: "Physical",
        name: item.name,
        sku: item.id,
        quantity: item.quantity,
        discount_amount: {
          amount: 0,
          currency: "SAR",
        },
        tax_amount: {
          amount: 0,
          currency: "SAR",
        },
        unit_price: {
          amount: item.price,
          currency: "SAR",
        },
        total_amount: {
          amount: item.quantity * item.price,
          currency: "SAR",
        },
      })),
      consumer: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        phone_number: customer.phone,
        email: customer.email,
      },
      billing_address: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        line1: "Sample Address",
        city: "Riyadh",
        country_code: "SA",
        phone_number: customer.phone,
      },
      shipping_address: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        line1: "Sample Address",
        city: "Riyadh",
        country_code: "SA",
        phone_number: customer.phone,
      },
      merchant_url: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/failure`,
        cancel: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/cancel`,
        notification: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001"}/api/tamara/webhook`,
      },
    }

    // Try with proper User-Agent and headers to bypass Cloudflare
    const response = await fetch(`${TAMARA_API_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${TAMARA_API_KEY}`,
        "User-Agent": "TamaraAPI/1.0",
        "Accept-Language": "en-US,en;q=0.9",
      },
      body: JSON.stringify(tamaraPayload),
    })

    const responseText = await response.text()

    let data

    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error("Failed to parse Tamara response - likely blocked by Cloudflare")
      return NextResponse.json(
        {
          error: "Cloudflare blocked the request",
          details: "The Tamara API is protected by Cloudflare and is blocking requests from localhost. Please deploy to production (e.g., Vercel) to use the live API.",
          cloudflare_error: true,
        },
        { status: 503 },
      )
    }

    if (!response.ok) {
      console.error("Tamara API Error:", data)
      return NextResponse.json(
        { error: data.message || "Failed to create checkout", details: data },
        { status: response.status },
      )
    }

    return NextResponse.json({
      checkout_url: data.checkout_url,
      order_id: data.order_id,
    })
  } catch (error) {
    console.error("Error creating Tamara checkout:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
