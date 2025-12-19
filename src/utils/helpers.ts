export const setCookie = (
  name: string,
  value: string,
  days?: number
): boolean => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
  return true;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length);
    }
  }
  return null;
};

export const clearCookie = (name: string): boolean => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  return true;
};

/* ===================== String ===================== */

export const capitalize = (str: string = ""): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/* ===================== Date & Time ===================== */

const changeTimezone = (date: Date, ianatz: string): Date => {
  const invdate = new Date(
    date.toLocaleString("en-US", { timeZone: ianatz })
  );

  const diff = date.getTime() - invdate.getTime();
  return new Date(date.getTime() - diff);
};

export const getDateObject = (e: string | number | Date): Date =>
  changeTimezone(new Date(e), "Europe/London");

/* ===================== Google Maps ===================== */

export const GeoCoder: google.maps.Geocoder | null =
  typeof window !== "undefined" && window.google
    ? new window.google.maps.Geocoder()
    : null;

interface GeoCodeResult {
  place_id: string;
  formatted_address: string;
  latlng: {
    lat: number;
    lng: number;
  };
  [key: string]: any;
}

export const GeoCode = async (value: string): Promise<GeoCodeResult> => {
  if (!GeoCoder) {
    throw new Error("Google Geocoder not initialized");
  }

  const { results } = await GeoCoder.geocode({ address: value });
  const { address_components, geometry, place_id, formatted_address } =
    results[0];

  const address: Record<string, string> = {};

  address_components?.forEach(({ short_name, types }) => {
    if (types.includes("administrative_area_level_1")) {
      address.state = short_name;
    } else if (types.includes("administrative_area_level_2")) {
      address.county = short_name;
    } else if (types.includes("locality")) {
      address.city = short_name;
    } else {
      address[types[0]] = short_name;
    }
  });

  return {
    ...address,
    place_id,
    formatted_address,
    latlng: {
      lat: geometry.location.lat(),
      lng: geometry.location.lng(),
    },
  };
};

/* ===================== Utils ===================== */

export const convertToCents = (amountInDollars: number): number | null => {
  if (typeof amountInDollars !== "number") return null;
  return Math.round(amountInDollars * 100);
};

/* ===================== Time Slots ===================== */

interface TimeRange {
  start: string;
  end: string;
}

interface DaySlot {
  label: string;
  range?: TimeRange[];
}

interface Option {
  label: string;
  value: string;
}

export const getTimeListOfDay = (
  date: Option,
  array: DaySlot[],
  type?: string
): Option[] => {
  if (!date || !array || array.length === 0) {
    return [];
  }

  const target = array.find(ele => ele.label === date.label);

  if (!target || !target.range) {
    return [];
  }

  return target.range.map(ele => ({
    label: `${ele.start}-${ele.end}`,
    value: `${ele.start}-${ele.end}`,
  }));
};

/* ===================== Cloudinary ===================== */

export const uploadImageToCloudnairy = async (
  file: File
): Promise<any> => {
  const upload_preset = "uce4elli";
  const cloud_name = "ddj6l5iyu";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
};
