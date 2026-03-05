import Dropzone from "@/components/shared/Dropzone";
import FeaturesCard from "@/components/shared/FeaturesCard";

interface VisualisationCardProps {
  id:string;
  isOpen:boolean;
  handleCloseCardClick:(id:string) => void;
}
const VisualisationCard = ({id, isOpen, handleCloseCardClick}:VisualisationCardProps) => {
  return (
    <FeaturesCard
      title="Visualisation"
      isOpen={isOpen}
      handleCloseClick={handleCloseCardClick}
      childrenClassName="flex flex-col gap-3"
      enableSearch={false}
      id={id}
    >
      <Dropzone title="Rows" />
      <Dropzone title="Columns" />
      <Dropzone title="Values" />
    </FeaturesCard>
  );
};

export default VisualisationCard;
