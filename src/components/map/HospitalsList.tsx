
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, AlertTriangle, Navigation } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
  phone: string;
  emergency: string;
  type: string;
}

interface HospitalsListProps {
  hospitals?: Hospital[];
  isLoading: boolean;
}

const HospitalsList: React.FC<HospitalsListProps> = ({ hospitals, isLoading }) => {
  const handleCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleDirections = (hospital: Hospital) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nearby Hospitals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Finding nearby hospitals...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hospitals || hospitals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nearby Hospitals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No hospitals found in this area.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Hospitals ({hospitals.length} found)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="border rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-lg">{hospital.name}</h4>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {hospital.address}
                </p>
                {hospital.distance && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Distance: {hospital.distance.toFixed(1)} km
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="font-medium">Phone:</span>
                  <span className="ml-1">{hospital.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                  <span className="font-medium">Emergency:</span>
                  <span className="ml-1">{hospital.emergency}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleCall(hospital.phone)}
                  size="sm"
                  variant="default"
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call Hospital
                </Button>
                <Button
                  onClick={() => handleCall(hospital.emergency)}
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Emergency
                </Button>
                <Button
                  onClick={() => handleDirections(hospital)}
                  size="sm"
                  variant="outline"
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalsList;
