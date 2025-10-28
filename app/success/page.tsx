import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-3xl text-balance">Payment Successful!</CardTitle>
          <CardDescription className="text-base">Your invoice has been paid successfully with Tamara</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Thank you for your payment. You will receive a confirmation email shortly.
          </p>
          <Link href="/">
            <Button className="w-full">Create Another Invoice</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
