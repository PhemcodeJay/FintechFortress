import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Bitcoin, DollarSign } from "lucide-react";

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.50, change: 1.2, shares: 10 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 240.30, change: -0.5, shares: 5 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 485.10, change: 2.4, shares: 8 },
];

const crypto = [
  { symbol: "BTC", name: "Bitcoin", price: 42350.00, change: 3.5, amount: 0.15 },
  { symbol: "ETH", name: "Ethereum", price: 2250.00, change: 1.2, amount: 2.5 },
];

export default function Investments() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Investments</h1>
          <p className="text-muted-foreground">Track your portfolio performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Discover</Button>
          <Button>Trade</Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-background border border-border">
           <CardHeader>
             <CardTitle>Total Value</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-4xl font-display font-bold mb-2">$12,840.50</div>
             <div className="flex items-center text-emerald-500">
               <TrendingUp className="w-4 h-4 mr-1" />
               <span className="font-medium">+8.4% (All time)</span>
             </div>
           </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-900/20 to-background border border-purple-500/20">
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Bitcoin className="w-5 h-5 text-purple-500" /> Crypto Holdings
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-3xl font-display font-bold mb-2">$6,420.00</div>
             <p className="text-sm text-muted-foreground">50% of portfolio</p>
           </CardContent>
        </Card>
      </div>

      {/* Stocks List */}
      <Card>
        <CardHeader>
          <CardTitle>Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stocks.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between border-b border-border last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xs font-bold">
                    {stock.symbol[0]}
                  </div>
                  <div>
                    <div className="font-bold">{stock.symbol}</div>
                    <div className="text-xs text-muted-foreground">{stock.shares} shares</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${stock.price.toFixed(2)}</div>
                  <div className={`text-xs ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Crypto List */}
      <Card>
        <CardHeader>
          <CardTitle>Crypto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crypto.map((c) => (
              <div key={c.symbol} className="flex items-center justify-between border-b border-border last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xs font-bold">
                    {c.symbol[0]}
                  </div>
                  <div>
                    <div className="font-bold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.amount} {c.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${c.price.toFixed(2)}</div>
                  <div className={`text-xs ${c.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {c.change >= 0 ? '+' : ''}{c.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
