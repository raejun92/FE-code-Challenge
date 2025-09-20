import { useRef, useState } from 'react';
import ApplicationFormModal from './ApplicationFormModal';
import { Button } from './components/ui/button';

const ModalFormPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <Button ref={triggerButtonRef} onClick={() => setIsModalOpen(true)}>
          신청 폼 작성하기
        </Button>

        <ApplicationFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          triggerRef={triggerButtonRef}
        />
      </div>
    </div>
  );
};

export default ModalFormPage;
