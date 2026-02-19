"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_WORKERS } from "@/app/lib/mock-data";
import { ShieldAlert, ShieldCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function WorkerStatusList() {
  return (
    <Card className="h-full border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline text-lg">Live Worker Monitoring</CardTitle>
        <Link href="/workers">
          <Badge variant="outline" className="font-body text-[10px] uppercase tracking-wider hover:bg-muted transition-colors cursor-pointer">
            {MOCK_WORKERS.length} Connected
          </Badge>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {MOCK_WORKERS.map((worker) => (
            <Link key={worker.id} href="/workers">
              <div className="p-4 hover:bg-muted/30 transition-colors group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white",
                      worker.status === 'Critical' ? "bg-destructive shadow-[0_0_12px_rgba(242,100,25,0.4)]" : 
                      worker.status === 'Warning' ? "bg-amber-500" : "bg-emerald-500"
                    )}>
                      {worker.status === 'Critical' ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm font-headline group-hover:text-primary transition-colors">{worker.name}</h4>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 font-body">
                        <MapPin className="w-3 h-3" /> {worker.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold font-body">{worker.riskScore}/100</div>
                    <div className="text-[10px] text-muted-foreground font-body">Risk Score</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <div className="bg-muted/50 p-1.5 rounded text-center">
                    <p className="text-[9px] text-muted-foreground uppercase font-body">Heart</p>
                    <p className="text-xs font-bold text-primary font-headline">{worker.metrics.heartRate}</p>
                  </div>
                  <div className="bg-muted/50 p-1.5 rounded text-center">
                    <p className="text-[9px] text-muted-foreground uppercase font-body">Gas</p>
                    <p className="text-xs font-bold text-primary font-headline">{worker.metrics.gasConcentration}%</p>
                  </div>
                  <div className="bg-muted/50 p-1.5 rounded text-center">
                    <p className="text-[9px] text-muted-foreground uppercase font-body">Temp</p>
                    <p className="text-xs font-bold text-primary font-headline">{worker.metrics.temperature}°C</p>
                  </div>
                  <div className="bg-muted/50 p-1.5 rounded text-center">
                    <p className="text-[9px] text-muted-foreground uppercase font-body">O2</p>
                    <p className="text-xs font-bold text-primary font-headline">{worker.metrics.oxygenLevel}%</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
