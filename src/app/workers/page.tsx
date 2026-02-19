import { MOCK_WORKERS } from "@/app/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorkersPage() {
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
              <h1 className="text-3xl font-bold font-headline">Worker Registry</h1>
              <p className="text-muted-foreground">Detailed status and health metrics for all active personnel.</p>
            </div>
          </div>
          <Badge className="px-3 py-1 font-headline">{MOCK_WORKERS.length} Total Personnel</Badge>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-headline font-bold">Worker</TableHead>
                <TableHead className="font-headline font-bold">Role</TableHead>
                <TableHead className="font-headline font-bold">Location</TableHead>
                <TableHead className="font-headline font-bold">Status</TableHead>
                <TableHead className="font-headline font-bold">Risk Score</TableHead>
                <TableHead className="font-headline font-bold">Health Metrics</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_WORKERS.map((worker) => (
                <TableRow key={worker.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <div>
                      <div className="font-bold text-sm">{worker.name}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{worker.id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{worker.role}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{worker.location}</TableCell>
                  <TableCell>
                    <Badge variant={worker.status === 'Safe' ? 'default' : worker.status === 'Warning' ? 'secondary' : 'destructive'} className="flex w-fit items-center gap-1 text-[10px]">
                      {worker.status === 'Critical' ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                      {worker.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${worker.riskScore > 70 ? 'bg-destructive' : worker.riskScore > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${worker.riskScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold">{worker.riskScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <div className="px-2 py-1 bg-primary/5 rounded border border-primary/10 text-center min-w-[40px]">
                        <div className="text-[8px] text-muted-foreground uppercase">BPM</div>
                        <div className="text-xs font-bold text-primary">{worker.metrics.heartRate}</div>
                      </div>
                      <div className="px-2 py-1 bg-primary/5 rounded border border-primary/10 text-center min-w-[40px]">
                        <div className="text-[8px] text-muted-foreground uppercase">GAS</div>
                        <div className="text-xs font-bold text-primary">{worker.metrics.gasConcentration}%</div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
