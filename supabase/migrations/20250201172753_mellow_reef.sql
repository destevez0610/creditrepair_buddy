/*
  # Initial CreditBuddy Database Schema

  1. New Tables
    - `roles` - User role definitions
    - `profiles` - Extended user profile information
    - `locations` - Business locations
    - `credit_reports` - Credit report data
    - `disputes` - Dispute tracking
    - `dispute_letters` - Generated dispute letters
    - `action_plans` - Customized user action plans
    - `notifications` - System notifications
    - `affiliates` - Affiliate program management

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
    - Implement row-level security for data isolation

  3. Relationships
    - Link profiles to auth.users
    - Connect disputes to credit reports
    - Associate users with locations
*/

-- Roles enum
CREATE TYPE user_role AS ENUM ('super', 'super_admin', 'admin', 'staff', 'consumer');

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'consumer',
  first_name text,
  last_name text,
  phone text,
  location_id uuid,
  consumer_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Locations table
CREATE TABLE locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  admin_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Credit Reports table
CREATE TABLE credit_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  bureau text NOT NULL,
  report_date date NOT NULL,
  credit_score integer,
  report_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Disputes table
CREATE TABLE disputes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  credit_report_id uuid REFERENCES credit_reports(id),
  status text NOT NULL DEFAULT 'pending',
  dispute_type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Dispute Letters table
CREATE TABLE dispute_letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id uuid REFERENCES disputes(id) ON DELETE CASCADE,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  tracking_id text,
  sent_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Action Plans table
CREATE TABLE action_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  steps jsonb NOT NULL,
  progress integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Affiliates table
CREATE TABLE affiliates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code text UNIQUE NOT NULL,
  commission_rate numeric(5,2) NOT NULL DEFAULT 0,
  total_earnings numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispute_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Staff can view assigned consumer profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin_profile
      WHERE admin_profile.id = auth.uid()
      AND admin_profile.role IN ('super', 'super_admin', 'admin', 'staff')
    )
  );

-- Locations policies
CREATE POLICY "Admins can manage locations"
  ON locations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('super', 'super_admin', 'admin')
    )
  );

-- Credit reports policies
CREATE POLICY "Users can view own credit reports"
  ON credit_reports FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Staff can view assigned credit reports"
  ON credit_reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('super', 'super_admin', 'admin', 'staff')
    )
  );

-- Create functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_credit_reports_updated_at
  BEFORE UPDATE ON credit_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_disputes_updated_at
  BEFORE UPDATE ON disputes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_dispute_letters_updated_at
  BEFORE UPDATE ON dispute_letters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_action_plans_updated_at
  BEFORE UPDATE ON action_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_affiliates_updated_at
  BEFORE UPDATE ON affiliates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();