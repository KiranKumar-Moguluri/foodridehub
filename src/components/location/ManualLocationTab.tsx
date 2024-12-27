import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
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
  const observerRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    setIsComponentMounted(true);

    if (containerRef.current) {
      containerRef.current.style.minHeight = '40px';

      const handleResize = (entries: ResizeObserverEntry[]) => {
        // Cancel any pending animation frame
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }

        // Schedule a new animation frame
        rafRef.current = requestAnimationFrame(() => {
          entries.forEach(entry => {
            if (entry.target === containerRef.current && containerRef.current) {
              containerRef.current.style.minHeight = '40px';
            }
          });
        });
      };

      // Create new ResizeObserver
      observerRef.current = new ResizeObserver(handleResize);
      observerRef.current.observe(containerRef.current);
    }

    // Cleanup function
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
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