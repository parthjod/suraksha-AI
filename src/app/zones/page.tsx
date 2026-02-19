import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wind, Thermometer, ShieldCheck, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ZONES = [
  { id: 'Z1', name: 'Sector 4, Manhole A-12', condition: 'High Risk', gasLevel: '45%', temp: '38°C', activeWorkers: 3 },
  { id: 'Z2', name: 'Sector 2, Pipeline Main', condition: 'Caution', gasLevel: '12%', temp: '34°C', activeWorkers: 5 },
  { id: 'Z3', name: 'Sector 7, Street Drain', condition: 'Optimal', gasLevel: '2%', temp: '32°C', activeWorkers: 8 },
  { id: 'Z4', name: 'Sector 1, Waste Plant', condition: 'Optimal', gasLevel: '5%', temp: '31°C', activeWorkers: 12 },
  { id: 'Z5', name: 'Sector 4, Site Hub', condition: 'Optimal', gasLevel: '0%', temp: '30°C', activeWorkers: 4 },
];

export default function ZonesPage() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 font-body">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold font-headline">Operational Zones</h1>
              <p className="text-muted-foreground">Real-time environmental monitoring across Solapur City sectors.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ZONES.map((zone) => (
            <Card key={zone.id} className="border-none shadow-md overflow-hidden group">
              <CardHeader className={`pb-4 ${zone.condition === 'High Risk' ? 'bg-destructive/10' : zone.condition === 'Caution' ? 'bg-amber-50' : 'bg-emerald-50'}`}>
                <div className="flex justify-between items-start">
                  <Badge variant={zone.condition === 'High Risk' ? 'destructive' : zone.condition === 'Caution' ? 'secondary' : 'default'} className="uppercase text-[10px]">
                    {zone.condition}
                  </Badge>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{zone.id}</span>
                </div>
                <CardTitle className="mt-3 flex items-center gap-2 font-headline text-lg">
                  <MapPin className="w-4 h-4 text-primary" />
                  {zone.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Wind className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Gas Level</p>
                      <p className="text-sm font-bold">{zone.gasLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Thermometer className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Temperature</p>
                      <p className="text-sm font-bold">{zone.temp}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <p className="text-xs text-muted-foreground font-medium">{zone.activeWorkers} Workers Active</p>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 font-bold h-7 text-[11px]">View Sensor History</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
