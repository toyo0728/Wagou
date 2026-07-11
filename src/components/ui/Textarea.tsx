import styles from './Textarea.module.css';

type TextareaProps = {
  id: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
};

export default function Textarea({
  id = '',
  name = '',
  placeholder = '',
  required = false,
}: TextareaProps) {
  return (
    <textarea
      className={styles.textarea}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
    />
  );
}
