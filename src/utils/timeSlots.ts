/**
 * Time Slots Utility Functions
 * Helper functions for managing collection and delivery times
 */

export interface TimeSlot {
  start: string;
  end: string;
  value: string;
  label: string;
  isAvailable?: boolean;
}

export interface DateSlot {
  label: string;
  value: string;
  timestamp: string;
  day: string;
  date: string;
  slots?: TimeSlot[];
}

/**
 * Format date to readable format
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };
  return d.toLocaleDateString('en-GB', options);
};

/**
 * Format time to 12-hour format
 */
export const formatTime = (time: string): string => {
  if (!time) return '';
  
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  
  return `${formattedHour}:${minutes} ${ampm}`;
};

/**
 * Format time range
 */
export const formatTimeRange = (start: string, end: string): string => {
  return `${formatTime(start)} - ${formatTime(end)}`;
};

/**
 * Get next available date (including today if current time allows)
 */
export const getNextAvailableDate = (): Date => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // If it's before 8 PM, allow today, otherwise start from tomorrow
  if (currentHour < 20) {
    now.setHours(0, 0, 0, 0);
    return now;
  }
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

/**
 * Get delivery date based on collection date
 * Typically 1-2 days after collection
 */
export const getDeliveryDate = (collectionDate: Date, daysToAdd: number = 1): Date => {
  const deliveryDate = new Date(collectionDate);
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
  return deliveryDate;
};

/**
 * Check if date is valid for selection (not in past)
 */
export const isValidDate = (date: Date | string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

/**
 * Generate time slots for a day with 3-hour intervals
 */
export const generateTimeSlots = (
  startHour: number = 8,
  endHour: number = 20,
  intervalMinutes: number = 180 // 3 hours = 180 minutes
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const now = new Date();
  const currentHour = now.getHours();
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  // Determine effective start hour (skip past slots for today)
  const isToday = true; // This will be checked per date
  const effectiveStartHour = isToday && currentHour >= startHour 
    ? Math.ceil((currentHour + 1) / 3) * 3 // Next 3-hour block
    : startHour;
  
  for (let hour = Math.max(effectiveStartHour, startHour); hour < endHour; hour += 3) {
    const start = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = Math.min(hour + 3, endHour);
    const end = `${endTime.toString().padStart(2, '0')}:00`;
    
    slots.push({
      start,
      end,
      value: `${start} - ${end}`,
      label: formatTimeRange(start, end),
      isAvailable: true
    });
  }
  
  return slots;
};

/**
 * Get available dates for next N days
 */
export const getAvailableDates = (numberOfDays: number = 14): DateSlot[] => {
  const dates: DateSlot[] = [];
  const startDate = getNextAvailableDate();
  
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    dates.push({
      label: formatDate(date),
      value: date.toISOString(),
      timestamp: date.toISOString(),
      day: dayNames[date.getDay()],
      date: `${date.getDate()} ${monthNames[date.getMonth()]}`,
      slots: generateTimeSlots()
    });
  }
  
  return dates;
};

/**
 * Filter available time slots based on existing bookings
 */
export const filterAvailableSlots = (
  slots: TimeSlot[],
  bookedSlots: string[] = []
): TimeSlot[] => {
  return slots.map(slot => ({
    ...slot,
    isAvailable: !bookedSlots.includes(slot.value)
  }));
};

/**
 * Get earliest available slot
 */
export const getEarliestAvailableSlot = (slots: TimeSlot[]): TimeSlot | null => {
  const availableSlot = slots.find(slot => slot.isAvailable);
  return availableSlot || null;
};

/**
 * Check if time slot is in the past
 */
export const isSlotInPast = (date: Date | string, timeSlot: string): boolean => {
  const selectedDate = new Date(date);
  const [timeRange] = timeSlot.split(' - ');
  const [hours, minutes] = timeRange.split(':').map(Number);
  
  selectedDate.setHours(hours, minutes, 0, 0);
  
  return selectedDate < new Date();
};

