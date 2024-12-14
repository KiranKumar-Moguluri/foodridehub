import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useToast } from "../ui/use-toast";

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
  return (
    <div className="relative">
      <GooglePlacesAutocomplete
        apiKey={apiKey}
        selectProps={{
          value: { label: location, value: location },
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
            }),
          },
        }}
      />
    </div>
  );
};