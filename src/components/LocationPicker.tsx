import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MapPin, Crosshair } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

interface LocationPickerProps {
  onLocationSelect: (location: string, coordinates?: { lat: number; lng: number }) => void;
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
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("current");

  useEffect(() => {
    const key = localStorage.getItem("GOOGLE_MAPS_API_KEY");
    if (key) {
      setApiKey(key);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen && apiKey) {
      const timer = setTimeout(() => {
        setMountAutocomplete(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setMountAutocomplete(false);
    }
  }, [isOpen, apiKey]);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const data = await response.json();
            if (data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              setLocation(address);
              onLocationSelect(address, { lat: latitude, lng: longitude });
              setIsOpen(false);
              toast({
                title: "Location Set",
                description: "Your current location has been set successfully.",
              });
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to get your current location address",
              variant: "destructive",
            });
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          toast({
            title: "Error",
            description: "Unable to get your location. Please check your browser permissions.",
            variant: "destructive",
          });
          setIsLoadingLocation(false);
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsLoadingLocation(false);
    }
  };

  const handleLocationSelect = (selectedOption: any) => {
    const selectedLocation = selectedOption.label;
    setLocation(selectedLocation);
    onLocationSelect(selectedLocation);
    setIsOpen(false);
    toast({
      title: "Location Set",
      description: "Your location has been set successfully.",
    });
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Your Location</DialogTitle>
          {showApiKeyInput ? (
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
          ) : (
            <DialogDescription>
              Select how you'd like to set your location
            </DialogDescription>
          )}
        </DialogHeader>
        
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
        ) : (
          <Tabs defaultValue="current" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Location</TabsTrigger>
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
              >
                <Crosshair className="w-4 h-4 mr-2" />
                {isLoadingLocation ? "Getting location..." : "Use Current Location"}
              </Button>
            </TabsContent>
            <TabsContent value="manual" className="mt-4">
              {apiKey && mountAutocomplete && (
                <GooglePlacesAutocomplete
                  apiKey={apiKey}
                  selectProps={{
                    value: { label: location, value: location },
                    onChange: handleLocationSelect,
                    placeholder: "Search for your location",
                    className: "w-full",
                  }}
                />
              )}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
