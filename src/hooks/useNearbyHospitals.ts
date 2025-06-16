
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Hospital {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  phone: string;
  emergency: string;
  type: string;
}

export const useNearbyHospitals = (latitude?: number, longitude?: number) => {
  return useQuery({
    queryKey: ['nearby-hospitals', latitude, longitude],
    queryFn: async () => {
      if (!latitude || !longitude) {
        throw new Error('Location coordinates are required');
      }

      const { data, error } = await supabase.functions.invoke('nearby-hospitals', {
        body: { latitude, longitude }
      });

      if (error) throw error;
      return data.hospitals as Hospital[];
    },
    enabled: !!latitude && !!longitude,
  });
};
