const FormRow = (props) => {
    const { type, value, name, iconBootstrap,placeholder,handlerChange } = props;
    return (
      <div className="form-signup-control">
      <span>
        <i className={iconBootstrap}></i>
      </span>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event)=>{
            handlerChange(event)
        }}
      ></input>
    </div>
    );
  };
  
  export default FormRow;
  