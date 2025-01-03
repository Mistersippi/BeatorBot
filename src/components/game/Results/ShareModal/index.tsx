import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SharePreview } from './SharePreview';
import { ShareOptions } from './ShareOptions';
import { generateShareImage } from './utils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
  genre: string;
}

export function ShareModal({ isOpen, onClose, score, total, genre }: ShareModalProps) {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  const shareText = `I scored ${score}/${total} on Beat or Bot in the ${genre} genre! Can you do better?`;
  const shareUrl = window.location.href;

  const handleShare = async (platform: 'facebook' | 'twitter' | 'linkedin') => {
    setIsGeneratingImage(true);
    try {
      const imageUrl = await generateShareImage(score, total, genre);
      const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('Beat or Bot Challenge Results')}&summary=${encodeURIComponent(shareText)}`
      };

      window.open(urls[platform], '_blank', 'width=600,height=400');
    } catch (error) {
      console.error('Failed to generate share image:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="relative p-6">
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>

                  <h2 className="text-2xl font-bold mb-6">Share Your Results</h2>
                  
                  <SharePreview
                    score={score}
                    total={total}
                    genre={genre}
                    isGenerating={isGeneratingImage}
                  />
                  
                  <ShareOptions onShare={handleShare} />
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}