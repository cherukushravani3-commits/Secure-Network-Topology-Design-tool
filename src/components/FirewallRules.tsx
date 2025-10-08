import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Shield } from 'lucide-react';
import { FirewallRule } from '../types';

interface FirewallRulesProps {
  rules: FirewallRule[];
  onAdd: (rule: Omit<FirewallRule, 'id'>) => void;
  onDelete: (id: string) => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export function FirewallRules({ rules, onAdd, onDelete, onShowToast }: FirewallRulesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    source: '',
    destination: '',
    protocol: 'TCP' as FirewallRule['protocol'],
    port: '',
    action: 'ALLOW' as FirewallRule['action'],
    priority: 100,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.source || !formData.destination || !formData.port) {
      onShowToast('Please fill all fields', 'error');
      return;
    }

    onAdd(formData);
    onShowToast('Firewall rule created successfully', 'success');
    setFormData({
      name: '',
      source: '',
      destination: '',
      protocol: 'TCP',
      port: '',
      action: 'ALLOW',
      priority: 100,
    });
    setIsAdding(false);
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Firewall Rules</h2>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add Rule
            </button>
          )}
        </div>

        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-4">New Firewall Rule</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Allow HTTP from DMZ"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Source</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={e => setFormData({ ...formData, source: e.target.value })}
                    placeholder="e.g., 192.168.1.0/24 or ANY"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g., 10.0.0.0/8 or ANY"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Protocol
                  </label>
                  <select
                    value={formData.protocol}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        protocol: e.target.value as FirewallRule['protocol'],
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="TCP">TCP</option>
                    <option value="UDP">UDP</option>
                    <option value="ICMP">ICMP</option>
                    <option value="ANY">ANY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Port</label>
                  <input
                    type="text"
                    value={formData.port}
                    onChange={e => setFormData({ ...formData, port: e.target.value })}
                    placeholder="e.g., 80, 443, 1-1024"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Action</label>
                  <select
                    value={formData.action}
                    onChange={e =>
                      setFormData({ ...formData, action: e.target.value as FirewallRule['action'] })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="ALLOW">ALLOW</option>
                    <option value="DENY">DENY</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Priority (lower = higher priority)
                </label>
                <input
                  type="number"
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Shield size={18} />
                  Create Rule
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="space-y-4">
          {rules
            .sort((a, b) => a.priority - b.priority)
            .map(rule => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                  rule.action === 'ALLOW' ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">{rule.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          rule.action === 'ALLOW'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {rule.action}
                      </span>
                      <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded">
                        Priority: {rule.priority}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600">
                      <div>
                        <span className="font-medium">Source:</span>
                        <p className="text-slate-800">{rule.source}</p>
                      </div>
                      <div>
                        <span className="font-medium">Destination:</span>
                        <p className="text-slate-800">{rule.destination}</p>
                      </div>
                      <div>
                        <span className="font-medium">Protocol:</span>
                        <p className="text-slate-800">{rule.protocol}</p>
                      </div>
                      <div>
                        <span className="font-medium">Port:</span>
                        <p className="text-slate-800">{rule.port}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onDelete(rule.id);
                      onShowToast('Rule deleted', 'success');
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
        </div>

        {rules.length === 0 && !isAdding && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-slate-500">No firewall rules created yet. Add your first rule!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
