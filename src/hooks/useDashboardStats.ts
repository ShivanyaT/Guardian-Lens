
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Get active incidents count
      const { data: activeIncidents, error: incidentsError } = await supabase
        .from('incidents')
        .select('id')
        .eq('status', 'active');

      if (incidentsError) throw incidentsError;

      return {
        activeIncidents: activeIncidents.length,
      };
    },
  });
};
