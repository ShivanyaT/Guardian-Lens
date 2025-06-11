
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude } = await req.json();
    
    console.log(`Searching for hospitals near coordinates: ${latitude}, ${longitude}`);
    
    // Create mock hospitals near the provided coordinates with realistic data
    const mockHospitals = [
      {
        id: "hospital_1",
        name: "City General Hospital",
        address: `${Math.floor(Math.random() * 9999)} Main Street, Local City`,
        latitude: latitude + (Math.random() - 0.5) * 0.01,
        longitude: longitude + (Math.random() - 0.5) * 0.01,
        distance: Math.random() * 5 + 0.5, // 0.5 to 5.5 km
        phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        emergency: "911",
        type: "General Hospital"
      },
      {
        id: "hospital_2",
        name: "Memorial Medical Center",
        address: `${Math.floor(Math.random() * 9999)} Oak Avenue, Local City`,
        latitude: latitude + (Math.random() - 0.5) * 0.015,
        longitude: longitude + (Math.random() - 0.5) * 0.015,
        distance: Math.random() * 5 + 1,
        phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        emergency: "911",
        type: "Medical Center"
      },
      {
        id: "hospital_3",
        name: "Regional Emergency Hospital",
        address: `${Math.floor(Math.random() * 9999)} Pine Street, Local City`,
        latitude: latitude + (Math.random() - 0.5) * 0.02,
        longitude: longitude + (Math.random() - 0.5) * 0.02,
        distance: Math.random() * 8 + 2,
        phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        emergency: "911",
        type: "Emergency Hospital"
      },
      {
        id: "hospital_4",
        name: "Community Health Center",
        address: `${Math.floor(Math.random() * 9999)} Elm Drive, Local City`,
        latitude: latitude + (Math.random() - 0.5) * 0.025,
        longitude: longitude + (Math.random() - 0.5) * 0.025,
        distance: Math.random() * 10 + 3,
        phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        emergency: "911",
        type: "Health Center"
      },
      {
        id: "hospital_5",
        name: "St. Mary's Hospital",
        address: `${Math.floor(Math.random() * 9999)} Cedar Lane, Local City`,
        latitude: latitude + (Math.random() - 0.5) * 0.03,
        longitude: longitude + (Math.random() - 0.5) * 0.03,
        distance: Math.random() * 12 + 4,
        phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        emergency: "911",
        type: "Hospital"
      }
    ];

    // Sort by distance
    const sortedHospitals = mockHospitals.sort((a, b) => a.distance - b.distance);

    console.log(`Found ${sortedHospitals.length} hospitals near the location`);

    return new Response(JSON.stringify({ hospitals: sortedHospitals }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in nearby-hospitals function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch nearby hospitals',
      hospitals: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
