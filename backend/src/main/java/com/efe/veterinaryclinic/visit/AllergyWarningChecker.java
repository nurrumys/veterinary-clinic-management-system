package com.efe.veterinaryclinic.visit;

import java.util.Arrays;
import java.util.List;

public final class AllergyWarningChecker {

    private AllergyWarningChecker() {
    }

    public static List<String> check(String treatmentNotes, String petAllergies) {
        if (treatmentNotes == null || treatmentNotes.isBlank() || petAllergies == null || petAllergies.isBlank()) {
            return List.of();
        }

        String notesLower = treatmentNotes.toLowerCase();

        return Arrays.stream(petAllergies.split("[,;]"))
                .map(String::trim)
                .filter(allergen -> !allergen.isEmpty())
                .filter(allergen -> notesLower.contains(allergen.toLowerCase()))
                .map(allergen -> "Pet is recorded as allergic to " + allergen)
                .toList();
    }
}
