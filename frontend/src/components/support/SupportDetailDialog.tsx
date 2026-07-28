import Modal from "../ui/Modal";
import StatusBadge from "./StatusBadge";

import type { SupportRequest } from "../../types/support";

type SupportDetailDialogProps = {
  support: SupportRequest | null;
  open: boolean;
  onClose: () => void;
};

function SupportDetailDialog({
  support,
  open,
  onClose,
}: SupportDetailDialogProps) {
  if (!support) return null;

  return (
    <Modal
      open={open}
      title="Support Request"
      onClose={onClose}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-slate-500">
            Subject
          </h3>

          <p className="mt-1 text-base font-semibold text-slate-900">
            {support.subject}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-500">
            Requested By
          </h3>

          <p className="mt-1 text-base text-slate-700">
            {support.requestedByName}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-500">
            Status
          </h3>

          <div className="mt-2">
            <StatusBadge status={support.status} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-500">
            Message
          </h3>

          <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {support.message}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-500">
            Admin Response
          </h3>

          <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {support.adminResponse ? (
              support.adminResponse
            ) : (
              <span className="italic text-slate-400">
                No response yet.
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-slate-200 pt-4">
          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Created
            </h3>

            <p className="mt-1 text-sm text-slate-700">
              {new Date(support.createdAt).toLocaleString(
                "en-GB"
              )}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Updated
            </h3>

            <p className="mt-1 text-sm text-slate-700">
              {new Date(support.updatedAt).toLocaleString(
                "en-GB"
              )}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SupportDetailDialog;