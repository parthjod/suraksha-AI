import { StatCard } from "@/components/dashboard/stat-card";
import { WorkerStatusList } from "@/components/dashboard/worker-status-list";
import { HazardAlerts } from "@/components/dashboard/hazard-alerts";
import { RiskDistribution } from "@/components/dashboard/risk-distribution";
import { AiAssistantPanel } from "@/components/dashboard/ai-assistant-panel";
import { 
  Users, 
  ShieldAlert, 
  Activity, 
  Wind, 
  Bell, 
  Search, 
  Menu,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      {/* Top Mission Control Navigation */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-headline tracking-tight text-primary">SURAKSHA AI</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Command Center • Solapur MC</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1 ml-10">
            <Link href="/">
              <Button variant="ghost" className="text-sm font-medium h-9 text-primary bg-primary/5">Dashboard</Button>
            </Link>
            <Link href="/workers">
              <Button variant="ghost" className="text-sm font-medium h-9 text-muted-foreground hover:text-primary">Workers</Button>
            </Link>
            <Link href="/zones">
              <Button variant="ghost" className="text-sm font-medium h-9 text-muted-foreground hover:text-primary">Zones</Button>
            </Link>
            <Link href="/incidents">
              <Button variant="ghost" className="text-sm font-medium h-9 text-muted-foreground hover:text-primary">Incident Logs</Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search worker or zone..." 
              className="pl-9 pr-4 h-9 w-64 rounded-full bg-slate-100 border-none text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          <Link href="/notifications">
            <Button variant="outline" size="icon" className="relative h-10 w-10 rounded-full border-slate-200">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-white animate-bounce"></span>
            </Button>
          </Link>
          <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold font-headline">Admin Control</p>
              <p className="text-[10px] text-emerald-500 font-bold uppercase">System Online</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-primary overflow-hidden">
              <img src="https://picsum.photos/seed/admin/100/100" alt="Profile" data-ai-hint="Admin avatar" />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-w-[1600px] mx-auto w-full">
        {/* Top Metric Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/workers" className="block transition-transform hover:scale-[1.02]">
            <StatCard 
              title="Total Active Workers" 
              value="124" 
              icon={Users} 
              trend="+12% from last shift"
              trendType="positive"
            />
          </Link>
          <Link href="/incidents" className="block transition-transform hover:scale-[1.02]">
            <StatCard 
              title="Critical Hazards" 
              value="02" 
              icon={ShieldAlert} 
              trend="Needs Immediate Action"
              trendType="negative"
              className="ring-2 ring-accent/50"
            />
          </Link>
          <StatCard 
            title="Avg Pulse Rate" 
            value="78 BPM" 
            icon={Activity} 
            trend="Within Normal Bounds"
            trendType="positive"
          />
          <Link href="/zones" className="block transition-transform hover:scale-[1.02]">
            <StatCard 
              title="Gas Warning Zones" 
              value="05" 
              icon={Wind} 
              trend="Active Monitoring"
              trendType="neutral"
            />
          </Link>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Workers & Risk Stats */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="xl:col-span-1">
                <WorkerStatusList />
              </div>
              <div className="xl:col-span-1 flex flex-col gap-8">
                <HazardAlerts />
                <div className="flex-1">
                  <RiskDistribution />
                </div>
              </div>
            </div>

            {/* AI Insights Banner */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
              <div className="bg-primary text-white p-3 rounded-xl">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-headline text-primary">AI Proactive Recommendation</h3>
                <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">
                  Based on historical trends and current humidity levels in Sector 4, methane pockets are likely to shift in the next 2 hours. 
                  Recommend early extraction of workers in Zone A-12 and shift rotation to Sector 2 where air quality is 15% better.
                </p>
                <div className="flex gap-3 mt-4">
                  <Button size="sm" className="bg-primary text-white">Implement Suggestion</Button>
                  <Button size="sm" variant="ghost" className="text-primary underline font-bold">Review Data logs</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Assistant Chat */}
          <div className="lg:col-span-4 h-full sticky top-24">
            <AiAssistantPanel />
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="px-10 py-4 border-t bg-white flex flex-col sm:flex-row justify-between items-center text-muted-foreground">
        <p className="text-xs font-medium">© 2024 Solapur Municipal Corporation • SURAKSHA AI v2.5</p>
        <div className="flex gap-6 mt-4 sm:mt-0 text-[10px] font-bold uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/status" className="hover:text-primary transition-colors">System Status</Link>
          <Link href="/logs" className="hover:text-primary transition-colors">API Logs</Link>
        </div>
      </footer>
    </div>
  );
}
