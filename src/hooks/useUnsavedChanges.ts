import { useEffect, useState, useCallback } from 'react';
import { useAppSelector } from '@/store/hooks';

type ExitType = 'NAVIGATE' | 'REFRESH' | null;

export const useUnsavedChanges = () => {
  const datasets = useAppSelector((state) => state.dataset.datasets);
  const hasDatasets = datasets.length > 0;
  
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitType, setExitType] = useState<ExitType>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasDatasets) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return event.returnValue;
      }
    };

    const handlePopState = () => {
      if (hasDatasets) {
        setExitType("NAVIGATE");
        setShowExitModal(true);
        window.history.pushState(null, "", window.location.href);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!hasDatasets) return;

      const isF5 = event.key === "F5";
      const isRWithModifier = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "r";

      if (isF5 || isRWithModifier) {
        event.preventDefault();
        setExitType("REFRESH");
        setShowExitModal(true);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    if (hasDatasets) {
      window.history.pushState(null, "", window.location.href);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasDatasets]);

  const handleConfirmExit = useCallback(() => {
    setShowExitModal(false);
    if (exitType === "REFRESH") {
      window.location.reload();
    } else {
      window.history.go(-2);
    }
  }, [exitType]);

  const handleCancelExit = useCallback(() => {
    setShowExitModal(false);
    setExitType(null);
  }, []);

  return {
    showExitModal,
    setShowExitModal,
    handleConfirmExit,
    handleCancelExit
  };
};
