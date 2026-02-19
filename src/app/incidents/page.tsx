import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShieldAlert, Clock, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const INCIDENTS = [
  { id: 'INC-2401', worker: 'Ramesh Singh', type: 'Gas Spike', severity: 'Critical', time: '10:45 AM', status: 'Resolved' },
  { id: 'INC-2402', worker: 'Priya Sharma', type: 'Heat Warning', severity: 'Medium', time: '11:12 AM', status: 'Monitoring' },
  { id: 'INC-2403', worker: 'Amit Kumar', type: 'Low Oxygen', severity: 'Critical', time: '01:05 PM', status: 'Dispatched' },
  { id: 'INC-2404', worker: 'System', type: 'Sensor Offline', severity: 'Low', time: '02:30 PM', status: 'Resolved' },
];

export default function IncidentsPage() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 font-body">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold font-headline">Incident Logs</h1>
              <p className="text-muted-foreground">Historical and active safety incident records.</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9 h-10 w-[240px] rounded-full border-slate-200" placeholder="Search by ID or Worker..." />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-headline font-bold">Incident ID</TableHead>
                <TableHead className="font-headline font-bold">Type</TableHead>
                <TableHead className="font-headline font-bold">Severity</TableHead>
                <TableHead className="font-headline font-bold">Assigned Worker</TableHead>
                <TableHead className="font-headline font-bold">Time</TableHead>
                <TableHead className="font-headline font-bold">Status</TableHead>
                <TableHead className="font-headline font-bold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INCIDENTS.map((inc) => (
                <TableRow key={inc.id} className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-primary">{inc.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      {inc.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={inc.severity === 'Critical' ? 'destructive' : inc.severity === 'Medium' ? 'secondary' : 'outline'} className="text-[10px]">
                      {inc.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{inc.worker}</TableCell>
                  <TableCell className="text-sm flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {inc.time}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${inc.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                      {inc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-primary h-8 font-bold text-xs">Details</Button>
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
