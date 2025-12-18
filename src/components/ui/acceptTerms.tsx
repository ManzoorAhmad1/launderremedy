import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxWithTermsProps {
  type?: 'terms' | 'privacy' | 'marketing';
  handleCheckboxChange: () => void;
  isChecked: boolean;
}

const CheckboxWithTerms: React.FC<CheckboxWithTermsProps> = ({
  type = 'terms',
  handleCheckboxChange,
  isChecked,
}) => {
  const getText = () => {
    switch (type) {
      case 'terms':
        return 'I agree to the Terms & Conditions';
      case 'privacy':
        return 'I agree to the Privacy Policy';
      case 'marketing':
        return 'I agree to receive marketing communications';
      default:
        return 'I agree';
    }
  };

  const getLink = () => {
    switch (type) {
      case 'terms':
        return '/terms';
      case 'privacy':
        return '/privacy';
      case 'marketing':
        return '/marketing';
      default:
        return '#';
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
          id={`checkbox-${type}`}
        />
        <label
          htmlFor={`checkbox-${type}`}
          className="flex items-center cursor-pointer"
        >
          <div className={`
            w-5 h-5 rounded border flex items-center justify-center transition-colors
            ${isChecked
              ? 'bg-primary-600 border-primary-600'
              : 'border-neutral-300 dark:border-neutral-600'
            }
          `}>
            {isChecked && (
              <Check className="w-3 h-3 text-white" />
            )}
          </div>
          <span className="ml-3 text-sm text-neutral-700 dark:text-neutral-300">
            {getText().split(' ').map((word, index, array) => {
              if (index === array.length - 2 || index === array.length - 1) {
                return (
                  <a
                    key={index}
                    href={getLink()}
                    className="text-primary-600 hover:text-primary-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {word}{' '}
                  </a>
                );
              }
              return word + ' ';
            })}
          </span>
        </label>
      </div>
    </div>
  );
};

export default CheckboxWithTerms;