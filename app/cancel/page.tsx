import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-yellow-600" />
          </div>
          <CardTitle className="text-3xl text-balance">Payment Cancelled</CardTitle>
          <CardDescription className="text-base">You cancelled the payment process</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">No charges were made. You can try again whenever you're ready.</p>
          <Link href="/">
            <Button className="w-full">Return to Invoice Generator</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
