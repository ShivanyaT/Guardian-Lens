
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, MapPin, Clock, Trash2 } from 'lucide-react';
import { useIncidents, useDeleteIncident } from '@/hooks/useIncidents';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const RecentIncidents: React.FC = () => {
  const { data: incidents, isLoading } = useIncidents();
  const deleteIncident = useDeleteIncident();
  const { toast } = useToast();

  const handleDeleteIncident = async (incidentId: string) => {
    console.log('Delete button clicked for incident:', incidentId);
    try {
      await deleteIncident.mutateAsync(incidentId);
      toast({
        title: 'Incident Deleted',
        description: 'The incident report has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting incident:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete incident. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-guardian-emergency text-white';
      case 'responding':
        return 'bg-guardian-warning text-white';
      case 'monitoring':
        return 'bg-guardian-info text-white';
      case 'resolved':
        return 'bg-guardian-success text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'fire':
        return AlertTriangle;
      case 'medical':
        return Shield;
      case 'accident':
        return AlertTriangle;
      case 'crime':
        return Shield;
      default:
        return MapPin;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'responding':
        return 'Responding';
      case 'monitoring':
        return 'Monitoring';
      case 'resolved':
        return 'Resolved';
      default:
        return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!incidents || incidents.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Recent Incidents</h3>
        <p className="text-muted-foreground">
          No incidents have been reported recently in your area.
        </p>
      </div>
    );
  }

  const recentIncidents = incidents.slice(0, 4);

  return (
    <div className="space-y-4">
      {recentIncidents.map((incident) => {
        const Icon = getIncidentIcon(incident.incident_type);
        
        return (
          <div
            key={incident.id}
            className={`incident-card incident-${incident.status} animate-fade-in`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 text-guardian-${incident.status === 'active' ? 'emergency' : incident.status === 'responding' ? 'warning' : incident.status === 'monitoring' ? 'info' : 'success'}`} />
                <div>
                  <h3 className="font-semibold">{incident.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {incident.location_address || 'Location not specified'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex flex-col items-end">
                  <Badge className={getBadgeVariant(incident.status)}>
                    {getStatusText(incident.status)}
                  </Badge>
                  <span className="text-xs text-muted-foreground mt-1">
                    {format(new Date(incident.created_at!), 'MMM dd, h:mm a')}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteIncident(incident.id)}
                  disabled={deleteIncident.isPending}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentIncidents;
