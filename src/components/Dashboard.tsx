import { motion } from 'framer-motion';
import { Network, Shield, Activity } from 'lucide-react';
import { NetworkSegment, FirewallRule } from '../types';

interface DashboardProps {
  segments: NetworkSegment[];
  rules: FirewallRule[];
}

export function Dashboard({ segments, rules }: DashboardProps) {
  const allowRules = rules.filter(r => r.action === 'ALLOW').length;
  const denyRules = rules.filter(r => r.action === 'DENY').length;

  const stats = [
    { label: 'Network Segments', value: segments.length, icon: Network, color: 'bg-blue-600' },
    { label: 'Firewall Rules', value: rules.length, icon: Shield, color: 'bg-indigo-600' },
    { label: 'Active Connections', value: allowRules, icon: Activity, color: 'bg-green-600' },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Network Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-lg`}>
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Network Segments</h3>
            <div className="space-y-3">
              {segments.length === 0 ? (
                <p className="text-slate-500 text-sm">No segments created yet</p>
              ) : (
                segments.map(segment => (
                  <div
                    key={segment.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                      <div>
                        <p className="font-medium text-slate-800">{segment.name}</p>
                        <p className="text-xs text-slate-500">{segment.cidr}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-700">
                      {segment.role}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Firewall Rules Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-700 font-medium">ALLOW Rules</span>
                <span className="text-2xl font-bold text-green-700">{allowRules}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <span className="text-red-700 font-medium">DENY Rules</span>
                <span className="text-2xl font-bold text-red-700">{denyRules}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
