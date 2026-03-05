import React from 'react'
import DatasetTree from '@/components/shared/DatasetTree'
import type { Dataset } from '@/types/pivot'
import FeaturesCard from '@/components/shared/FeaturesCard'

interface DataCardProps{
  id:string;
  isOpen:boolean;
  dataset:Dataset[];
  handleCardCloseClick:(id:string) => void;
}

const DataCard = ({dataset, id, isOpen, handleCardCloseClick}:DataCardProps) => {
  return (
    <FeaturesCard id={id} isOpen={isOpen} handleCloseClick={handleCardCloseClick} title='Data' enableAddIcon>
        <DatasetTree datasets={dataset}/>
    </FeaturesCard>
  )
}

export default DataCard