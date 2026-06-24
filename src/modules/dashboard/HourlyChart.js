import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { fmtMoneyExact } from '../../common/format.js'

export default function HourlyChart({ hourly }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={hourly} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#303030"
          vertical={false}
        />
        <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#999' }} />
        <YAxis tick={{ fontSize: 12, fill: '#999' }} width={48} />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.06)' }}
          contentStyle={{
            background: '#1f1f1f',
            border: '1px solid #303030',
            borderRadius: 6,
            color: '#fff',
          }}
          labelStyle={{ color: '#999' }}
          labelFormatter={(hour) => `${hour}`}
          formatter={(value) => [fmtMoneyExact(value), 'Sales']}
        />
        <Bar dataKey="sales" fill="#1677ff" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
