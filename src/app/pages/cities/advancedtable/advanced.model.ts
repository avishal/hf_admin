// Table data
export interface Table {
    state_id: string;
    name: string;
    code: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
