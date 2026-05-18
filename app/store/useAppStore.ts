import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WizardData {
  title: string;
  description: string;
  date: string;
  time: string;
  rulesAccepted: boolean;
}

interface AppState {
  // Wizard State
  wizardStep: number;
  wizardData: WizardData;
  setWizardStep: (step: number) => void;
  updateWizardData: (field: keyof WizardData, value: string | boolean) => void;
  resetWizard: () => void;

  // Session Tab State
  activeSessionTab: string;
  setActiveSessionTab: (tab: string) => void;
}

const defaultWizardData: WizardData = {
  title: "",
  description: "",
  date: "",
  time: "",
  rulesAccepted: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      wizardStep: 1,
      wizardData: defaultWizardData,
      setWizardStep: (step) => set({ wizardStep: step }),
      updateWizardData: (field, value) =>
        set((state) => ({
          wizardData: { ...state.wizardData, [field]: value },
        })),
      resetWizard: () => set({ wizardStep: 1, wizardData: defaultWizardData }),

      activeSessionTab: "all",
      setActiveSessionTab: (tab) => set({ activeSessionTab: tab }),
    }),
    {
      name: "sohba-app-storage", // name of the item in the storage (must be unique)
      partialize: (state) => ({
        wizardStep: state.wizardStep,
        wizardData: state.wizardData,
      }), // only persist the wizard state
    }
  )
);
