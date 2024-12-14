import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useToast } from "../ui/use-toast";
import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Debounce resize notifications
      if (containerRef.current) {
        containerRef.current.style.minHeight = '40px';
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
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
            }),
          },
        }}
      />
    </div>
  );
};