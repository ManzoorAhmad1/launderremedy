interface LatLng {
  lat: number;
  lng: number;
}

interface GeoCodeResult {
  latlng: LatLng;
  formatted_address: string;
  place_id: string;
}

interface TimeRange {
  start: string;
  end: string;
}

interface TimeSlot {
  day: string;
  range: TimeRange[];
}

// Get time list for a specific day
export const getTimeListOfDay = (selectedDay: any, timeSlots: TimeSlot[]) => {
  if (!selectedDay || !timeSlots.length) return [];

  const selectedSlot = timeSlots.find(slot => slot.day === selectedDay.value);
  if (!selectedSlot) return [];

  return selectedSlot.range.map(range => ({
    value: `${range.start}-${range.end}`,
    label: `${range.start}-${range.end}`,
  }));
};

// Format currency
export const formatCurrency = (amount: number, currency = 'GBP') => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Format date
export const formatDate = (date: string | Date, format = 'dd/MM/yyyy') => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  switch (format) {
    case 'dd/MM/yyyy':
      return `${day}/${month}/${year}`;
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    default:
      return d.toLocaleDateString();
  }
};

// Format time
export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number (UK format)
export const validatePhone = (phone: string): boolean => {
  const re = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
  return re.test(phone);
};

// Validate postcode (UK format)
export const validatePostcode = (postcode: string): boolean => {
  const re = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/;
  return re.test(postcode.toUpperCase());
};

// Calculate total price
export const calculateTotal = (items: any[]): number => {
  return items.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return total + (price * quantity);
  }, 0);
};

// Google Maps Geocode
export const GeoCode = async ({ placeId }: { placeId: string }): Promise<GeoCodeResult> => {
  if (!window.google) {
    throw new Error('Google Maps API not loaded');
  }

  const geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const location = results[0].geometry.location;
        resolve({
          latlng: {
            lat: location.lat(),
            lng: location.lng(),
          },
          formatted_address: results[0].formatted_address,
          place_id: placeId,
        });
      } else {
        reject(new Error('Geocode was not successful: ' + status));
      }
    });
  });
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Get file extension
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Sleep function
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};