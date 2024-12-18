import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useToast } from "../ui/use-toast";
import { useEffect, useRef, useState } from 'react';

interface ManualLocationTabProps {
  apiKey: string;
  location: string;
  onLocationSelect: (selectedOption: any) => void;
}

export const ManualLocationTab = ({
  apiKey,
  location,
  onLocationSelect,
}: ManualLocationTabProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    const initializeResizeObserver = () => {
      if (!containerRef.current) return;

      // Set initial height
      containerRef.current.style.minHeight = '40px';

      // Create new ResizeObserver
      resizeObserverRef.current = new ResizeObserver((entries) => {
        // Cancel any pending animation frame
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        // Schedule a new animation frame
        animationFrameId = requestAnimationFrame(() => {
          if (!containerRef.current) return;

          entries.forEach(entry => {
            if (entry.target === containerRef.current) {
              containerRef.current.style.minHeight = '40px';
            }
          });
        });
      });

      // Start observing
      resizeObserverRef.current.observe(containerRef.current);
    };

    // Initialize observer and mark component as mounted
    initializeResizeObserver();
    setIsComponentMounted(true);

    // Cleanup function
    return () => {
      // Cancel any pending animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Disconnect observer
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      setIsComponentMounted(false);
    };
  }, []);

  return (
    <div 
      className="relative" 
      ref={containerRef}
      style={{ minHeight: '40px' }}
    >
      {isComponentMounted && (
        <GooglePlacesAutocomplete
          apiKey={apiKey}
          selectProps={{
            value: location ? { label: location, value: location } : null,
            onChange: onLocationSelect,
            placeholder: "Search for your location",
            className: "w-full",
            styles: {
              container: (provided) => ({
                ...provided,
                position: 'static',
              }),
              menu: (provided) => ({
                ...provided,
                position: 'absolute',
                zIndex: 1000,
                width: '100%',
              }),
              control: (provided) => ({
                ...provided,
                minHeight: '40px',
                borderRadius: '0.375rem',
                borderColor: 'rgb(209 213 219)',
                '&:hover': {
                  borderColor: 'rgb(156 163 175)',
                },
              }),
            },
          }}
        />
      )}
    </div>
  );
};