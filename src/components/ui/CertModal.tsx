'use client';

interface CertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
}

export default function CertModal({ isOpen, onClose, title, image }: CertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true"></div>
      
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
          <h5 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h5>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2" aria-label="Close">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow flex justify-center items-center bg-gray-50 dark:bg-gray-950">
          <img src={image} alt={title} className="max-w-full h-auto object-contain rounded" />
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
