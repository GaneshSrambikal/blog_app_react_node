import { blogCategory, profileTitle } from '../../utils/constant/selectValues';
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
        {error && <span className='error-message'>{error}</span>}
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
        {id == 'title' && (
          <select
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            {...rest}
          >
            <option value=''>Select Title</option>
            {profileTitle.map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </select>
        )}
        {id == 'category' && (
          <select
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            {...rest}
          >
            <option value=''>Select Category</option>
            {blogCategory.map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </select>
        )}
        {error && <span className='error-message'>{error}</span>}
      </div>
    );
  }
  if(type == 'file'){
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
