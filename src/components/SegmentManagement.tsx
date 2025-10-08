import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { NetworkSegment } from '../types';

interface SegmentManagementProps {
  segments: NetworkSegment[];
  onAdd: (segment: Omit<NetworkSegment, 'id'>) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<NetworkSegment>) => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export function SegmentManagement({
  segments,
  onAdd,
  onDelete,
  onUpdate,
  onShowToast,
}: SegmentManagementProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    cidr: '',
    role: '',
    color: '#3b82f6',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.cidr || !formData.role) {
      onShowToast('Please fill all fields', 'error');
      return;
    }

    if (editingId) {
      onUpdate(editingId, formData);
      onShowToast('Segment updated successfully', 'success');
      setEditingId(null);
    } else {
      onAdd({
        ...formData,
        position_x: 100 + segments.length * 50,
        position_y: 100 + segments.length * 50,
      });
      onShowToast('Segment created successfully', 'success');
    }

    setFormData({ name: '', cidr: '', role: '', color: '#3b82f6' });
    setIsAdding(false);
  };

  const handleEdit = (segment: NetworkSegment) => {
    setEditingId(segment.id);
    setFormData({
      name: segment.name,
      cidr: segment.cidr,
      role: segment.role,
      color: segment.color,
    });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', cidr: '', role: '', color: '#3b82f6' });
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Network Segments</h2>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add Segment
            </button>
          )}
        </div>

        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              {editingId ? 'Edit Segment' : 'New Segment'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Segment Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., LAN, DMZ, Management"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    CIDR Notation
                  </label>
                  <input
                    type="text"
                    value={formData.cidr}
                    onChange={e => setFormData({ ...formData, cidr: e.target.value })}
                    placeholder="e.g., 192.168.1.0/24"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Internal Network, Public Zone"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={e => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-10 px-2 border border-slate-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Save size={18} />
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {segments.map(segment => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: segment.color }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{segment.name}</h3>
                  <p className="text-sm text-slate-600">
                    {segment.cidr} • {segment.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(segment)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => {
                    onDelete(segment.id);
                    onShowToast('Segment deleted', 'success');
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {segments.length === 0 && !isAdding && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-slate-500">No segments created yet. Add your first segment!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
