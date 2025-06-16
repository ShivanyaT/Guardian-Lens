
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Ambulance, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: number;
  phone: string;
  specialties: string[];
  estimatedArrival: number; // minutes
}

interface HospitalMatcherProps {
  symptoms: string[];
  userLocation: string;
  onAmbulanceDispatch: (hospital: Hospital) => void;
}

const hospitalSpecialties: Record<string, string[]> = {
  chest_pain: ['cardiology', 'emergency'],
  difficulty_breathing: ['pulmonology', 'emergency'],
  severe_bleeding: ['trauma', 'emergency'],
  unconscious: ['neurology', 'emergency'],
  stroke_symptoms: ['neurology', 'stroke_center'],
  burns: ['burn_unit', 'trauma'],
  fractures: ['orthopedics', 'trauma'],
  allergic_reaction: ['emergency', 'allergy'],
  poisoning: ['toxicology', 'emergency'],
};

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City Emergency Hospital',
    address: '123 Emergency Ave',
    distance: 2.1,
    phone: '+1-555-0101',
    specialties: ['emergency', 'trauma', 'cardiology'],
    estimatedArrival: 8,
  },
  {
    id: '2',
    name: 'Regional Medical Center',
    address: '456 Medical Blvd',
    distance: 3.5,
    phone: '+1-555-0102',
    specialties: ['neurology', 'stroke_center', 'emergency'],
    estimatedArrival: 12,
  },
  {
    id: '3',
    name: 'Specialized Trauma Center',
    address: '789 Trauma St',
    distance: 4.2,
    phone: '+1-555-0103',
    specialties: ['trauma', 'burn_unit', 'orthopedics'],
    estimatedArrival: 15,
  },
];

const HospitalMatcher: React.FC<HospitalMatcherProps> = ({ symptoms, userLocation, onAmbulanceDispatch }) => {
  const { toast } = useToast();

  const getMatchScore = (hospital: Hospital, symptoms: string[]): number => {
    let score = 0;
    symptoms.forEach(symptom => {
      const requiredSpecialties = hospitalSpecialties[symptom] || [];
      const matches = requiredSpecialties.filter(specialty => 
        hospital.specialties.includes(specialty)
      ).length;
      score += matches;
    });
    return score;
  };

  const rankedHospitals = mockHospitals
    .map(hospital => ({
      ...hospital,
      matchScore: getMatchScore(hospital, symptoms),
    }))
    .sort((a, b) => {
      if (a.matchScore !== b.matchScore) return b.matchScore - a.matchScore;
      return a.distance - b.distance;
    });

  const handleDispatchAmbulance = (hospital: Hospital) => {
    toast({
      title: 'Ambulance Dispatched',
      description: `Emergency services dispatched from ${hospital.name}. ETA: ${hospital.estimatedArrival} minutes.`,
    });
    onAmbulanceDispatch(hospital);
  };

  if (symptoms.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Select symptoms to see recommended hospitals</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Hospitals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rankedHospitals.slice(0, 3).map((hospital) => (
            <div key={hospital.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{hospital.name}</h4>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hospital.address} • {hospital.distance} km away
                  </p>
                </div>
                {hospital.matchScore > 0 && (
                  <Badge variant="secondary">
                    {hospital.matchScore} match{hospital.matchScore !== 1 ? 'es' : ''}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {hospital.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="text-xs">
                    {specialty.replace(/_/g, ' ')}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                Estimated ambulance arrival: {hospital.estimatedArrival} minutes
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleDispatchAmbulance(hospital)}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  <Ambulance className="h-4 w-4 mr-2" />
                  Dispatch Ambulance
                </Button>
                <Button
                  onClick={() => window.open(`tel:${hospital.phone}`, '_self')}
                  variant="outline"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalMatcher;
