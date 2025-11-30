import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Car, Plane, Smartphone } from "lucide-react";

const products = [
  { title: "Health Insurance", icon: Heart, price: "$45/mo", desc: "Full coverage for you and your family." },
  { title: "Auto Insurance", icon: Car, price: "$80/mo", desc: "Comprehensive coverage for your vehicle." },
  { title: "Travel Insurance", icon: Plane, price: "$12/trip", desc: "Medical & cancellation cover worldwide." },
  { title: "Device Protection", icon: Smartphone, price: "$8/mo", desc: "Coverage for theft and damage." },
];

export default function Insurance() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Insurance Marketplace</h1>
          <p className="text-muted-foreground">Protect what matters most to you.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Card key={p.title} className="flex flex-col">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <p.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">{p.title}</CardTitle>
              <CardDescription>{p.desc}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-2xl font-bold font-display">{p.price}</div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Get Quote</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="p-12 text-center">
          <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold mb-2">Your Active Policies</h3>
          <p className="text-muted-foreground mb-6">You don't have any active insurance policies yet.</p>
          <Button>Browse Marketplace</Button>
        </CardContent>
      </Card>
    </div>
  );
}
