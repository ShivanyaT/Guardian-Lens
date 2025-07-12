
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { record } = await req.json()
    
    console.log('Processing new user:', record.id)
    
    // Extract user metadata
    const full_name = record.raw_user_meta_data?.full_name || record.email
    const role = record.raw_user_meta_data?.role || 'user'
    
    console.log('User details:', { full_name, role })
    
    // Update the profiles table
    const { error } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: record.id,
        email: record.email,
        full_name: full_name,
        role: role,
      })

    if (error) {
      console.error('Error creating profile:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log('Profile created successfully for user:', record.id)

    return new Response(
      JSON.stringify({ message: 'Profile created successfully' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in handle-new-user:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
