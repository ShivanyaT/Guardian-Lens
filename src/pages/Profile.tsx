
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Edit3, Save, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';

const Profile: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: '',
    phone: '',
    emergency_contact: '',
    medical_problems: '',
    allergies: '',
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        age: profile.age?.toString() || '',
        gender: profile.gender || '',
        phone: profile.phone || '',
        emergency_contact: profile.emergency_contact || '',
        medical_problems: profile.medical_problems || '',
        allergies: profile.allergies || '',
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        full_name: formData.full_name || null,
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender || null,
        phone: formData.phone || null,
        emergency_contact: formData.emergency_contact || null,
        medical_problems: formData.medical_problems || null,
        allergies: formData.allergies || null,
      });

      setIsEditing(false);
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved successfully.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        age: profile.age?.toString() || '',
        gender: profile.gender || '',
        phone: profile.phone || '',
        emergency_contact: profile.emergency_contact || '',
        medical_problems: profile.medical_problems || '',
        allergies: profile.allergies || '',
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and emergency details.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                disabled={updateProfileMutation.isPending}
                className="flex items-center"
              >
                {updateProfileMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={updateProfileMutation.isPending}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  disabled={!isEditing}
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="emergency_contact">Emergency Contact</Label>
                <Input
                  id="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="medical_problems">Medical Problems</Label>
              <Textarea
                id="medical_problems"
                value={formData.medical_problems}
                onChange={(e) => handleInputChange('medical_problems', e.target.value)}
                disabled={!isEditing}
                placeholder="List any medical conditions, medications, or health concerns..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                disabled={!isEditing}
                placeholder="List any known allergies (food, medication, environmental)..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
