
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LocationDetectorProps {
  onLocationChange: (address: string, lat?: number, lng?: number) => void;
  initialAddress?: string;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ onLocationChange, initialAddress = '' }) => {
  const [address, setAddress] = useState(initialAddress);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState('');

  const detectLocation = async () => {
    setDetecting(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY&pretty=1&no_annotations=1`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const detectedAddress = data.results[0].formatted;
              setAddress(detectedAddress);
              onLocationChange(detectedAddress, latitude, longitude);
            } else {
              const fallbackAddress = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
              setAddress(fallbackAddress);
              onLocationChange(fallbackAddress, latitude, longitude);
            }
          } else {
            const fallbackAddress = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
            setAddress(fallbackAddress);
            onLocationChange(fallbackAddress, latitude, longitude);
          }
        } catch (err) {
          const fallbackAddress = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
          setAddress(fallbackAddress);
          onLocationChange(fallbackAddress, latitude, longitude);
        }
        
        setDetecting(false);
      },
      (error) => {
        let errorMessage = 'Unable to detect location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setError(errorMessage);
        setDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleManualChange = (value: string) => {
    setAddress(value);
    onLocationChange(value);
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="location">Emergency Location *</Label>
      <div className="flex gap-2">
        <Input
          id="location"
          value={address}
          onChange={(e) => handleManualChange(e.target.value)}
          placeholder="Enter address or use auto-detect"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={detectLocation}
          disabled={detecting}
          className="shrink-0"
        >
          {detecting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          {detecting ? 'Detecting...' : 'Detect'}
        </Button>
      </div>
      
      {error && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      <p className="text-xs text-gray-500">
        Click "Detect" to automatically use your current location, or enter the address manually.
      </p>
    </div>
  );
};

export default LocationDetector;
