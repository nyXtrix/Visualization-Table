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
        event.returnValue = '';
        return '';
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!hasDatasets) return;

      const isF5 = event.key === 'F5';
      const isRWithModifier = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'r';

      if (isF5 || isRWithModifier) {
        event.preventDefault();
        setExitType('REFRESH');
        setShowExitModal(true);
      }
    };

    const handlePopState = () => {
      if (hasDatasets) {
        window.history.pushState({ guarded: true }, '');
        setExitType('NAVIGATE');
        setShowExitModal(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    if (hasDatasets && !window.history.state?.guarded) {
      window.history.pushState({ guarded: true }, '');
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasDatasets]);

  const handleConfirmExit = useCallback(() => {
    if (exitType === 'REFRESH') {
      window.location.reload();
    } else if (exitType === 'NAVIGATE') {
      window.history.go(-2);
    }
    setShowExitModal(false);
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
