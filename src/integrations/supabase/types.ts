export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {

  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          location_address: string | null
          location_lat: number | null
          location_lng: number | null
          message: string
          priority: Database["public"]["Enums"]["alert_priority"]
          title: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          message: string
          priority?: Database["public"]["Enums"]["alert_priority"]
          title: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          message?: string
          priority?: Database["public"]["Enums"]["alert_priority"]
          title?: string
        }
        Relationships: []
      }
      incidents: {
        Row: {
          auto_filled_from_profile: boolean | null
          created_at: string | null
          description: string | null
          id: string
          incident_type: Database["public"]["Enums"]["incident_type"]
          location_address: string | null
          location_lat: number | null
          location_lng: number | null
          patient_age: number | null
          patient_allergies: string | null
          patient_emergency_contact: string | null
          patient_gender: string | null
          patient_medical_conditions: string | null
          patient_name: string | null
          patient_phone: string | null
          status: Database["public"]["Enums"]["incident_status"]
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_filled_from_profile?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          incident_type: Database["public"]["Enums"]["incident_type"]
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          patient_age?: number | null
          patient_allergies?: string | null
          patient_emergency_contact?: string | null
          patient_gender?: string | null
          patient_medical_conditions?: string | null
          patient_name?: string | null
          patient_phone?: string | null
          status?: Database["public"]["Enums"]["incident_status"]
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_filled_from_profile?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          incident_type?: Database["public"]["Enums"]["incident_type"]
          location_address?: string | null
          location_lat?: number | null
          location_lng?: number | null
          patient_age?: number | null
          patient_allergies?: string | null
          patient_emergency_contact?: string | null
          patient_gender?: string | null
          patient_medical_conditions?: string | null
          patient_name?: string | null
          patient_phone?: string | null
          status?: Database["public"]["Enums"]["incident_status"]
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          allergies: string | null
          created_at: string | null
          email: string | null
          emergency_contact: string | null
          full_name: string | null
          gender: string | null
          id: string
          medical_problems: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          allergies?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          medical_problems?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          allergies?: string | null
          created_at?: string | null
          email?: string | null
          emergency_contact?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          medical_problems?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alert_priority: "low" | "medium" | "high" | "critical"
      gender_type: "male" | "female" | "other" | "prefer_not_to_say"
      incident_status: "active" | "responding" | "monitoring" | "resolved"
      incident_type:
        | "fire"
        | "accident"
        | "medical"
        | "crime"
        | "weather"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_priority: ["low", "medium", "high", "critical"],
      gender_type: ["male", "female", "other", "prefer_not_to_say"],
      incident_status: ["active", "responding", "monitoring", "resolved"],
      incident_type: [
        "fire",
        "accident",
        "medical",
        "crime",
        "weather",
        "other",
      ],
    },
  },
} as const
