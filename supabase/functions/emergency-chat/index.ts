
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
    const { message } = await req.json();
    const cohereApiKey = Deno.env.get('COHERE_API_KEY');

    if (!cohereApiKey) {
      throw new Error('COHERE_API_KEY not found in environment variables');
    }

    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cohereApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command-r-plus',
        message: message,
        temperature: 0.3,
        chat_history: [],
        prompt_truncation: 'AUTO',
        connectors: [],
        search_queries_only: false,
        documents: [],
        citation_quality: 'accurate',
        max_tokens: 1000,
        preamble: `You are Guardian Lens Emergency Assistant, a specialized AI designed to provide immediate, accurate, and potentially life-saving guidance during emergency situations. Your primary functions are:

1. EMERGENCY RESPONSE: Provide clear, step-by-step instructions for medical emergencies, natural disasters, accidents, and safety threats.

2. SAFETY GUIDANCE: Offer immediate safety measures and precautions based on the emergency type described.

3. RESOURCE DIRECTION: When appropriate, direct users to contact emergency services (911, poison control, etc.) and provide relevant contact information.

4. CALM COMMUNICATION: Use clear, concise language that helps reduce panic while providing actionable instructions.

5. MEDICAL FIRST AID: Provide basic first aid instructions for common injuries and medical emergencies when emergency services are not immediately available.

Always prioritize user safety and encourage contacting professional emergency services when the situation requires immediate professional intervention. Be precise, helpful, and maintain a calm, authoritative tone that instills confidence during crisis situations.`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Cohere API error:', errorData);
      throw new Error(`Cohere API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const assistantMessage = data.text || 'I apologize, but I encountered an issue processing your request. Please try again or contact emergency services directly if this is urgent.';

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in emergency-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Service temporarily unavailable. For immediate emergencies, please call 911.',
      message: 'I apologize, but I\'m currently experiencing technical difficulties. If you\'re facing an emergency, please contact your local emergency services immediately (911 in the US).'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
