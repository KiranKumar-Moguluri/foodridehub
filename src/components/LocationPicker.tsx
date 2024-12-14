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
  DialogDescription,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";

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
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [mountAutocomplete, setMountAutocomplete] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("GOOGLE_MAPS_API_KEY");
    if (key) {
      setApiKey(key);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  // Handle mounting/unmounting of autocomplete to prevent ResizeObserver errors
  useEffect(() => {
    if (isOpen && apiKey) {
      // Delay mounting to ensure dialog is fully open
      const timer = setTimeout(() => {
        setMountAutocomplete(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setMountAutocomplete(false);
    }
  }, [isOpen, apiKey]);

  const handleLocationSelect = (selectedOption: any) => {
    const selectedLocation = selectedOption.label;
    setLocation(selectedLocation);
    onLocationSelect(selectedLocation);
    setIsOpen(false);
  };

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem("GOOGLE_MAPS_API_KEY", apiKeyInput.trim());
      setApiKey(apiKeyInput.trim());
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your Google Maps API key has been saved successfully.",
      });
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid Google Maps API key.",
        variant: "destructive",
      });
    }
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
          {showApiKeyInput && (
            <DialogDescription>
              Please enter your Google Maps API key to enable location search.
              You can get one from the{" "}
              <a
                href="https://console.cloud.google.com/google/maps-apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Cloud Console
              </a>
              .
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="space-y-4">
          {showApiKeyInput ? (
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your Google Maps API key"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
              />
              <Button onClick={handleSaveApiKey} className="w-full">
                Save API Key
              </Button>
            </div>
          ) : apiKey && mountAutocomplete ? (
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
              Loading location search...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};