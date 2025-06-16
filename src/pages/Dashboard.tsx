
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, MessageCircle, MapPin } from 'lucide-react';
import RecentIncidents from '@/components/dashboard/RecentIncidents';
import { useDashboardStats } from '@/hooks/useDashboardStats';

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of public safety and emergency response data.
          </p>
        </div>
        <Link to="/report">
          <Button className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700">
            Report Incident
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? '...' : stats?.activeIncidents || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently being handled
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>
            Latest reported incidents in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentIncidents />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/map">
              <Button className="w-full text-left justify-start" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                View Safety Map
              </Button>
            </Link>
            <Link to="/chat">
              <Button className="w-full text-left justify-start" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Emergency Assistance
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Safety Tips</CardTitle>
            <CardDescription>
              Stay prepared with these important safety guidelines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Emergency Preparedness</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep emergency contacts saved and easily accessible on your device.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-4">
                  <MessageCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Emergency Communication</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the emergency chat feature to get immediate assistance from trained professionals.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Know Your Area</h4>
                  <p className="text-sm text-muted-foreground">
                    Familiarize yourself with nearby hospitals and emergency services in your neighborhood.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
