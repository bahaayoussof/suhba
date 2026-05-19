import { useState, useRef, useEffect } from "react";
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

export default function Step3Media() {
  const formData = useAppStore((state) => state.wizardData);
  const updateFormData = useAppStore((state) => state.updateWizardData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper to format file sizes to match mockup (e.g. 120K size)
  const formatSizeAndType = (file: File) => {
    const kb = file.size / 1024;
    let sizeStr = "";
    if (kb >= 1024) {
      sizeStr = `${(kb / 1024).toFixed(1)}MB size`;
    } else {
      sizeStr = `${Math.round(kb)}K size`;
    }
    const ext = file.name.split(".").pop()?.toUpperCase() || "";
    return { sizeStr, ext };
  };

  // Simulated upload progress effect
  useEffect(() => {
    const uploadingFiles = formData.files.filter(
      (f) => f.status === "uploading",
    );
    if (uploadingFiles.length === 0) return;

    const timer = setTimeout(() => {
      const updatedFiles = formData.files.map((f) => {
        if (f.status === "uploading") {
          const currentProgress = f.progress || 0;
          const nextProgress =
            currentProgress + Math.floor(Math.random() * 15) + 10;
          if (nextProgress >= 100) {
            return { ...f, progress: 100, status: "completed" as const };
          }
          return { ...f, progress: nextProgress };
        }
        return f;
      });
      updateFormData("files", updatedFiles);
    }, 450);

    return () => clearTimeout(timer);
  }, [formData.files, updateFormData]);

  const handleFiles = (fileList: FileList) => {
    setError(null);
    const newFiles = Array.from(fileList);

    // Limit check
    if (formData.files.length + newFiles.length > 4) {
      setError("يمكنك تحميل ما يصل إلى 4 ملفات كحد أقصى.");
      return;
    }

    // Size check (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024;
    const oversized = newFiles.filter((f) => f.size > MAX_SIZE);
    if (oversized.length > 0) {
      setError("يُسمح بملفات بحجم أقصى 10 ميجابايت.");
      return;
    }

    const processed = newFiles.map((file) => {
      const fileId = Math.random().toString(36).substring(2, 9);
      const { sizeStr, ext } = formatSizeAndType(file);
      // Strip extension from name for cleaner listing, like "Image 3" in mockup
      const dotIndex = file.name.lastIndexOf(".");
      const cleanName =
        dotIndex !== -1 ? file.name.substring(0, dotIndex) : file.name;
      return {
        id: fileId,
        name: cleanName,
        size: sizeStr,
        type: ext,
        progress: 0,
        status: "uploading" as const,
      };
    });

    updateFormData("files", [...formData.files, ...processed]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDelete = (id: string) => {
    const updated = formData.files.filter((f) => f.id !== id);
    updateFormData("files", updated);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        multiple
        accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        className="hidden"
      />

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onClick={triggerFileInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-[var(--slate-200)] hover:border-[var(--deep-teal-700)] rounded-2xl py-12 px-6 flex flex-col items-center justify-center text-center bg-[#fafcfc] hover:bg-[#f8fafa] cursor-pointer transition-all duration-200"
      >
        <div className="w-12 h-12 rounded-[10px] border border-[var(--deep-teal-900)] flex items-center justify-center text-[var(--deep-teal-900)] mb-4 bg-white shadow-sm">
          <Upload className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-[var(--slate-600)] mb-1">
          اسحب ملفاتك أو{" "}
          <span className="text-[var(--deep-teal-900)] underline font-bold">
            تصفح
          </span>
        </p>
        <p className="text-xs text-[var(--slate-400)]">
          يُسمح بملفات بحجم أقصى 10 ميجابايت
        </p>
      </div>

      {/* Uploaded Files Section */}
      {formData.files.length > 0 && (
        <div className="bg-[#fafcfc] border border-[var(--slate-100)] rounded-2xl p-6 shadow-sm space-y-4">
          {/* Section Header */}
          <div className="flex items-center gap-2 justify-start">
            <div className="w-8 h-8 rounded-lg bg-[var(--deep-teal-900)] flex items-center justify-center text-white">
              <ImageIcon className="w-4 h-4" />
            </div>
            <h3 className="text-md font-bold text-[var(--deep-teal-900)]">
              الوسائط
            </h3>
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.files.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-[var(--slate-100)] rounded-[12px] p-3 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-all hover:border-[var(--slate-200)]"
                dir="ltr"
              >
                {/* Left: Icon & Text Details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#f8fafa] flex items-center justify-center text-[var(--slate-400)] flex-shrink-0">
                    {file.type === "JPG" || file.type === "PNG" || file.type === "JPEG" ? (
                      <ImageIcon className="w-5 h-5 text-[var(--slate-400)]" />
                    ) : (
                      <FileText className="w-5 h-5 text-[var(--slate-400)]" />
                    )}
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="font-bold text-sm text-[var(--deep-teal-900)] block truncate max-w-[140px] md:max-w-[200px]" title={file.name}>
                      {file.name}
                    </span>
                    <span className="text-[10px] text-[var(--slate-400)] font-medium truncate">
                      {file.size}{file.type ? ` - ${file.type}` : ""}
                    </span>
                  </div>
                </div>

                {/* Right: Progress & Delete Button */}
                <div className="flex items-center gap-4">
                  {file.status === "uploading" && (
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[var(--deep-teal-900)] h-full transition-all duration-300"
                          style={{ width: `${file.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[var(--slate-500)] whitespace-nowrap">
                        {file.progress || 0}%
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="text-[var(--deep-teal-900)] cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
