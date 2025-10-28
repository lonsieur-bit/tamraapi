import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-3xl text-balance">Payment Failed</CardTitle>
          <CardDescription className="text-base">There was an issue processing your payment</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">Please try again or contact support if the problem persists.</p>
          <Link href="/">
            <Button className="w-full">Try Again</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
