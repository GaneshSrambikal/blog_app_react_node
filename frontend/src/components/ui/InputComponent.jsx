const InputComponent = (props) => {
  const {
    label,
    type = 'text',
    name,
    id,
    value,
    onChange,
    error,
    required,
    ...rest
  } = props;
  return (
    <div className='form-group'>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className='label-required'>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        {...rest}
      />
      {error && <span className='error-message'>{error}</span>}
    </div>
  );
};

export default InputComponent;
