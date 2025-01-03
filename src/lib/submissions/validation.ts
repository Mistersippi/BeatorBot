import { SubmissionFormData, SubmissionError } from './types';

export function validateSubmissionForm(data: SubmissionFormData): SubmissionError[] {
  const errors: SubmissionError[] = [];

  // Required fields
  if (!data.trackTitle.trim()) {
    errors.push({ field: 'trackTitle', message: 'Track title is required' });
  }

  if (!data.artistName.trim()) {
    errors.push({ field: 'artistName', message: 'Artist name is required' });
  }

  if (!data.genre.trim()) {
    errors.push({ field: 'genre', message: 'Genre is required' });
  }

  // File validation
  if (!data.audioFile) {
    errors.push({ field: 'audioFile', message: 'Audio file is required' });
  } else {
    const isMP3 = data.audioFile.type === 'audio/mp3' || 
                  data.audioFile.name.toLowerCase().endsWith('.mp3');
    if (!isMP3) {
      errors.push({ field: 'audioFile', message: 'Audio file must be in MP3 format' });
    }
    if (data.audioFile.size > 20 * 1024 * 1024) { // 20MB
      errors.push({ field: 'audioFile', message: 'Audio file must be less than 20MB' });
    }
  }

  if (data.imageFile) {
    const isJPG = data.imageFile.type === 'image/jpeg' || 
                  data.imageFile.name.toLowerCase().endsWith('.jpg') ||
                  data.imageFile.name.toLowerCase().endsWith('.jpeg');
    if (!isJPG) {
      errors.push({ field: 'imageFile', message: 'Image must be in JPG/JPEG format' });
    }
    if (data.imageFile.size > 5 * 1024 * 1024) { // 5MB
      errors.push({ field: 'imageFile', message: 'Image must be less than 5MB' });
    }
  }

  // URL validation
  if (data.spotifyUrl && !isValidUrl(data.spotifyUrl)) {
    errors.push({ field: 'spotifyUrl', message: 'Invalid Spotify URL' });
  }

  if (data.appleMusicUrl && !isValidUrl(data.appleMusicUrl)) {
    errors.push({ field: 'appleMusicUrl', message: 'Invalid Apple Music URL' });
  }

  // Email validation
  if (data.contactEmail && !isValidEmail(data.contactEmail)) {
    errors.push({ field: 'contactEmail', message: 'Invalid email address' });
  }

  // Rights confirmation
  if (!data.hasRights) {
    errors.push({ field: 'hasRights', message: 'You must confirm you have the rights to submit this track' });
  }

  return errors;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}