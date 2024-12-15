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
  const [isResizeObserverActive, setIsResizeObserverActive] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let rafId: number;
    const resizeObserver = new ResizeObserver((entries) => {
      // Use requestAnimationFrame to batch resize notifications
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.minHeight = '40px';
          }
          rafId = 0;
        });
      }
    });

    setIsResizeObserverActive(true);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      resizeObserver.disconnect();
      setIsResizeObserverActive(false);
    };
  }, []);

  return (
    <div 
      className="relative" 
      ref={containerRef}
      style={{ minHeight: '40px' }}
    >
      {isResizeObserverActive && (
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