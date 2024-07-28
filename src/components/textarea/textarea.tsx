import { ChangeEvent, JSX } from 'react';

type TextareaProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

function Textarea({ value, onChange, placeholder = '' }: TextareaProps): JSX.Element {
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Textarea;
