import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, AlertTriangle, Phone, Clock } from 'lucide-react';
import { useCreateIncident } from '@/hooks/useIncidents';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import SymptomSelector from '@/components/incident/SymptomSelector';
import HospitalMatcher from '@/components/incident/HospitalMatcher';
import PatientInfo from '@/components/incident/PatientInfo';

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
  });
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [dispatchedHospital, setDispatchedHospital] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to report an incident.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.title || !formData.incident_type) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const incidentData = {
        ...formData,
        user_id: user.id,
        incident_type: formData.incident_type as any,
        description: `${formData.description}\n\nSymptoms: ${selectedSymptoms.join(', ')}\n\nPatient Info: ${profile?.full_name || 'Unknown'}, Age: ${profile?.age || 'Unknown'}\nMedical Conditions: ${profile?.medical_problems || 'None reported'}\nAllergies: ${profile?.allergies || 'None reported'}${dispatchedHospital ? `\n\nAmbulance dispatched from: ${dispatchedHospital.name}` : ''}`,
      };

      await createIncident.mutateAsync(incidentData);

      toast({
        title: 'Incident Reported',
        description: dispatchedHospital 
          ? `Incident reported and ambulance dispatched from ${dispatchedHospital.name}.`
          : 'Your incident report has been submitted successfully.',
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        incident_type: '',
        location_address: '',
      });
      setSelectedSymptoms([]);
      setDispatchedHospital(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit incident report. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmbulanceDispatch = (hospital: any) => {
    setDispatchedHospital(hospital);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report an Emergency</h1>
        <p className="text-muted-foreground">
          Provide incident details and get matched with the right medical facility.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
              <CardDescription>
                Provide as much detail as possible about the emergency.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Incident Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Brief description of the emergency"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Emergency Type *</Label>
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

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location_address}
                    onChange={(e) => handleInputChange('location_address', e.target.value)}
                    placeholder="Street address or nearby landmark"
                  />
                </div>

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
                    dispatchedHospital ? 'Submit Report with Ambulance Dispatch' : 'Report Emergency'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <SymptomSelector 
            selectedSymptoms={selectedSymptoms}
            onSymptomsChange={setSelectedSymptoms}
          />
        </div>

        <div className="space-y-6">
          <PatientInfo profile={profile} />

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
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-600">Emergency Services</h3>
                <p className="text-2xl font-bold">102</p>
                <p className="text-sm text-muted-foreground">For immediate life-threatening emergencies</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-600">Non-Emergency Police</h3>
                <p className="text-lg font-semibold">100</p>
                <p className="text-sm text-muted-foreground">For non-urgent police matters</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-600">Poison Control</h3>
                <p className="text-lg font-semibold">1-800-222-1222</p>
                <p className="text-sm text-muted-foreground">24/7 poison emergency helpline</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                Reporting Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <Clock className="h-4 w-4 mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Report Immediately</p>
                  <p className="text-sm text-muted-foreground">Time-sensitive incidents should be reported as soon as safely possible.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Precise Location</p>
                  <p className="text-sm text-muted-foreground">Include specific addresses, landmarks, or cross streets when possible.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 mt-1 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">Stay Safe</p>
                  <p className="text-sm text-muted-foreground">Your safety is the priority. Don't put yourself at risk to gather information.</p>
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