/**
 * Calculate minimum delivery date based on collection date and time
 */
export const calculateMinimumDeliveryDate = (
  collectionDate: Date | string,
  collectionTime: string,
  processingHours: number = 24
): Date => {
  const collection = new Date(collectionDate);
  const [timeRange] = collectionTime.split(' - ');
  const [hours, minutes] = timeRange.split(':').map(Number);
  
  collection.setHours(hours, minutes, 0, 0);
  
  const deliveryDate = new Date(collection);
  deliveryDate.setHours(deliveryDate.getHours() + processingHours);
  
  // Round up to next available slot
  const deliveryHour = deliveryDate.getHours();
  if (deliveryHour < 8) {
    deliveryDate.setHours(8, 0, 0, 0);
  } else if (deliveryHour >= 20) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    deliveryDate.setHours(8, 0, 0, 0);
  }
  
  return deliveryDate;
};

/**
 * Format collection and delivery summary
 */
export const formatScheduleSummary = (
  collectionDate: string,
  collectionTime: string,
  deliveryDate: string,
  deliveryTime: string
): string => {
  const collectionFormatted = `${formatDate(collectionDate)} at ${collectionTime}`;
  const deliveryFormatted = `${formatDate(deliveryDate)} at ${deliveryTime}`;
  
  return `Collection: ${collectionFormatted}\nDelivery: ${deliveryFormatted}`;
};

/**
 * Validate collection and delivery times
 */
export const validateSchedule = (
  collectionDate: string,
  collectionTime: string,
  deliveryDate: string,
  deliveryTime: string
): { isValid: boolean; error?: string } => {
  // Check if collection date is valid
  if (!isValidDate(collectionDate)) {
    return { isValid: false, error: 'Collection date cannot be in the past' };
  }
  
  // Check if delivery date is after collection date
  const collection = new Date(collectionDate);
  const delivery = new Date(deliveryDate);
  
  if (delivery <= collection) {
    return { isValid: false, error: 'Delivery date must be after collection date' };
  }
  
  // Check if there's enough processing time (minimum 24 hours)
  const minDelivery = calculateMinimumDeliveryDate(collectionDate, collectionTime, 24);
  if (delivery < minDelivery) {
    return { isValid: false, error: 'Minimum 24 hours required between collection and delivery' };
  }
  
  return { isValid: true };
};

/**
 * Group time slots by period (Morning, Afternoon, Evening)
 */
export const groupSlotsByPeriod = (slots: TimeSlot[]): Record<string, TimeSlot[]> => {
  const grouped: Record<string, TimeSlot[]> = {
    Morning: [],
    Afternoon: [],
    Evening: []
  };
  
  slots.forEach(slot => {
    const hour = parseInt(slot.start.split(':')[0], 10);
    
    if (hour >= 6 && hour < 12) {
      grouped.Morning.push(slot);
    } else if (hour >= 12 && hour < 17) {
      grouped.Afternoon.push(slot);
    } else if (hour >= 17 && hour < 22) {
      grouped.Evening.push(slot);
    }
  });
  
  return grouped;
};

/**
 * Get day name from date
 */
export const getDayName = (date: Date | string): string => {
  const d = new Date(date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[d.getDay()];
};

/**
 * Check if date is weekend
 */
export const isWeekend = (date: Date | string): boolean => {
  const d = new Date(date);
  const day = d.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

/**
 * Get business days between two dates
 */
export const getBusinessDaysBetween = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const current = new Date(startDate);
  
  while (current <= endDate) {
    if (!isWeekend(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
};

/**
 * Format duration between collection and delivery
 */
export const formatDuration = (collectionDate: Date, deliveryDate: Date): string => {
  const hours = Math.abs(deliveryDate.getTime() - collectionDate.getTime()) / 36e5;
  
  if (hours < 24) {
    return `${Math.round(hours)} hours`;
  }
  
  const days = Math.floor(hours / 24);
  return days === 1 ? '1 day' : `${days} days`;
};
