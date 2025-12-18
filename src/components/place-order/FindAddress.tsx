"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Home, 
  Briefcase, 
  Hotel, 
  Navigation,
  ExternalLink,
  CheckCircle,
} from "lucide-react";


import { GeoCode } from "@/utils/helpers";
import Toast from "../ui/Toast";
import PlacesAutoComplete from "../ui/PlacesAutoComplete";
import GoogleMap from "../ui/GoogleMap";

interface FindAddressProps {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const FindAddress: React.FC<FindAddressProps> = ({ state, setState }) => {
  const [addressType, setAddressType] = useState<"home" | "office" | "hotel">("home");
  const [marker, setMarker] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const addressTypes = [
    {
      value: "home",
      label: "Home",
      icon: Home,
      color: "bg-accent-blue/20 text-accent-blue",
      hoverColor: "hover:bg-accent-blue/30"
    },
    {
      value: "office",
      label: "Office",
      icon: Briefcase,
      color: "bg-accent-green/20 text-accent-green",
      hoverColor: "hover:bg-accent-green/30"
    },
    {
      value: "hotel",
      label: "Hotel",
      icon: Hotel,
      color: "bg-accent-yellow/20 text-accent-yellow",
      hoverColor: "hover:bg-accent-yellow/30"
    }
  ];

  const handleMapLoad = useCallback((map: any) => {
    mapRef.current = map;
    setIsMapLoaded(true);
  }, []);

  const handleMapClick = useCallback(async ({ placeId }: { placeId: string }) => {
    if (!placeId) {
      Toast({
        type: "warning",
        message: "Please select a valid location on the map",
      });
      return;
    }

    try {
      const res = await GeoCode({ placeId });
      setMarker(res.latlng);
      setState((prev: any) => ({ 
        ...prev, 
        address: res,
        addressType 
      }));
      
      if (mapRef.current) {
        mapRef.current.panTo(res.latlng);
      }
    } catch (error) {
      Toast({
        type: "error",
        message: "Failed to get location details. Please try again.",
      });
    }
  }, [setState, addressType]);

  useEffect(() => {
    setState((prev: any) => ({ ...prev, addressType }));
  }, [addressType, setState]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          STEP 1: SET DELIVERY LOCATION
        </div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
          Where should we <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">collect</span> from?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Enter your address or use the map to select your location. We'll collect and deliver to this address.
        </p>
      </div>

      <div className="space-y-6">
        {/* Address Search */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Search Address
          </label>
          <div className="relative">
            <PlacesAutoComplete
              placeholder="Enter your full address or postcode"
              search={state?.address?.formatted_address}
              value={state?.address}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          </div>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Start typing your address and select from suggestions
          </p>
        </div>

        {/* Address Type Selection */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Address Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {addressTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = addressType === type.value;
              
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setAddressType(type.value as any)}
                  className={`
                    flex flex-col items-center p-4 rounded-xl border transition-all duration-300
                    ${isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-primary'
                      : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
                    }
                  `}
                >
                  <div className={`
                    p-3 rounded-lg mb-3 transition-colors
                    ${isSelected ? type.color : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`
                    font-medium text-sm
                    ${isSelected
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-600 dark:text-neutral-400'
                    }
                  `}>
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Details */}
        {(state?.address?.formatted_address || state?.address?.value) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {addressType === "hotel" ? (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Hotel Room Number
                </label>
                <input
                  type="text"
                  name="hotel_room_number"
                  placeholder="Enter your room number"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onChange={(e) => setState((prev: any) => ({ 
                    ...prev, 
                    hotel_room_number: e.target.value 
                  }))}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Additional Details (Optional)
                </label>
                <input
                  type="text"
                  name="address_detail"
                  placeholder="Apartment number, floor, building name, etc."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onChange={(e) => setState((prev: any) => ({ 
                    ...prev, 
                    address_detail: e.target.value 
                  }))}
                />
              </div>
            )}

            {/* Map Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Confirm Location on Map
                </label>
                {marker && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-green/20 text-accent-green text-sm">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Location Confirmed
                  </div>
                )}
              </div>
              
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-lg">
                <div className="absolute top-4 left-4 z-10">
                  <div className="inline-flex items-center px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 shadow-md">
                    <Navigation className="w-4 h-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      Click on map to set exact location
                    </span>
                  </div>
                </div>
                
                <GoogleMap
                  marker={marker || state?.address?.latlng}
                  center={
                    marker?.lat
                      ? marker
                      : state?.address?.latlng
                        ? state?.address?.latlng
                        : { lat: 51.5074, lng: -0.1278 }
                  }
                  onClick={handleMapClick}
                  onLoad={handleMapLoad}
                  options={{
                    componentRestrictions: {
                      country: "uk",
                    },
                    streetViewControl: false,
                    clickableIcons: true,
                    restriction: {
                      latLngBounds: {
                        north: 60.854645,
                        south: 49.823809,
                        west: -8.649357,
                        east: 1.762524,
                      },
                      strictBounds: true,
                    },
                    styles: [
                      {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [
                          {
                            visibility: "on",
                          },
                        ],
                      },
                      {
                        featureType: "transit",
                        elementType: "labels",
                        stylers: [
                          {
                            visibility: "off",
                          },
                        ],
                      },
                    ],
                  }}
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "12px",
                  }}
                />
              </div>

              {/* Address Preview */}
              {(marker || state?.address?.formatted_address) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-900/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                      <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                        Selected Address
                      </h4>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        {state?.address?.formatted_address || state?.address?.value}
                      </p>
                      {state?.address_detail && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          Additional: {state?.address_detail}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-accent-blue/5 to-accent-green/5 border border-accent-blue/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent-blue/20 text-accent-blue">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                Pro Tips
              </h4>
              <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 mr-2 flex-shrink-0" />
                  Click directly on the map for precise location pinning
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-green mt-1.5 mr-2 flex-shrink-0" />
                  Add apartment/floor details for easier collection
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-yellow mt-1.5 mr-2 flex-shrink-0" />
                  Select correct address type for driver instructions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FindAddress;