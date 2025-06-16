
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SymptomSelectorProps {
  selectedSymptoms: string[];
  onSymptomsChange: (symptoms: string[]) => void;
}

const symptoms = [
  { id: 'chest_pain', label: 'Chest Pain', category: 'cardiac' },
  { id: 'difficulty_breathing', label: 'Difficulty Breathing', category: 'respiratory' },
  { id: 'severe_bleeding', label: 'Severe Bleeding', category: 'trauma' },
  { id: 'unconscious', label: 'Unconscious/Unresponsive', category: 'neurological' },
  { id: 'stroke_symptoms', label: 'Stroke Symptoms', category: 'neurological' },
  { id: 'severe_pain', label: 'Severe Pain', category: 'general' },
  { id: 'burns', label: 'Burns', category: 'trauma' },
  { id: 'fractures', label: 'Broken Bones/Fractures', category: 'orthopedic' },
  { id: 'allergic_reaction', label: 'Allergic Reaction', category: 'allergic' },
  { id: 'poisoning', label: 'Poisoning/Overdose', category: 'toxicological' },
];

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ selectedSymptoms, onSymptomsChange }) => {
  const handleSymptomToggle = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      onSymptomsChange(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      onSymptomsChange([...selectedSymptoms, symptomId]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Symptoms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {symptoms.map((symptom) => (
            <div key={symptom.id} className="flex items-center space-x-2">
              <Checkbox
                id={symptom.id}
                checked={selectedSymptoms.includes(symptom.id)}
                onCheckedChange={() => handleSymptomToggle(symptom.id)}
              />
              <Label
                htmlFor={symptom.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {symptom.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SymptomSelector;
