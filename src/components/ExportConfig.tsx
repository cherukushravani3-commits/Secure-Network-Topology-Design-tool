import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileJson, FileCode } from 'lucide-react';
import yaml from 'js-yaml';
import { NetworkSegment, FirewallRule, NetworkConfiguration } from '../types';

interface ExportConfigProps {
  segments: NetworkSegment[];
  rules: FirewallRule[];
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export function ExportConfig({ segments, rules, onShowToast }: ExportConfigProps) {
  const [format, setFormat] = useState<'json' | 'yaml'>('json');

  const generateConfig = (): NetworkConfiguration => {
    return {
      segments: segments.map(s => ({
        id: s.id,
        name: s.name,
        cidr: s.cidr,
        role: s.role,
        position_x: s.position_x,
        position_y: s.position_y,
        color: s.color,
      })),
      rules: rules.map(r => ({
        id: r.id,
        name: r.name,
        source: r.source,
        destination: r.destination,
        protocol: r.protocol,
        port: r.port,
        action: r.action,
        priority: r.priority,
      })),
      exportedAt: new Date().toISOString(),
    };
  };

  const handleExport = () => {
    if (segments.length === 0 && rules.length === 0) {
      onShowToast('No data to export', 'error');
      return;
    }

    const config = generateConfig();
    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify(config, null, 2);
      filename = `network-config-${Date.now()}.json`;
      mimeType = 'application/json';
    } else {
      content = yaml.dump(config, { indent: 2 });
      filename = `network-config-${Date.now()}.yaml`;
      mimeType = 'text/yaml';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    onShowToast(`Configuration exported as ${format.toUpperCase()}`, 'success');
  };

  const config = generateConfig();
  const preview = format === 'json'
    ? JSON.stringify(config, null, 2)
    : yaml.dump(config, { indent: 2 });

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Export Configuration</h2>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Export Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Export Format
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setFormat('json')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    format === 'json'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <FileJson size={20} />
                  <span className="font-medium">JSON</span>
                </button>
                <button
                  onClick={() => setFormat('yaml')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    format === 'yaml'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <FileCode size={20} />
                  <span className="font-medium">YAML</span>
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleExport}
                disabled={segments.length === 0 && rules.length === 0}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <Download size={20} />
                Export as {format.toUpperCase()}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Configuration Preview</h3>

          <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-[500px]">
            <pre className="text-sm text-green-400 font-mono">
              {preview || '{\n  // No data to export\n}'}
            </pre>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-600 font-medium mb-1">Network Segments</p>
              <p className="text-2xl font-bold text-blue-700">{segments.length}</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm text-indigo-600 font-medium mb-1">Firewall Rules</p>
              <p className="text-2xl font-bold text-indigo-700">{rules.length}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600 font-medium mb-1">Total Items</p>
              <p className="text-2xl font-bold text-slate-700">{segments.length + rules.length}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
