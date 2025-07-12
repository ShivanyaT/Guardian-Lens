
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Clock, AlertTriangle } from 'lucide-react';
import { useCreateIncident } from '@/hooks/useIncidents';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import SymptomSelector from '@/components/incident/SymptomSelector';
import HospitalMatcher from '@/components/incident/HospitalMatcher';
import LocationDetector from '@/components/incident/LocationDetector';
import PatientDetailsForm from '@/components/incident/PatientDetailsForm';

const IncidentReporting: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: profile } = useProfile();
  const createIncident = useCreateIncident();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    incident_type: '',
    location_address: '',
    location_lat: null as number | null,
    location_lng: null as number | null,
  });

  const [patientDetails, setPatientDetails] = useState({
    patient_name: '',
    patient_age: '',
    patient_gender: '',
    patient_phone: '',
    patient_emergency_contact: '',
    patient_medical_conditions: '',
    patient_allergies: '',
    auto_filled_from_profile: false,
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [dispatchedHospital, setDispatchedHospital] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('User:', user);
    console.log('Form data:', formData);
    console.log('Patient details:', patientDetails);

    // Basic validation - only require title
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide an incident title.',
        variant: 'destructive',
      });
      return;
    }

    try {
      console.log('Preparing incident data...');
      
      const incidentData = {
        title: formData.title,
        description: formData.description || 'Emergency incident reported',
        incident_type: (formData.incident_type || 'medical') as any,
        location_address: formData.location_address || 'Location not specified',
        location_lat: formData.location_lat,
        location_lng: formData.location_lng,
        user_id: user?.id || null, // Make user_id optional - null if not logged in
        // Patient details
        patient_name: patientDetails.patient_name || null,
        patient_age: patientDetails.patient_age ? parseInt(patientDetails.patient_age) : null,
        patient_gender: patientDetails.patient_gender || null,
        patient_phone: patientDetails.patient_phone || null,
        patient_emergency_contact: patientDetails.patient_emergency_contact || null,
        patient_medical_conditions: patientDetails.patient_medical_conditions || null,
        patient_allergies: patientDetails.patient_allergies || null,
        auto_filled_from_profile: patientDetails.auto_filled_from_profile,
      };

      console.log('Final incident data:', incidentData);

      await createIncident.mutateAsync(incidentData);

      toast({
        title: 'Emergency Reported',
        description: dispatchedHospital 
          ? `Emergency reported successfully! Ambulance dispatched from ${dispatchedHospital.name}. Call 112 for immediate assistance.`
          : 'Your emergency report has been submitted successfully. Call 112 for immediate assistance.',
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        incident_type: '',
        location_address: '',
        location_lat: null,
        location_lng: null,
      });
      setPatientDetails({
        patient_name: '',
        patient_age: '',
        patient_gender: '',
        patient_phone: '',
        patient_emergency_contact: '',
        patient_medical_conditions: '',
        patient_allergies: '',
        auto_filled_from_profile: false,
      });
      setSelectedSymptoms([]);
      setDispatchedHospital(null);

      console.log('Form reset successfully');
    } catch (error) {
      console.error('Error submitting incident:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit emergency report. Please try again or call 112 immediately.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Updating ${field} to:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (address: string, lat?: number, lng?: number) => {
    console.log('Location changed:', { address, lat, lng });
    setFormData(prev => ({
      ...prev,
      location_address: address,
      location_lat: lat || null,
      location_lng: lng || null,
    }));
  };

  const handleAmbulanceDispatch = (hospital: any) => {
    console.log('Ambulance dispatched from:', hospital);
    setDispatchedHospital(hospital);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-red-600">Report an Emergency</h1>
        <p className="text-muted-foreground">
          Anyone can report an emergency. Provide incident details to get immediate medical assistance. Call 112 for life-threatening emergencies.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Details</CardTitle>
              <CardDescription>
                Provide as much detail as possible about the emergency situation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Emergency Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Brief description of the emergency"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Emergency Type</Label>
                  <Select value={formData.incident_type} onValueChange={(value) => handleInputChange('incident_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select emergency type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Emergency</SelectItem>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="accident">Accident</SelectItem>
                      <SelectItem value="crime">Crime</SelectItem>
                      <SelectItem value="weather">Weather Related</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <LocationDetector
                  onLocationChange={handleLocationChange}
                  initialAddress={formData.location_address}
                />

                <div>
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Provide additional details about the emergency..."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={createIncident.isPending}
                >
                  {createIncident.isPending ? 'Submitting...' : 
                    dispatchedHospital ? 'Submit Emergency Report with Ambulance' : 'Report Emergency'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <PatientDetailsForm
            patientDetails={patientDetails}
            onPatientDetailsChange={setPatientDetails}
            userProfile={profile}
          />

          <SymptomSelector 
            selectedSymptoms={selectedSymptoms}
            onSymptomsChange={setSelectedSymptoms}
          />
        </div>

        <div className="space-y-6">
          <HospitalMatcher 
            symptoms={selectedSymptoms}
            userLocation={formData.location_address}
            onAmbulanceDispatch={handleAmbulanceDispatch}
          />

          {dispatchedHospital && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Ambulance Dispatched</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">
                  Emergency services from <strong>{dispatchedHospital.name}</strong> have been notified.
                  Estimated arrival: <strong>{dispatchedHospital.estimatedArrival} minutes</strong>
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-red-600" />
                Emergency Contacts - India
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-600">National Emergency Number</h3>
                <p className="text-3xl font-bold">112</p>
                <p className="text-sm text-muted-foreground">For all emergencies - Police, Fire, Medical</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-600">Police</h4>
                  <p className="text-lg font-semibold">100</p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-600">Fire</h4>
                  <p className="text-lg font-semibold">101</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-600">Ambulance</h4>
                  <p className="text-lg font-semibold">102</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-600">Women Helpline</h4>
                  <p className="text-lg font-semibold">1091</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                Emergency Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <Clock className="h-4 w-4 mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Report Immediately</p>
                  <p className="text-sm text-muted-foreground">Call 112 first for life-threatening emergencies, then submit this report.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-4 w-4 mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Stay On The Line</p>
                  <p className="text-sm text-muted-foreground">When calling 112, stay calm and provide clear information about location and emergency type.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Patient Safety First</p>
                  <p className="text-sm text-muted-foreground">Ensure patient safety and provide accurate medical information to first responders.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentReporting;
