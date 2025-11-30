import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Bell, Lock, Shield, Smartphone, Moon, Globe } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setLoading(id);
    // Simulate API call
    setTimeout(() => {
      setLoading(null);
      toast({
        title: "Settings updated",
        description: "Your preferences have been saved.",
      });
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive alerts on your device.</p>
            </div>
            <Switch defaultChecked onCheckedChange={() => handleToggle("push")} disabled={loading === "push"} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive daily summaries and critical alerts.</p>
            </div>
            <Switch defaultChecked onCheckedChange={() => handleToggle("email")} disabled={loading === "email"} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive news and special offers.</p>
            </div>
            <Switch onCheckedChange={() => handleToggle("marketing")} disabled={loading === "marketing"} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Protect your account and assets.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Secure your account with 2FA.</p>
            </div>
            <Switch defaultChecked onCheckedChange={() => handleToggle("2fa")} disabled={loading === "2fa"} />
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Change Password</Label>
                <p className="text-sm text-muted-foreground">Update your password regularly.</p>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Preferences</CardTitle>
          </div>
          <CardDescription>Customize your Neobank experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Currency</Label>
              <p className="text-sm text-muted-foreground">Select your primary currency.</p>
            </div>
            <Button variant="outline" className="w-[100px]">USD ($)</Button>
          </div>
          <div className="flex items-center justify-between">
             <div className="space-y-0.5">
               <Label className="text-base">Theme</Label>
               <p className="text-sm text-muted-foreground">Select your interface theme.</p>
             </div>
             <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="border-2 border-primary">Dark</Button>
                <Button variant="outline" size="sm">Light</Button>
             </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
