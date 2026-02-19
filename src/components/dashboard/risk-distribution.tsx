"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { MOCK_WORKERS } from "@/app/lib/mock-data";

const COLORS = {
  Safe: 'hsl(142, 71%, 45%)',
  Warning: 'hsl(38, 92%, 50%)',
  Critical: 'hsl(21, 89%, 52%)'
};

const data = [
  { name: 'Safe', value: MOCK_WORKERS.filter(w => w.status === 'Safe').length },
  { name: 'Warning', value: MOCK_WORKERS.filter(w => w.status === 'Warning').length },
  { name: 'Critical', value: MOCK_WORKERS.filter(w => w.status === 'Critical').length },
];

const riskScores = MOCK_WORKERS.map(w => ({ name: w.name, score: w.riskScore }));

export function RiskDistribution() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-0">
          <CardTitle className="font-headline text-lg">Safety Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-widest font-body">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Safe</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent"></span> Critical</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg">
        <CardHeader className="pb-0">
          <CardTitle className="font-headline text-lg">Risk Score Analysis</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskScores}>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border shadow-sm rounded text-[11px] font-body">
                        <p className="font-bold">{payload[0].payload.name}</p>
                        <p className="text-primary">Score: {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {riskScores.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.score > 70 ? COLORS.Critical : entry.score > 30 ? COLORS.Warning : COLORS.Safe} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
