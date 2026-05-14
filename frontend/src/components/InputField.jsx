const InputField = ({ label, type, placeholder, id, value, onChange }) => (
  <div className="mt-4">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-amber-500 focus:ring-opacity-40 dark:focus:border-amber-500 focus:outline-none focus:ring focus:ring-amber-300 dark:focus:ring-amber-800 transition"
    />
  </div>
);

export default InputField;
