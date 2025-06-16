
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

const Alerts: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
          <p className="text-muted-foreground">
            Safety alerts in your area.
          </p>
        </div>
      </div>

      <Card className="p-8 text-center">
        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Active Alerts</h3>
        <p className="text-muted-foreground">
          You're all caught up! No safety alerts in your area at the moment.
        </p>
      </Card>
    </div>
  );
};

export default Alerts;
