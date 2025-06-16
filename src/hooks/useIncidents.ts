
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

type Incident = Tables<'incidents'>;
type IncidentInsert = TablesInsert<'incidents'>;

export const useIncidents = () => {
  return useQuery({
    queryKey: ['incidents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Incident[];
    },
  });
};

export const useCreateIncident = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (incident: Omit<IncidentInsert, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('incidents')
        .insert([incident])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};

export const useDeleteIncident = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (incidentId: string) => {
      console.log('Attempting to delete incident with ID:', incidentId);
      
      const { error } = await supabase
        .from('incidents')
        .delete()
        .eq('id', incidentId);

      if (error) {
        console.error('Delete incident error:', error);
        throw new Error(`Failed to delete incident: ${error.message}`);
      }
      
      console.log('Incident deleted successfully from database');
      return incidentId;
    },
    onSuccess: (deletedId) => {
      console.log('Invalidating queries after successful delete');
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
    onError: (error) => {
      console.error('Delete incident mutation error:', error);
    },
  });
};

export const useIncidentStats = () => {
  return useQuery({
    queryKey: ['incident-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('incidents')
        .select('status')
        .eq('status', 'active');

      if (error) throw error;
      return data.length;
    },
  });
};
