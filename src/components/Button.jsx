import PropTypes from "prop-types";

function Button({ func, text }) {
  return (
    <button
      onClick={func}
      className="px-8 mx-auto py-4 rounded-md border-[2px] bg-slate-950 border-blue-400 border-solid blueShadow duration-200"
    >
      <p>{text}</p>
    </button>
  );
}

Button.propTypes = {
  func: PropTypes.func,
  text: PropTypes.string,
};

export default Button;
