import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NetworkSegment } from '../types';

interface TopologyCanvasProps {
  segments: NetworkSegment[];
  onUpdatePosition: (id: string, x: number, y: number) => void;
}

export function TopologyCanvas({ segments, onUpdatePosition }: TopologyCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, segment: NetworkSegment) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragging(segment.id);
    setOffset({
      x: e.clientX - rect.left - segment.position_x,
      y: e.clientY - rect.top - segment.position_y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - offset.x, rect.width - 150));
    const y = Math.max(0, Math.min(e.clientY - rect.top - offset.y, rect.height - 100));

    onUpdatePosition(dragging, x, y);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [dragging]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-[600px] bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden"
      ref={canvasRef}
      onMouseMove={handleMouseMove}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <pattern
            id="grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#cbd5e1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {segments.map((source, i) =>
          segments.slice(i + 1).map(target => (
            <line
              key={`${source.id}-${target.id}`}
              x1={source.position_x + 75}
              y1={source.position_y + 50}
              x2={target.position_x + 75}
              y2={target.position_y + 50}
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.4"
            />
          ))
        )}
      </svg>

      {segments.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-slate-400 text-lg">
            Add network segments to visualize topology
          </p>
        </div>
      )}

      {segments.map(segment => (
        <motion.div
          key={segment.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute cursor-move"
          style={{
            left: segment.position_x,
            top: segment.position_y,
          }}
          onMouseDown={e => handleMouseDown(e, segment)}
        >
          <div
            className="w-[150px] rounded-lg shadow-lg p-4 border-2 transition-transform hover:scale-105"
            style={{
              backgroundColor: segment.color,
              borderColor: segment.color,
              filter: 'brightness(1.1)',
            }}
          >
            <div className="text-white">
              <h4 className="font-bold text-sm mb-1">{segment.name}</h4>
              <p className="text-xs opacity-90">{segment.cidr}</p>
              <p className="text-xs opacity-75 mt-1">{segment.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
