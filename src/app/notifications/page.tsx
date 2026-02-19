import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, ShieldAlert, Zap, Info, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NOTIFICATIONS = [
  { id: 1, type: 'Alert', title: 'Critical Gas Level Spike', message: 'Methane levels exceeded 40% in Zone A-12. Immediate evacuation recommended.', time: '5 mins ago', read: false },
  { id: 2, type: 'AI Insight', title: 'Shift Rotation Optimization', message: 'AI suggests rotating Sector 4 team to Sector 2 to avoid heat exhaustion peak.', time: '1 hour ago', read: true },
  { id: 3, type: 'System', title: 'Maintenance Window', message: 'System update scheduled for 11 PM. Real-time monitoring will remain active.', time: '3 hours ago', read: true },
  { id: 4, type: 'Alert', title: 'Worker Pulse Warning', message: 'Ramesh Singh pulse rate elevated above 110 BPM for 10 minutes.', time: '4 hours ago', read: true },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 font-body">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold font-headline">Alert Center</h1>
              <p className="text-muted-foreground">System notifications and safety alerts.</p>
            </div>
          </div>
          <Button variant="ghost" className="text-xs text-primary font-bold">Mark all as read</Button>
        </div>

        <div className="space-y-4">
          {NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-5 rounded-2xl border transition-all hover:shadow-md cursor-pointer flex gap-4 ${notif.read ? 'bg-white opacity-80' : 'bg-primary/5 border-primary/20 ring-1 ring-primary/10'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                notif.type === 'Alert' ? 'bg-destructive text-white' : 
                notif.type === 'AI Insight' ? 'bg-amber-400 text-white' : 'bg-blue-500 text-white'
              }`}>
                {notif.type === 'Alert' ? <ShieldAlert className="w-6 h-6" /> : 
                 notif.type === 'AI Insight' ? <Zap className="w-6 h-6" /> : <Info className="w-6 h-6" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm font-headline">{notif.title}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    {notif.time}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{notif.message}</p>
                <div className="pt-2 flex gap-3">
                  <Button variant="link" className="p-0 h-auto text-[11px] font-bold text-primary uppercase">Take Action</Button>
                  <Button variant="link" className="p-0 h-auto text-[11px] font-bold text-muted-foreground uppercase">Dismiss</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
