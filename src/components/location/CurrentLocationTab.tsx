
import { Button } from "../ui/button";
import { Crosshair } from "lucide-react";
import { useToast } from "../ui/use-toast";

interface CurrentLocationTabProps {
  onLocationSelect: (location: string, coordinates?: { lat: number; lng: number }) => void;
  apiKey: string;
  setIsOpen: (isOpen: boolean) => void;
  isLoadingLocation: boolean;
  setIsLoadingLocation: (loading: boolean) => void;
}

export const CurrentLocationTab = ({
  onLocationSelect,
  apiKey,
  setIsOpen,
  isLoadingLocation,
  setIsLoadingLocation,
}: CurrentLocationTabProps) => {
  const { toast } = useToast();

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
            url.searchParams.append("latlng", `${latitude},${longitude}`);
            url.searchParams.append("key", apiKey);

            const response = await fetch(url.toString());
            const data = await response.json();
            
            if (data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              localStorage.setItem("savedLocation", address);
              localStorage.setItem("savedCoordinates", JSON.stringify({ lat: latitude, lng: longitude }));
              onLocationSelect(address, { lat: latitude, lng: longitude });
              setIsOpen(false);
              toast({
                title: "Location Set",
                description: "Your current location has been saved and set successfully.",
              });
            } else {
              throw new Error("No results found");
            }
          } catch (error) {
            console.error("Geocoding error:", error);
            toast({
              title: "Error",
              description: "Failed to get your current location address. Please try again.",
              variant: "destructive",
            });
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
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

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={getCurrentLocation}
      disabled={isLoadingLocation}
    >
      <Crosshair className="w-4 h-4 mr-2" />
      {isLoadingLocation ? "Getting location..." : "Use Current Location"}
    </Button>
  );
};
