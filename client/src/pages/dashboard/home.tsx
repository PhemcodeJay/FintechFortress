import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal, CreditCard, Wallet, Plus, Search } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 5200 },
  { name: "Sep", value: 6100 },
  { name: "Oct", value: 5800 },
  { name: "Nov", value: 7500 },
  { name: "Dec", value: 8500 },
];

const transactions = [
  { id: 1, name: "Apple Store", date: "Today, 10:23 AM", amount: -1299.00, type: "expense", category: "Electronics" },
  { id: 2, name: "Salary Deposit", date: "Yesterday", amount: 4500.00, type: "income", category: "Salary" },
  { id: 3, name: "Uber", date: "Yesterday", amount: -24.50, type: "expense", category: "Transport" },
  { id: 4, name: "Whole Foods", date: "Nov 28", amount: -142.80, type: "expense", category: "Groceries" },
  { id: 5, name: "Netflix", date: "Nov 27", amount: -15.99, type: "expense", category: "Subscription" },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, here's your financial overview.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10">
            <ArrowDownLeft className="mr-2 h-4 w-4" /> Request
          </Button>
          <Button className="h-10">
            <ArrowUpRight className="mr-2 h-4 w-4" /> Send Money
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary-foreground/70">Total Balance</CardDescription>
            <CardTitle className="text-3xl font-display text-foreground">$24,562.00</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-emerald-500">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Income</CardDescription>
            <CardTitle className="text-2xl font-display">$8,250.00</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-emerald-500">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+4.2% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Expenses</CardDescription>
            <CardTitle className="text-2xl font-display">$3,405.00</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-rose-500">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+1.2% vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Your balance growth over the last year.</CardDescription>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--popover-foreground))'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="bg-secondary/30 border-none">
               <CardContent className="p-6 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center">
                   <Wallet className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-medium">Crypto Portfolio</h3>
                   <p className="text-2xl font-bold font-display">$4,250.50</p>
                 </div>
               </CardContent>
             </Card>
             <Card className="bg-secondary/30 border-none">
               <CardContent className="p-6 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                   <CreditCard className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-medium">Upcoming Bills</h3>
                   <p className="text-2xl font-bold font-display">$350.00</p>
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>

        {/* Right Side - Recent Transactions & Cards */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div className="font-display text-lg font-bold tracking-widest">NEOBANK</div>
                <CreditCard className="opacity-50" />
              </div>
              <div className="mb-8">
                <div className="text-xs opacity-50 uppercase tracking-wider mb-1">Balance</div>
                <div className="text-3xl font-mono font-bold">$12,450.00</div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-50 uppercase tracking-wider mb-1">Card Holder</div>
                  <div className="font-medium">ALEX STERLING</div>
                </div>
                <div className="font-mono">•••• 4242</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-secondary text-muted-foreground'}`}>
                      {t.type === 'income' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${t.type === 'income' ? 'text-emerald-500' : ''}`}>
                      {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
