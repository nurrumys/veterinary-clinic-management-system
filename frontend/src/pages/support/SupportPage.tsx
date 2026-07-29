import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import SupportStats from "../../components/support/SupportStats";
import SupportToolbar from "../../components/support/SupportToolbar";
import SupportTable from "../../components/support/SupportTable";
import SupportForm from "../../components/support/SupportForm";
import SupportDetailDialog from "../../components/support/SupportDetailDialog";

import Modal from "../../components/ui/Modal";

import {
  getSupportRequests,
  createSupportRequest,
} from "../../services/supportService";

import type {
  SupportRequest,
  CreateSupportRequest,
  SupportRequestStatus,
} from "../../types/support";
function SupportPage() {
    const [requests, setRequests] =
  useState<SupportRequest[]>([]);

const [loading, setLoading] =
  useState(true);

const [error, setError] =
  useState("");

const [isModalOpen, setIsModalOpen] =
  useState(false);

const [selectedRequest, setSelectedRequest] =
  useState<SupportRequest | null>(null);

const [statusFilter, setStatusFilter] =
  useState<SupportRequestStatus | undefined>();

const [page, setPage] =
  useState(0);

const [size] =
  useState(20);

const [totalPages, setTotalPages] =
  useState(0);
  const fetchSupportRequests = async () => {

  try {

    setLoading(true);

    setError("");

    const data =
      await getSupportRequests({

        page,

        size,

        status:
          statusFilter || undefined,

      });

    setRequests(data.content);

    setTotalPages(data.totalPages);

  } catch (error) {

    console.error(error);

    setError(
      "Failed to load support requests."
    );

  } finally {

    setLoading(false);

  }

};
useEffect(() => {

  fetchSupportRequests();

}, [

  page,

  size,

  statusFilter,

]);
const handleAdd = () => {

  setIsModalOpen(true);

};
const handleView = (
  request: SupportRequest
) => {

  setSelectedRequest(request);

};
const handleSubmit = async (
  values: CreateSupportRequest
) => {
  try {
    await createSupportRequest(values);

    await fetchSupportRequests();

    setIsModalOpen(false);

  } catch (error) {

    console.error(
      "Create support request error:",
      error
    );

    setError("Failed to create support request.");
  }
};


const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedRequest(null);
};
const handleStatusFilter = (
  value: SupportRequestStatus | ""
) => {

  setStatusFilter(
    value || undefined
  );

  setPage(0);

};
return (

  <DashboardLayout>

    <div className="space-y-8">

      <div>

        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Support Requests
        </h1>

        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Create and track your support requests.
        </p>

      </div>

      <SupportStats
  supports={requests}
/>

      {loading && (

        <div className="text-slate-500">

          Loading support requests...

        </div>

      )}

      {error && (

        <div className="text-red-500">

          {error}

        </div>

      )}

      <SupportToolbar
  onAdd={handleAdd}
  onStatusChange={handleStatusFilter}
/>

      {!loading && !error && (

        <>
          <SupportTable
  supports={requests}
  onView={handleView}
/>
                    {totalPages > 1 && (

            <div className="mt-6 flex items-center justify-between">

              <button
                type="button"
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
                disabled={page === 0}
                className="
                  rounded-lg
                  border
                  px-4
                  py-2
                  disabled:opacity-50
                "
              >
                Previous
              </button>

              <span className="text-sm text-slate-600">

                Page {page + 1} of {totalPages}

              </span>

              <button
                type="button"
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
                disabled={page + 1 >= totalPages}
                className="
                  rounded-lg
                  border
                  px-4
                  py-2
                  disabled:opacity-50
                "
              >
                Next
              </button>

            </div>

          )}

        </>

      )}
            <Modal
        open={isModalOpen}
        title="New Support Request"
        onClose={handleCloseModal}
      >

        <SupportForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />

      </Modal>

      <SupportDetailDialog
  open={!!selectedRequest}
  support={selectedRequest}
  onClose={() =>
    setSelectedRequest(null)
  }
/>
    </div>

  </DashboardLayout>

);

}

export default SupportPage;