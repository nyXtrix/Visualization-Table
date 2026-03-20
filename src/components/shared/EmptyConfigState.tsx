const EmptyConfigState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-300">
      <div className="text-lg font-medium mb-2">Dataset loaded</div>
      <p className="text-sm mb-4">
        Select Row, Column and Value to generate the table
      </p>
      <div className="flex gap-4 text-sm">
        <div className="px-3 py-1 border dark:border-white/20 rounded">Row</div>
        <div className="px-3 py-1 border dark:border-white/20 rounded">Column</div>
        <div className="px-3 py-1 border dark:border-white/20 rounded">Value</div>
      </div>

      <p className="text-xs mt-4 text-gray-400">
        Choose fields from the Data panel
      </p>
    </div>
  );
};

export default EmptyConfigState;
