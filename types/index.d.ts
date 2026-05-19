// =============================================================================
// API / Domain types
// =============================================================================

export interface MajlisCardProps {
  id: string | number;
  title: string;
  description: string;
  currentAttendees?: number;
  totalPlaces?: number;
  status?: "current" | "upcoming" | "past" | "ACTIVE" | "INACTIVE" | "ENDED" | string;
  className?: string;

  // Backend response fields
  environment?: {
    id: number;
    name: string;
  };
  scheduledAt?: string;
  maxUsers?: number;
  requireHandRaise?: boolean;
  muteOnEntry?: boolean;
  allowPublicChat?: boolean;
  isPrivate?: boolean;
  teacherCode?: string;
  accessLink?: string;
  attachments?: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WorldCardProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  coverImage: string;
}

// =============================================================================
// Store types
// =============================================================================

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress?: number;
  status: "uploading" | "completed" | "error";
  url?: string;
}

export interface WizardData {
  title: string;
  description: string;
  date: string;
  time: string;
  rulesAccepted: boolean;
  environmentId: number | null;
  files: UploadedFile[];
  visitorsLimit: number;
  raiseHand: boolean;
  muteOnEntry: boolean;
  allowChat: boolean;
  isPrivate: boolean;
}

export interface AppState {
  // Wizard State
  wizardStep: number;
  wizardData: WizardData;
  setWizardStep: (step: number) => void;
  updateWizardData: (field: keyof WizardData, value: any) => void;
  resetWizard: () => void;

  // Session Tab State
  activeSessionTab: string;
  setActiveSessionTab: (tab: string) => void;
}

// =============================================================================
// Auth types
// =============================================================================

export type LoginFormInputs = {
  username: string;
  password: string;
};

// =============================================================================
// Wizard / Session-form component prop types
// =============================================================================

export interface StepConfig {
  label: string;
  subtitle?: string;
  path: string;
  /** Steps without a card wrapper (e.g. date-picker, summary) */
  noCard?: boolean;
  /** Validation predicate receives current form data */
  validate?: (data: WizardData) => boolean;
}

export interface WizardHeaderProps {
  onClose: () => void;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export interface StepHeadingProps {
  label: string;
  subtitle?: string;
}

export interface WizardFooterProps {
  currentStep: number;
  isNextDisabled: boolean;
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
}

// =============================================================================
// Shared UI component prop types
// =============================================================================

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
}

export interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  dropdownHeightClass?: string;
}

export interface SummaryCardProps {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}
