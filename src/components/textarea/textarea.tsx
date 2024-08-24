import { ChangeEvent, JSX } from 'react';

type TextareaProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  isDisabled: boolean;
};

function Textarea({ value, onChange, isDisabled, placeholder = '' }: TextareaProps): JSX.Element {
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      data-testid="textarea"
    />
  );
}

export default Textarea;
