"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, ShieldAlert, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const PREDICTIONS = [
  {
    workerId: 'W001',
    workerName: 'Ramesh Singh',
    hazard: 'Suffocation Risk',
    prediction: 'Critical oxygen drop predicted in 180s',
    confidence: '94%',
    type: 'Critical'
  },
  {
    workerId: 'W002',
    workerName: 'Priya Sharma',
    hazard: 'Methane Buildup',
    prediction: 'Gas levels rising steadily in Zone 4',
    confidence: '82%',
    type: 'Warning'
  }
];

export function HazardAlerts() {
  return (
    <Card className="border-none shadow-lg bg-slate-900 text-white overflow-hidden">
      <CardHeader className="border-b border-white/10 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            AI Hazard Prediction
          </CardTitle>
          <Badge className="bg-accent hover:bg-accent/80 text-white border-none animate-pulse">LIVE ANALYSIS</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {PREDICTIONS.map((p, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden group">
            <div className={p.type === 'Critical' ? "absolute left-0 top-0 bottom-0 w-1 bg-accent" : "absolute left-0 top-0 bottom-0 w-1 bg-amber-400"}></div>
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-headline font-bold text-sm text-amber-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  {p.hazard}
                </h5>
                <p className="text-xs text-white/60 font-body mt-1">Worker: <span className="text-white font-medium">{p.workerName}</span></p>
              </div>
              <Badge variant="outline" className="text-[10px] text-white/40 border-white/20">{p.confidence} AI Confidence</Badge>
            </div>
            
            <p className="text-sm font-medium font-body leading-relaxed text-white/90">
              {p.prediction}
            </p>
            
            <div className="flex gap-2 mt-2">
              <Link href="/incidents">
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-white text-[11px] h-8 px-3">
                  Initiate Rescue
                </Button>
              </Link>
              <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10 text-white text-[11px] h-8 px-3">
                Contact Worker
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-white/10 text-center">
          <Link href="/incidents">
            <button className="text-[11px] text-white/40 hover:text-white flex items-center gap-2 mx-auto font-body uppercase tracking-widest transition-colors">
              View All Predictions <ArrowRightCircle className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
