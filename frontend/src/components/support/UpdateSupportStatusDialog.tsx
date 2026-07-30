import { useEffect, useState } from "react";

import Modal from "../ui/Modal";

import type { SupportRequestStatus } from "../../types/support";

type UpdateSupportStatusDialogProps = {
  open: boolean;
  initialStatus: SupportRequestStatus;
  initialAdminResponse?: string | null;
  isLoading: boolean;
  onSubmit: (values: {
    status: SupportRequestStatus;
    adminResponse: string;
  }) => void;
  onCancel: () => void;
};

function UpdateSupportStatusDialog({
  open,
  initialStatus,
  initialAdminResponse,
  isLoading,
  onSubmit,
  onCancel,
}: UpdateSupportStatusDialogProps) {
  const [status, setStatus] =
    useState<SupportRequestStatus>(initialStatus);

  const [adminResponse, setAdminResponse] =
    useState(initialAdminResponse ?? "");

  useEffect(() => {
    if (open) {
      setStatus(initialStatus);
      setAdminResponse(initialAdminResponse ?? "");
    }
  }, [
    open,
    initialStatus,
    initialAdminResponse,
  ]);

  const handleSubmit = () => {
    onSubmit({
      status,
      adminResponse,
    });
  };

  return (
    <Modal
      open={open}
      title="Update Support Status"
      onClose={onCancel}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as SupportRequestStatus
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">
              In Progress
            </option>
            <option value="RESOLVED">
              Resolved
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Admin Response
          </label>

          <textarea
            rows={4}
            value={adminResponse}
            onChange={(e) =>
              setAdminResponse(e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Write your response..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateSupportStatusDialog;