/*
  # Initial Database Schema

  1. Core Tables
    - users: Extended user profile data
    - user_settings: User preferences and settings
    - user_sessions: Session tracking and analytics
    - user_consent: Privacy and consent management

  2. Analytics & Metrics
    - analytics_events: User interaction tracking
    - performance_metrics: System performance data
    - error_logs: Application error tracking

  3. Feature Usage
    - challenges: Music challenges data
    - submissions: User music submissions
    - guesses: User challenge responses
    - feedback: User feedback on submissions

  4. Business Intelligence
    - conversion_events: Funnel tracking
    - ab_tests: A/B testing results
    - feature_usage: Feature adoption metrics

  Security:
    - RLS policies for data access control
    - Audit logging for sensitive operations
    - Data retention policies
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Core User Data
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id uuid UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  email text UNIQUE NOT NULL,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login_at timestamptz,
  account_status text DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'deleted')),
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE TABLE user_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  theme text DEFAULT 'light',
  email_notifications jsonb DEFAULT '{"marketing": false, "challenges": true, "submissions": true}'::jsonb,
  privacy_settings jsonb DEFAULT '{"profile": "public", "submissions": "public"}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE user_consent (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  consent_type text NOT NULL,
  consented_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text,
  metadata jsonb DEFAULT '{}'::jsonb,
  UNIQUE(user_id, consent_type)
);

-- Session & Analytics
CREATE TABLE user_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  duration interval GENERATED ALWAYS AS (ended_at - started_at) STORED,
  device_info jsonb DEFAULT '{}'::jsonb,
  location_info jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE TABLE analytics_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  session_id uuid REFERENCES user_sessions ON DELETE SET NULL,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  occurred_at timestamptz DEFAULT now(),
  page_url text,
  component_id text
);

CREATE TABLE performance_metrics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_type text NOT NULL,
  value numeric NOT NULL,
  recorded_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE TABLE error_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE SET NULL,
  error_type text NOT NULL,
  error_message text NOT NULL,
  stack_trace text,
  context jsonb DEFAULT '{}'::jsonb,
  occurred_at timestamptz DEFAULT now(),
  severity text DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical'))
);

-- Feature Usage
CREATE TABLE challenges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  genre text NOT NULL,
  difficulty text DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  status text DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  created_at timestamptz DEFAULT now(),
  starts_at timestamptz,
  ends_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE TABLE submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  title text NOT NULL,
  artist_name text NOT NULL,
  genre text NOT NULL,
  audio_url text NOT NULL,
  image_url text,
  is_ai_generated boolean NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE TABLE guesses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  submission_id uuid REFERENCES submissions ON DELETE CASCADE,
  challenge_id uuid REFERENCES challenges ON DELETE CASCADE,
  guessed_ai boolean NOT NULL,
  is_correct boolean,
  created_at timestamptz DEFAULT now(),
  response_time interval,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Function to update is_correct on guesses
CREATE OR REPLACE FUNCTION update_guess_correctness()
RETURNS TRIGGER AS $$
BEGIN
  NEW.is_correct := NEW.guessed_ai = (
    SELECT is_ai_generated 
    FROM submissions 
    WHERE id = NEW.submission_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update is_correct
CREATE TRIGGER set_guess_correctness
  BEFORE INSERT OR UPDATE OF guessed_ai, submission_id
  ON guesses
  FOR EACH ROW
  EXECUTE FUNCTION update_guess_correctness();

CREATE TABLE feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  submission_id uuid REFERENCES submissions ON DELETE CASCADE,
  rating integer CHECK (rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Business Intelligence
CREATE TABLE conversion_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  event_type text NOT NULL,
  source text,
  occurred_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE TABLE ab_tests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_name text NOT NULL,
  variant text NOT NULL,
  user_id uuid REFERENCES users ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  result jsonb DEFAULT '{}'::jsonb,
  UNIQUE(test_name, user_id)
);

CREATE TABLE feature_usage (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  feature_name text NOT NULL,
  used_at timestamptz DEFAULT now(),
  usage_count integer DEFAULT 1,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Indexes for performance
CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_analytics_events_user_session ON analytics_events(user_id, session_id);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_guesses_user_challenge ON guesses(user_id, challenge_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_feature_usage_user_feature ON feature_usage(user_id, feature_name);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_consent ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE guesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own data
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id)
  WITH CHECK (auth.uid() = auth_id);

-- Allow authenticated users to manage their profile
GRANT SELECT, INSERT, UPDATE ON users TO authenticated;

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = auth_id);

-- Public profiles are readable by everyone
CREATE POLICY "Public profiles are readable" ON users
  FOR SELECT USING (
    (SELECT privacy_settings->>'profile' FROM user_settings WHERE user_id = users.id) = 'public'
  );

-- Submissions policies
CREATE POLICY "Users can read public submissions" ON submissions
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can read own submissions" ON submissions
  FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can create submissions" ON submissions
  FOR INSERT WITH CHECK (
    auth.uid() = (SELECT auth_id FROM users WHERE id = submissions.user_id)
  );

-- Guesses policies
CREATE POLICY "Users can create guesses" ON guesses
  FOR INSERT WITH CHECK (
    auth.uid() = (SELECT auth_id FROM users WHERE id = guesses.user_id)
  );

CREATE POLICY "Users can read own guesses" ON guesses
  FOR SELECT USING (
    user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- Functions for analytics
CREATE OR REPLACE FUNCTION calculate_user_stats(user_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_guesses', COUNT(*),
    'correct_guesses', COUNT(*) FILTER (WHERE is_correct),
    'accuracy', ROUND(COUNT(*) FILTER (WHERE is_correct)::numeric / COUNT(*) * 100, 2),
    'total_submissions', (SELECT COUNT(*) FROM submissions WHERE user_id = user_uuid),
    'approved_submissions', (SELECT COUNT(*) FROM submissions WHERE user_id = user_uuid AND status = 'approved')
  )
  INTO result
  FROM guesses
  WHERE user_id = user_uuid;
  
  RETURN result;
END;
$$;

-- Triggers for data maintenance
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Data retention policy function
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete analytics events older than 2 years
  DELETE FROM analytics_events
  WHERE occurred_at < now() - interval '2 years';
  
  -- Delete error logs older than 1 year
  DELETE FROM error_logs
  WHERE occurred_at < now() - interval '1 year';
  
  -- Delete performance metrics older than 6 months
  DELETE FROM performance_metrics
  WHERE recorded_at < now() - interval '6 months';
  
  -- Archive old sessions
  UPDATE user_sessions
  SET metadata = jsonb_set(metadata, '{archived}', 'true')
  WHERE ended_at < now() - interval '3 months'
  AND (metadata->>'archived') IS NULL;
END;
$$;