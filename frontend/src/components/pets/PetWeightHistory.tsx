import { useEffect, useState } from "react";

import { getPetWeightRecords } from "../../services/petService";

import type { PetWeightRecord } from "../../types/petWeightRecord";

type PetWeightHistoryProps = {
  petId: number;
};

function PetWeightHistory({
  petId,
}: PetWeightHistoryProps) {
  const [records, setRecords] = useState<
    PetWeightRecord[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeights = async () => {
      try {
        setLoading(true);

        const data =
          await getPetWeightRecords(petId);

        setRecords(data);
      } catch (error) {
        console.error(
          "Failed to load weight history:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeights();
  }, [petId]);

  return (
    <div
      className="
        mt-6
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >
          Weight History
        </h2>
      </div>

      {loading ? (
        <p className="text-slate-500">
          Loading...
        </p>
      ) : records.length === 0 ? (
        <p className="text-slate-500">
          No weight records found.
        </p>
      ) : (
        <div className="space-y-4">
          {records.map(
            (record, index) => (
              <div
                key={record.id}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-slate-200
                  p-5
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <p
                      className="
                        text-xl
                        font-semibold
                        text-slate-900
                      "
                    >
                      {record.weightKg} kg
                    </p>

                    {index ===
                      records.length - 1 && (
                      <span
                        className="
                          rounded-full
                          bg-emerald-100
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-emerald-700
                        "
                      >
                        Latest
                      </span>
                    )}
                  </div>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    {new Date(
                      record.recordedAt
                    ).toLocaleString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>

                <p
                  className="
                    max-w-xs
                    text-right
                    text-sm
                    text-slate-500
                  "
                >
                  {record.note || "-"}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default PetWeightHistory;