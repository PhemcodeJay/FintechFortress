import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Landmark, CreditCard, Send } from "lucide-react";

export default function Banking() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Banking</h1>
          <p className="text-muted-foreground">Manage your accounts and transactions.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Account */}
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Main Account</CardTitle>
                <CardDescription className="text-primary-foreground/70">**** 8842</CardDescription>
              </div>
              <Landmark className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="text-3xl font-display font-bold">$14,250.00</div>
              <div className="text-sm text-muted-foreground">Available Balance</div>
            </div>
            <div className="flex gap-3">
              <Button size="sm" className="flex-1">Transfer</Button>
              <Button size="sm" variant="outline" className="flex-1">Details</Button>
            </div>
          </CardContent>
        </Card>

        {/* Savings Account */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>High Yield Savings</CardTitle>
                <CardDescription>**** 9921 • 4.5% APY</CardDescription>
              </div>
              <Landmark className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="text-3xl font-display font-bold">$32,000.00</div>
              <div className="text-sm text-emerald-500">+$120.00 interest this month</div>
            </div>
            <div className="flex gap-3">
              <Button size="sm" className="flex-1">Deposit</Button>
              <Button size="sm" variant="outline" className="flex-1">Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity List Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Transfer to Savings</div>
                    <div className="text-xs text-muted-foreground">Today, 12:00 PM</div>
                  </div>
                </div>
                <div className="font-medium">-$500.00</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Plus } from "lucide-react";
