import { useEffect, useId, useRef, useState } from 'react';
import { Button } from './components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const ApplicationFormModal = ({
  isOpen,
  onClose,
  triggerRef,
}: ApplicationFormModalProps) => {
  const nameId = useId();
  const emailId = useId();
  const experienceId = useId();
  const githubId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    github: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 모달이 열릴 때 제목에 포커스, 닫힐 때 트리거 버튼에 포커스
  useEffect(() => {
    if (isOpen && titleRef.current) {
      // 모달이 열릴 때 제목에 포커스
      titleRef.current.focus();
    } else if (!isOpen && triggerRef?.current) {
      // 모달이 닫힐 때 트리거 버튼에 포커스
      triggerRef.current.focus();
    }
  }, [isOpen, triggerRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('신청서 제출:', formData);
      alert('신청서가 성공적으로 제출되었습니다!');

      // 폼 데이터 초기화
      setFormData({
        name: '',
        email: '',
        experience: '',
        github: '',
      });

      onClose();
    } catch (error) {
      console.error('제출 오류:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle ref={titleRef} tabIndex={-1}>
            신청 폼
          </DialogTitle>
          <DialogDescription>
            이메일과 FE 경력 연차 등 간단한 정보를 입력해 주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor={nameId} className="text-sm font-medium">
              이름 / 닉네임
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="이름 또는 닉네임을 입력하세요"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={emailId} className="text-sm font-medium">
              이메일
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="이메일을 입력하세요"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={experienceId} className="text-sm font-medium">
              FE 경력 연차
            </label>
            <select
              id={experienceId}
              name="experience"
              required
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="">경력을 선택하세요</option>
              <option value="0-3">0~3년</option>
              <option value="4-7">4~7년</option>
              <option value="8+">8년 이상</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor={githubId} className="text-sm font-medium">
              Github 링크 (선택)
            </label>
            <input
              id={githubId}
              name="github"
              type="url"
              value={formData.github}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Github 링크를 입력하세요 (선택사항)"
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '제출 중...' : '제출하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationFormModal;
