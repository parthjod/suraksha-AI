import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendType = 'neutral', className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden border-none shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground font-body">{title}</p>
            <h3 className="text-2xl font-bold font-headline mt-1">{value}</h3>
            {trend && (
              <p className={cn(
                "text-xs mt-1 font-medium",
                trendType === 'positive' && "text-emerald-500",
                trendType === 'negative' && "text-rose-500",
                trendType === 'neutral' && "text-muted-foreground"
              )}>
                {trend}
              </p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-xl">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
