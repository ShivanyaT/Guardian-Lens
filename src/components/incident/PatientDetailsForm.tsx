
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Heart, AlertTriangle } from 'lucide-react';

interface PatientDetails {
  patient_name: string;
  patient_age: string;
  patient_gender: string;
  patient_phone: string;
  patient_emergency_contact: string;
  patient_medical_conditions: string;
  patient_allergies: string;
  auto_filled_from_profile: boolean;
}

interface PatientDetailsFormProps {
  patientDetails: PatientDetails;
  onPatientDetailsChange: (details: PatientDetails) => void;
  userProfile?: {
    full_name?: string;
    age?: number;
    gender?: string;
    phone?: string;
    emergency_contact?: string;
    medical_problems?: string;
    allergies?: string;
  } | null;
}

const PatientDetailsForm: React.FC<PatientDetailsFormProps> = ({
  patientDetails,
  onPatientDetailsChange,
  userProfile
}) => {
  const handleFieldChange = (field: keyof PatientDetails, value: string | boolean) => {
    onPatientDetailsChange({
      ...patientDetails,
      [field]: value
    });
  };

  const handleAutoFillToggle = (checked: boolean) => {
    if (checked && userProfile) {
      onPatientDetailsChange({
        patient_name: userProfile.full_name || '',
        patient_age: userProfile.age?.toString() || '',
        patient_gender: userProfile.gender || '',
        patient_phone: userProfile.phone || '',
        patient_emergency_contact: userProfile.emergency_contact || '',
        patient_medical_conditions: userProfile.medical_problems || '',
        patient_allergies: userProfile.allergies || '',
        auto_filled_from_profile: true
      });
    } else {
      onPatientDetailsChange({
        patient_name: '',
        patient_age: '',
        patient_gender: '',
        patient_phone: '',
        patient_emergency_contact: '',
        patient_medical_conditions: '',
        patient_allergies: '',
        auto_filled_from_profile: false
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Patient Information
        </CardTitle>
        {userProfile && (
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="autofill"
              checked={patientDetails.auto_filled_from_profile}
              onCheckedChange={handleAutoFillToggle}
            />
            <Label htmlFor="autofill" className="text-sm">
              Use my profile information
            </Label>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="patient_name">Patient Name *</Label>
            <Input
              id="patient_name"
              value={patientDetails.patient_name}
              onChange={(e) => handleFieldChange('patient_name', e.target.value)}
              placeholder="Full name of the patient"
              required
            />
          </div>
          <div>
            <Label htmlFor="patient_age">Age *</Label>
            <Input
              id="patient_age"
              type="number"
              value={patientDetails.patient_age}
              onChange={(e) => handleFieldChange('patient_age', e.target.value)}
              placeholder="Patient's age"
              required
            />
          </div>
          <div>
            <Label htmlFor="patient_gender">Gender</Label>
            <Select
              value={patientDetails.patient_gender}
              onValueChange={(value) => handleFieldChange('patient_gender', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="patient_phone">Patient Phone</Label>
            <Input
              id="patient_phone"
              type="tel"
              value={patientDetails.patient_phone}
              onChange={(e) => handleFieldChange('patient_phone', e.target.value)}
              placeholder="+91-XXXXXXXXXX"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="patient_emergency_contact">Emergency Contact</Label>
            <Input
              id="patient_emergency_contact"
              value={patientDetails.patient_emergency_contact}
              onChange={(e) => handleFieldChange('patient_emergency_contact', e.target.value)}
              placeholder="Name and phone number of emergency contact"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="patient_medical_conditions" className="flex items-center">
              <Heart className="h-4 w-4 mr-1 text-red-500" />
              Medical Conditions
            </Label>
            <Textarea
              id="patient_medical_conditions"
              value={patientDetails.patient_medical_conditions}
              onChange={(e) => handleFieldChange('patient_medical_conditions', e.target.value)}
              placeholder="List any medical conditions, chronic illnesses, medications..."
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="patient_allergies" className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
              Allergies
            </Label>
            <Textarea
              id="patient_allergies"
              value={patientDetails.patient_allergies}
              onChange={(e) => handleFieldChange('patient_allergies', e.target.value)}
              placeholder="List any known allergies (medications, food, environmental)..."
              rows={2}
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            ℹ️ This information will be shared with emergency responders to provide appropriate medical care.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientDetailsForm;
