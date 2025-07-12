
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
    
    const madhyaPradeshHospitals = [
      {
        id: "hospital_1",
        name: "AIIMS Bhopal",
        address: "Saket Nagar, Bhopal, Madhya Pradesh 462020",
        latitude: 23.2599,
        longitude: 77.4126,
        distance: Math.random() * 5 + 0.5,
        phone: "+91-755-267-4801",
        emergency: "108",
        type: "Government Medical College"
      },
      {
        id: "hospital_2",
        name: "Hamidia Hospital",
        address: "Sultania Road, Bhopal, Madhya Pradesh 462001",
        latitude: 23.2685,
        longitude: 77.4013,
        distance: Math.random() * 5 + 1,
        phone: "+91-755-254-0644",
        emergency: "108",
        type: "Government Hospital"
      },
      {
        id: "hospital_3",
        name: "Chirayu Medical College & Hospital",
        address: "6 km, Jharodakalan, Bhopal-Indore Highway, Bhopal, Madhya Pradesh 462030",
        latitude: 23.1815,
        longitude: 77.3910,
        distance: Math.random() * 8 + 2,
        phone: "+91-755-669-1800",
        emergency: "108",
        type: "Private Medical College"
      },
      {
        id: "hospital_4",
        name: "MY Hospital",
        address: "A B Road, Indore, Madhya Pradesh 452001",
        latitude: 22.7196,
        longitude: 75.8577,
        distance: Math.random() * 10 + 3,
        phone: "+91-731-242-5681",
        emergency: "108",
        type: "Government Hospital"
      },
      {
        id: "hospital_5",
        name: "Apollo Hospital Indore",
        address: "Sector-D, Scheme No 74-C, Vijay Nagar, Indore, Madhya Pradesh 452010",
        latitude: 22.7532,
        longitude: 75.8937,
        distance: Math.random() * 12 + 4,
        phone: "+91-731-425-1100",
        emergency: "108",
        type: "Private Hospital"
      },
      {
        id: "hospital_6",
        name: "Netaji Subhash Chandra Bose Medical College",
        address: "Hanumantal, Jabalpur, Madhya Pradesh 482003",
        latitude: 23.1815,
        longitude: 79.9864,
        distance: Math.random() * 15 + 5,
        phone: "+91-761-262-3017",
        emergency: "108",
        type: "Government Medical College"
      },
      {
        id: "hospital_7",
        name: "Gwalior Medical College",
        address: "Jaya Arogya Hospital Campus, Gwalior, Madhya Pradesh 474009",
        latitude: 26.2183,
        longitude: 78.1828,
        distance: Math.random() * 18 + 6,
        phone: "+91-751-234-0009",
        emergency: "108",
        type: "Government Medical College"
      },
      {
        id: "hospital_8",
        name: "Bansal Hospital",
        address: "B-253, Samta Colony, Bhopal, Madhya Pradesh 462016",
        latitude: 23.2156,
        longitude: 77.4615,
        distance: Math.random() * 6 + 1.5,
        phone: "+91-755-266-0002",
        emergency: "108",
        type: "Private Hospital"
      },
      {
        id: "hospital_9",
        name: "Sagar Medical College",
        address: "Bundelkhand University Campus, Sagar, Madhya Pradesh 470001",
        latitude: 23.8388,
        longitude: 78.7378,
        distance: Math.random() * 20 + 8,
        phone: "+91-758-223-2002",
        emergency: "108",
        type: "Government Medical College"
      },
      {
        id: "hospital_10",
        name: "Sterling Hospital",
        address: "Behind Treasure Island Mall, A.B. Road, Indore, Madhya Pradesh 452010",
        latitude: 22.7447,
        longitude: 75.8918,
        distance: Math.random() * 11 + 3.5,
        phone: "+91-731-425-8800",
        emergency: "108",
        type: "Private Hospital"
      }
    ];

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Radius of the Earth in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    const hospitalsWithDistance = madhyaPradeshHospitals.map(hospital => ({
      ...hospital,
      distance: latitude && longitude 
        ? calculateDistance(latitude, longitude, hospital.latitude, hospital.longitude)
        : hospital.distance
    }));

    const sortedHospitals = hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    console.log(`Found ${sortedHospitals.length} hospitals in Madhya Pradesh`);

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
