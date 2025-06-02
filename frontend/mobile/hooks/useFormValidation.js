import { useState, useEffect, useCallback, useMemo } from 'react';

export default function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState(
    Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );
  const [errors, setErrors] = useState(
    Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
  );

  // Memoize validation rules to prevent infinite loops
  const memoizedRules = useMemo(() => validationRules, []);

  useEffect(() => {
    const newErrors = {};
    
    Object.keys(memoizedRules).forEach(field => {
      if (touched[field]) {
        const rule = memoizedRules[field];
        const value = values[field];
        
        if (rule.required && !value) {
          newErrors[field] = rule.required;
        } else if (rule.pattern && !rule.pattern.test.test(value)) {
          newErrors[field] = rule.pattern.message;
        } else if (rule.minLength && value.length < rule.minLength.value) {
          newErrors[field] = rule.minLength.message;
        } else if (rule.custom) {
          const customError = rule.custom(value, values);
          if (customError) {
            newErrors[field] = customError;
          }
        } else {
          newErrors[field] = '';
        }
      } else {
        newErrors[field] = '';
      }
    });
    
    setErrors(newErrors);
  }, [values, touched, memoizedRules]);

  const handleChange = useCallback((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const touchAll = useCallback(() => {
    const allTouched = Object.keys(touched).reduce(
      (acc, key) => ({ ...acc, [key]: true }), 
      {}
    );
    setTouched(allTouched);
  }, [touched]);

  const isValid = useMemo(() => 
    Object.values(errors).every(error => !error) && 
    Object.keys(memoizedRules).every(field => values[field]),
    [errors, memoizedRules, values]
  );

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    touchAll,
    isValid
  };
} 