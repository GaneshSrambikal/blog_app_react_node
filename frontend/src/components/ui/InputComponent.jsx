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
      <div className='form-group'>
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
  if (type === 'select') {
    return (
      <div className='form-group'>
        {label && (
          <label htmlFor={name}>
            {label}
            {required && <span className='label-required'>*</span>}
          </label>
        )}
        <select name={name} id={id} value={value} onChange={onChange} {...rest}>
          <option value=''>Select Title</option>
          <option value='software engineer'>Software Engineer</option>
          <option value='chef'>Chef</option>
          <option value='food blogger'>food blogger</option>
          <option value='coffee enthusiast'>Coffee enthusiast</option>
          <option value='vlogger'>Vlogger</option>
          <option value='content creator'>Content Creator</option>
          <option value='writer'>writer</option>
        </select>
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
