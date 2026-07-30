package com.efe.veterinaryclinic.search;

import com.efe.veterinaryclinic.search.dto.SearchResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
@Tag(name = "Search", description = "Global search across owners, pets, and visits")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    @Operation(summary = "Global search", description = "ADMIN, VET, RECEPTIONIST. Searches owners, pets, and visits "
            + "by a single query string (owner first/last name, pet name, visit pet name/chief complaint); returns "
            + "up to 5 matches per type. A missing or blank q returns empty results, not an error.")
    public ResponseEntity<SearchResponse> search(@RequestParam(required = false) String q) {
        return ResponseEntity.ok(searchService.search(q));
    }
}
