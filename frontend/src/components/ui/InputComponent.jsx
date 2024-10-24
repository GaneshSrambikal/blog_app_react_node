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
  if (type === 'textarea') {
    return (
      <div>
        {label && (
          <label htmlFor={name}>
            {label}
            {required && <span className='label-required'>*</span>}
          </label>
        )}
        <textarea
          type={type}
          value={value}
          id={id}
          name={name}
          onChange={onChange}
          {...rest}
        ></textarea>
      </div>
    );
  }
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
