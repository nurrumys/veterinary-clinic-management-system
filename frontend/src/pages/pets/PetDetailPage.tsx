import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import PetInfoCard from "../../components/pets/PetInfoCard";
import PetWeightHistory from "../../components/pets/PetWeightHistory";
import PetVisitHistory from "../../components/pets/PetVisitHistory";
import PetVaccinationHistory from "../../components/pets/PetVaccinationHistory";

import { getPetById } from "../../services/petService";

import type { Pet } from "../../types/pet";

function PetDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPet = async () => {
      try {
        setLoading(true);

        const petData = await getPetById(Number(id));

        setPet(petData);
      } catch (error) {
        console.error(
          "Failed to load pet:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  return (
    <DashboardLayout>
      <PageContainer>
        {loading ? (
          <p className="text-slate-500">
            Loading...
          </p>
        ) : !pet ? (
          <p className="text-slate-500">
            Pet not found.
          </p>
        ) : (
          <>
            <h1
              className="
                mb-6
                text-3xl
                font-bold
                text-slate-900
              "
            >
              {pet.name}
            </h1>

            <div className="space-y-6">
              <PetInfoCard pet={pet} />

              <PetWeightHistory
                petId={pet.id}
              />

              <PetVisitHistory
                petId={pet.id}
              />

              <PetVaccinationHistory
                petId={pet.id}
              />
            </div>
          </>
        )}
      </PageContainer>
    </DashboardLayout>
  );
}

export default PetDetailPage;