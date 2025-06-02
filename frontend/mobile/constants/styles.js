export const colors = {
  primary: '#ef4444', // red-600
  primaryDark: '#dc2626', // red-700
  secondary: '#3b82f6', // blue-600
  success: '#10b981', // green-500
  warning: '#f59e0b', // yellow-500
  error: '#ef4444', // red-500
  neutral: {
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
};

export const commonStyles = {
  // Card styles
  card: 'bg-neutral-800/90 p-6 rounded-2xl',
  cardSolid: 'bg-gray-800 rounded-xl p-4',
  
  // Button styles
  buttonPrimary: 'bg-red-600 rounded-lg py-3 items-center',
  buttonDisabled: 'bg-gray-500 rounded-lg py-3 items-center',
  buttonOutline: 'border border-red-600 rounded-lg py-3 items-center',
  buttonText: 'text-white font-semibold',
  
  // Input styles
  input: 'bg-white rounded-lg px-4 py-3',
  inputDark: 'bg-neutral-700 border border-neutral-600 rounded-full px-4 h-12 text-white',
  
  // Text styles
  title: 'text-white text-2xl font-bold',
  subtitle: 'text-gray-300 text-sm',
  label: 'text-white text-lg font-semibold',
  
  // Container styles
  container: 'flex-1 bg-neutral-900',
  scrollContainer: 'px-4 py-2',
  
  // Flex styles
  flexRow: 'flex-row items-center',
  flexBetween: 'flex-row justify-between items-center',
  flexCenter: 'items-center justify-center',
};

export const screenPadding = {
  top: 120, // For screens with transparent headers
  topNormal: 70, // For screens with normal headers
  bottom: 40,
  horizontal: 16,
}; 