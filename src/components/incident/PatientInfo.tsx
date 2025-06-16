
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Phone, AlertTriangle, Heart } from 'lucide-react';

interface PatientInfoProps {
  profile: {
    full_name?: string;
    age?: number;
    gender?: string;
    phone?: string;
    emergency_contact?: string;
    medical_problems?: string;
    allergies?: string;
  } | null;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ profile }) => {
  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Complete your profile to provide medical information to emergency services.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Name</p>
            <p className="text-sm text-muted-foreground">{profile.full_name || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Age</p>
            <p className="text-sm text-muted-foreground">{profile.age || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Gender</p>
            <p className="text-sm text-muted-foreground">{profile.gender || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Phone</p>
            <p className="text-sm text-muted-foreground">{profile.phone || 'Not provided'}</p>
          </div>
        </div>

        {profile.emergency_contact && (
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <Phone className="h-4 w-4 mr-2 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Emergency Contact</p>
              <p className="text-sm text-muted-foreground">{profile.emergency_contact}</p>
            </div>
          </div>
        )}

        {profile.medical_problems && (
          <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
            <Heart className="h-4 w-4 mr-2 mt-0.5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium">Medical Conditions</p>
              <p className="text-sm text-muted-foreground">{profile.medical_problems}</p>
            </div>
          </div>
        )}

        {profile.allergies && (
          <div className="flex items-start p-3 bg-red-50 rounded-lg">
            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 text-red-600" />
            <div>
              <p className="text-sm font-medium">Allergies</p>
              <p className="text-sm text-muted-foreground">{profile.allergies}</p>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-xs text-green-700">
            ✓ This information will be shared with emergency services to provide better care
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfo;
