import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppState, WizardData } from "../../types";

const defaultWizardData: WizardData = {
  title: "",
  description: "",
  date: "",
  time: "",
  rulesAccepted: false,
  environmentId: null,
  files: [],
  visitorsLimit: 25,
  raiseHand: true,
  muteOnEntry: true,
  allowChat: true,
  isPrivate: true,
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
      resetWizard: () =>
        set((state) => {
          if (typeof window !== "undefined") {
            state.wizardData.files.forEach((file) => {
              if (file.url && file.url.startsWith("blob:")) {
                try {
                  URL.revokeObjectURL(file.url);
                } catch (e) {
                  console.warn("Failed to revoke URL:", e);
                }
              }
            });
          }
          return { wizardStep: 1, wizardData: defaultWizardData };
        }),

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
