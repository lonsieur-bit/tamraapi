"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Receipt } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface InvoiceItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export default function InvoiceGenerator() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [itemIdCounter, setItemIdCounter] = useState(2)
  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: "Ahmad",
    lastName: "Al-Rashid",
    email: "ahmad@example.com",
    phone: "+966501234567",
  })
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", name: "Premium Website Development", quantity: 1, price: 5000 },
    { id: "2", name: "SEO Optimization Package", quantity: 1, price: 2500 },
  ])

  const addItem = () => {
    const newId = (itemIdCounter + 1).toString()
    setItemIdCounter(itemIdCounter + 1)
    setItems([...items, { id: newId, name: "", quantity: 1, price: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted!")
    setLoading(true)

    try {
      const totalAmount = calculateTotal()
      console.log("Submitting invoice...", { customer, items, total: totalAmount })
      
      if (totalAmount === 0) {
        toast({
          title: "Invalid Amount",
          description: "Please add items with a total amount greater than 0",
          variant: "destructive",
        })
        setLoading(false)
        return
      }
      
      const response = await fetch("/api/tamara/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items,
          total: calculateTotal(),
        }),
      })

      console.log("Response status:", response.status)
      const data = await response.json()
      console.log("Response data:", data)

      if (data.cloudflare_error) {
        toast({
          title: "Deploy to Production Required",
          description: "The Tamara API is blocked by Cloudflare when running locally. Please deploy to production (e.g., Vercel) to use the live API.",
          variant: "destructive",
        })
        return
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        throw new Error(data.error || "Failed to create checkout")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create invoice",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Receipt className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-balance">Invoice Generator</h1>
        </div>
        <p className="text-muted-foreground text-lg">Create invoices with Tamara Buy Now, Pay Later</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-2">
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-2xl">Customer Information</CardTitle>
            <CardDescription>Enter your customer's details</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  required
                  value={customer.firstName}
                  onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  required
                  value={customer.lastName}
                  onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="+966501234567"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Invoice Items</CardTitle>
                <CardDescription>Add products or services</CardDescription>
              </div>
              <Button type="button" onClick={addItem} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-card">
                  <div className="md:col-span-5 space-y-2">
                    <Label htmlFor={`item-name-${item.id}`}>Item Name</Label>
                    <Input
                      id={`item-name-${item.id}`}
                      required
                      value={item.name}
                      onChange={(e) => updateItem(item.id, "name", e.target.value)}
                      placeholder="Product or service"
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`item-quantity-${item.id}`}>Quantity</Label>
                    <Input
                      id={`item-quantity-${item.id}`}
                      type="number"
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`item-price-${item.id}`}>Price (SAR)</Label>
                    <Input
                      id={`item-price-${item.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={item.price}
                      onChange={(e) => updateItem(item.id, "price", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total Amount</span>
                <span className="text-primary">{calculateTotal().toFixed(2)} SAR</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={loading || calculateTotal() === 0}
            className="w-full md:w-auto min-w-[300px] text-lg h-14"
          >
            {loading ? "Creating Invoice..." : "Generate Invoice with Tamara"}
          </Button>
        </div>
      </form>

      <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
        <h3 className="font-semibold mb-2 text-lg">About Tamara</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tamara offers flexible payment options for your customers. They can split their purchase into interest-free
          installments or pay later, making it easier to buy what they need today.
        </p>
      </div>
    </div>
  )
}
