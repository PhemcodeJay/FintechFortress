import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard as CardIcon, Lock, Eye, Copy } from "lucide-react";

export default function Cards() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Cards</h1>
          <p className="text-muted-foreground">Manage your physical and virtual cards.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metal Card */}
        <div className="group relative perspective-1000">
          <div className="relative h-[220px] w-full rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-8">
              <div className="font-display text-lg font-bold tracking-widest">NEOBANK</div>
              <div className="px-2 py-1 rounded bg-white/10 text-[10px] font-bold uppercase tracking-wider border border-white/10">Metal</div>
            </div>
            <div className="flex items-center gap-2 mb-8">
               <div className="w-10 h-6 bg-yellow-500/20 rounded flex items-center justify-center border border-yellow-500/40">
                 <div className="w-6 h-4 bg-yellow-500/40 rounded-sm"></div>
               </div>
               <CardIcon className="w-6 h-6 opacity-50" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="font-mono text-xl tracking-wider mb-2">•••• 4242</div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Alex Sterling</div>
              </div>
              <div className="font-mono text-sm opacity-70">12/28</div>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1"><Lock className="w-3 h-3 mr-2"/> Freeze</Button>
            <Button variant="outline" size="sm" className="flex-1"><Eye className="w-3 h-3 mr-2"/> Show</Button>
          </div>
        </div>

        {/* Virtual Card */}
        <div className="group relative">
          <div className="relative h-[220px] w-full rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-6 text-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-8">
              <div className="font-display text-lg font-bold tracking-widest">NEOBANK</div>
              <div className="px-2 py-1 rounded bg-white/10 text-[10px] font-bold uppercase tracking-wider border border-white/10">Virtual</div>
            </div>
            <div className="flex items-center gap-2 mb-8">
               <CardIcon className="w-6 h-6 opacity-50" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="font-mono text-xl tracking-wider mb-2">•••• 9912</div>
                <div className="text-xs opacity-50 uppercase tracking-wider">Online Shopping</div>
              </div>
              <div className="font-mono text-sm opacity-70">09/26</div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1"><Lock className="w-3 h-3 mr-2"/> Freeze</Button>
            <Button variant="outline" size="sm" className="flex-1"><Copy className="w-3 h-3 mr-2"/> Copy</Button>
          </div>
        </div>

        {/* Add New Card Placeholder */}
        <div className="h-[220px] rounded-2xl border-2 border-dashed border-muted hover:border-primary/50 hover:bg-muted/10 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium">Get a new card</span>
        </div>
      </div>
    </div>
  );
}
