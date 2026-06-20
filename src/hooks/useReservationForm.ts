import { useState, useCallback } from 'react';

export type FormErrors<T extends Record<string, unknown>> = Partial<Record<keyof T, string>>;

export function useReservationForm<T extends Record<string, unknown>>(initialValues: T, validate: (values: T) => FormErrors<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = useCallback((field: keyof T, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setErrors((current) => {
      const next = { ...current };
      if (next[field]) delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        setSubmitted(true);
        setValues(initialValues);
      }
    },
    [values, validate, initialValues],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
  }, [initialValues]);

  return { values, errors, submitted, updateField, handleSubmit, reset };
}
