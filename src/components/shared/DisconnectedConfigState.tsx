import { Unplug } from 'lucide-react';

const DisconnectedConfigState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 animate-in fade-in zoom-in duration-300">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Unplug className="w-10 h-10 text-primary" />
      </div>
      <div className="text-lg font-semibold mb-2 text-gray-800">Datasets Not Connected</div>
      <p className="text-sm mb-6 max-w-md leading-relaxed">
        The selected fields belong to datasets that have no relationship. 
        Please Check the <span className="font-medium text-gray-700">Items Relationship</span> in table creation first.
      </p>
      
      <div className="flex gap-4 text-xs">
        <div className="px-8 py-2 bg-white border border-gray-300 rounded">
          Check Table Values
        </div>
        <div className="px-4 py-2 bg-white border border-gray-300 rounded">
          Verify Dataset Relationship
        </div>
      </div>
    </div>
  );
};

export default DisconnectedConfigState;
