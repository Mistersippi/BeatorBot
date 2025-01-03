import { supabase } from './client';
import { v4 as uuidv4 } from 'uuid';

export const AUDIO_BUCKET = 'audio-tracks';
export const IMAGE_BUCKET = 'track-artwork';
const MAX_IMAGE_SIZE = 500; // Max dimension in pixels

interface UploadResult {
  url: string;
  path: string;
}

interface StorageError extends Error {
  statusCode?: number;
  details?: string;
}

async function verifyBucketAccess(bucketName: string): Promise<void> {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('You must be logged in to upload files');
    }

    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      const storageError: StorageError = new Error(`Storage error: ${error.message}`);
      storageError.statusCode = error.status || 500;
      storageError.details = error.details || undefined;
      throw storageError;
    }

    const bucketExists = buckets?.some(b => b.name === bucketName);
    
    if (!bucketExists) {
      const configError: StorageError = new Error(`Storage bucket "${bucketName}" not found`);
      configError.details = 'Please configure storage buckets in Supabase dashboard';
      throw configError;
    }
  } catch (error) {
    console.error('Storage access verification failed:', error);
    throw error;
  }
}

export async function uploadAudioTrack(file: File): Promise<UploadResult> {
  await verifyBucketAccess(AUDIO_BUCKET);

  const fileExt = file.name.split('.').pop()?.toLowerCase();
  if (!fileExt || !['mp3', 'wav', 'ogg'].includes(fileExt)) {
    throw new Error('Invalid audio file format. Supported formats: MP3, WAV, OGG');
  }

  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(AUDIO_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Audio upload failed:', error);
    throw new Error(`Failed to upload audio: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(AUDIO_BUCKET)
    .getPublicUrl(filePath);

  return {
    url: publicUrl,
    path: filePath
  };
}

export async function uploadTrackArtwork(file: File): Promise<UploadResult> {
  await verifyBucketAccess(IMAGE_BUCKET);

  const fileExt = file.name.split('.').pop()?.toLowerCase();
  if (!fileExt || !['jpg', 'jpeg', 'png', 'webp'].includes(fileExt)) {
    throw new Error('Invalid image format. Supported formats: JPG, PNG, WebP');
  }

  // Resize image before upload
  const resizedImage = await resizeImage(file, MAX_IMAGE_SIZE);
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, resizedImage, {
      contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Image upload failed:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(filePath);

  return {
    url: publicUrl,
    path: filePath
  };
}

async function resizeImage(file: File, maxDimension: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > maxDimension) {
          height = Math.round(height * maxDimension / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round(width * maxDimension / height);
          height = maxDimension;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Use better quality image scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Could not create blob'));
            return;
          }
          resolve(blob);
        },
        'image/jpeg',
        0.9 // Quality setting
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
}
