
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';
import { useNearbyHospitals } from '@/hooks/useNearbyHospitals';
import HospitalsList from './map/HospitalsList';

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className }) => {
  const [locationInput, setLocationInput] = useState('');
  const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { data: hospitals, isLoading } = useNearbyHospitals(searchLocation?.lat, searchLocation?.lng);

  const handleLocationSearch = async () => {
    if (!locationInput.trim()) return;

    try {
      console.log('Searching for location:', locationInput);
      
      // Mock geocoding - in reality you'd call an API
      const mockCoordinates = {
        lat: 37.7749 + (Math.random() - 0.5) * 0.1, // Random coordinates around SF
        lng: -122.4194 + (Math.random() - 0.5) * 0.1
      };
      
      console.log('Generated coordinates:', mockCoordinates);
      setSearchLocation(mockCoordinates);
    } catch (error) {
      console.error('Error geocoding location:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLocationSearch();
    }
  };

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Location Search */}
        <Card>
          <CardHeader>
            <CardTitle>Find Nearby Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your address"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleLocationSearch} disabled={!locationInput.trim()}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hospital Results */}
        {searchLocation && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Search Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Searching near:</p>
                  <p className="font-medium">{locationInput}</p>
                  {isLoading && (
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                      Searching for nearby hospitals...
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <HospitalsList hospitals={hospitals} isLoading={isLoading} />
            </div>
          </div>
        )}

        {/* Instructions when no search has been made */}
        {!searchLocation && (
          <Card>
            <CardContent className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Enter Your Address</h3>
              <p className="text-muted-foreground">
                Type your complete address above to find nearby hospitals with contact information.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Map;
