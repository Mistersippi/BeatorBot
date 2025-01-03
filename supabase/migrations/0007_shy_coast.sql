-- Add delete policy for submissions
CREATE POLICY "users_delete_own_pending_submissions"
  ON submissions FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = submissions.user_id 
      AND users.auth_id = auth.uid()
    )
    AND status = 'pending'
  );