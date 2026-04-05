"use client";

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface VideoDialogProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoDialog({ open, onClose, videoUrl }: VideoDialogProps) {
  // Extrai o ID do vídeo do YouTube da URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1` : '';

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop 
        transition
        className="fixed inset-0 bg-black/80 transition-opacity duration-300 ease-out data-closed:opacity-0" 
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel 
          transition
          className="w-full max-w-4xl bg-black rounded-lg overflow-hidden transition-all duration-300 ease-out data-closed:opacity-0 data-closed:scale-95"
        >
          {embedUrl ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="p-8 text-white text-center">
              <p>URL error</p>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
