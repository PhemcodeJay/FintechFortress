import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera } from "lucide-react";
import { useState } from "react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

type ProfileData = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "+1 (555) 000-0000", // Mock phone
    },
  });

  const onSubmit = async (data: ProfileData) => {
    setIsSubmitting(true);
    try {
      if (updateProfile) {
        await updateProfile({ name: data.name });
      } else {
         // Fallback if updateProfile isn't available yet (during dev)
         await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Public Profile</CardTitle>
          <CardDescription>This is how others will see you on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center sm:flex-row gap-6">
             <div className="relative group cursor-pointer">
               <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                 <AvatarImage src="https://github.com/shadcn.png" />
                 <AvatarFallback className="text-2xl">
                   {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                 </AvatarFallback>
               </Avatar>
               <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Camera className="w-6 h-6 text-white" />
               </div>
             </div>
             <div className="space-y-1 text-center sm:text-left">
               <h3 className="font-medium text-lg">{user?.name}</h3>
               <p className="text-sm text-muted-foreground">{user?.email}</p>
               <p className="text-xs bg-emerald-500/10 text-emerald-500 inline-block px-2 py-0.5 rounded-full border border-emerald-500/20 mt-2">
                 Verified Account
               </p>
             </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phone")} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" {...register("email")} disabled className="bg-muted/50" />
              <p className="text-xs text-muted-foreground">Contact support to change your email address.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t p-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
