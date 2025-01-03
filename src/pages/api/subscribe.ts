import type { Request, Response } from 'express';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: Request,
  res: Response<Data>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const API_KEY = process.env.BEEHIIV_API_KEY;
    const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'website',
          utm_campaign: 'newsletter_subscription',
          utm_medium: 'organic'
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(400).json({ 
        success: false, 
        message: error.message || 'Failed to subscribe' 
      });
    }

    return res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed!' 
    });
  } catch (error: any) {
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Error subscribing to newsletter' 
    });
  }
}
