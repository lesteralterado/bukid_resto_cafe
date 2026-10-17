import { useState, useCallback } from 'react';

export type FormErrors<T extends Record<string, unknown>> = Partial<Record<keyof T, string>>;
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function useReservationForm<T extends Record<string, unknown>>(
  initialValues: T,
  validate: (values: T) => FormErrors<T>,
  onSubmit?: (values: T) => Promise<void>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const updateField = useCallback((field: keyof T, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setStatus((current) => (current === 'submitting' ? current : 'idle'));
    setErrors((current) => {
      const next = { ...current };
      if (next[field]) delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (status === 'submitting') return;
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

      setStatus('submitting');
      try {
        await onSubmit?.(values);
        setStatus('success');
        setValues(initialValues);
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    },
    [status, values, validate, onSubmit, initialValues],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
  }, [initialValues]);

  return { values, errors, status, updateField, handleSubmit, reset };
}
