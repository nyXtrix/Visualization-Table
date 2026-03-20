import { useRef, useCallback, useState } from 'react'
import DatasetTree from '@/components/shared/DatasetTree'
import type { Dataset } from '@/types/visual'
import FeaturesCard from '@/components/shared/FeaturesCard'
import Input from '@/components/inputs/Input';
import Loader from '@/components/shared/Loader';

interface DataCardProps{
  id:string;
  isOpen:boolean;
  dataset:Dataset[];
  handleCardCloseClick:(id:string) => void;
  onFileUpload: (file: File | null) => void;
  isLoading?: boolean;
}

const DataCard = ({dataset, id, isOpen, handleCardCloseClick, onFileUpload, isLoading}:DataCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileUpload(file);
    e.target.value = '';
  }, [onFileUpload]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const filteredDatasets = dataset.map(ds => ({
    ...ds,
    fields: ds.fields.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(ds => 
    ds.fields.length > 0 || ds.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FeaturesCard 
      id={id} 
      isOpen={isOpen} 
      handleCloseClick={handleCardCloseClick} 
      title='Data' 
      enableAddIcon
      onAddClick={handleAddClick}
      onSearch={handleSearch}
      addBtnTooltipTitle='Add new dataset'
    >
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv"
          className="hidden"
        />
        <div className="relative flex-1 min-h-0">
          <DatasetTree datasets={filteredDatasets} isSearchActive={searchTerm !== ""}/>
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 animate-in fade-in duration-200">
              <Loader />
            </div>
          )}
        </div>
    </FeaturesCard>
  )
}

export default DataCard;