import { useEffect, useState } from 'react';
import api from '../../api/axios';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/tasks/analytics/summary');
        console.log('Analytics data:', response.data);
        setAnalytics(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      {analytics ? (
        <div className="space-y-2">
          <p><strong>Total Tasks:</strong> {analytics.totalTasks}</p>
          <p><strong>Completed Tasks:</strong> {analytics.completedTasks}</p>
          <p><strong>Pending Tasks:</strong> {analytics.pendingTasks}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Analytics;
