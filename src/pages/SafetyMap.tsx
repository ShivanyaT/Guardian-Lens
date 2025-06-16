
import React from 'react';
import Map from '@/components/Map';

const SafetyMap: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Safety Map</h1>
        <p className="text-muted-foreground">
          Interactive map showing your location and nearby hospitals with contact information.
        </p>
      </div>

      <Map />
    </div>
  );
};

export default SafetyMap;
