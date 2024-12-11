import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";

interface LocationPickerProps {
  onLocationSelect: (location: string) => void;
  defaultLocation?: string;
}

export const LocationPicker = ({
  onLocationSelect,
  defaultLocation,
}: LocationPickerProps) => {
  const [location, setLocation] = useState(defaultLocation || "");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const key = localStorage.getItem("GOOGLE_MAPS_API_KEY");
    if (key) {
      setApiKey(key);
    } else {
      console.warn("Google Maps API key not found in localStorage");
      toast({
        title: "Configuration Required",
        description: "Please set your Google Maps API key in localStorage",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleLocationSelect = (selectedOption: any) => {
    const selectedLocation = selectedOption.label;
    setLocation(selectedLocation);
    onLocationSelect(selectedLocation);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <MapPin className="w-4 h-4 mr-2" />
          {location || "Select Location"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Your Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {apiKey ? (
            <GooglePlacesAutocomplete
              apiKey={apiKey}
              selectProps={{
                value: { label: location, value: location },
                onChange: handleLocationSelect,
                placeholder: "Search for your location",
                className: "w-full",
              }}
            />
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              Please set your Google Maps API key in localStorage
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};