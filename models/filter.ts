export interface Filter {
    visitor: {
        name: string;
        company: string;
    };
    status: 'expired' | 'active' | 'all';
    visitDate: {
        comparator: '>=' | '<=';
        date: string;
    };
    site: string;
    badge: {
        badge: number;
        returned: boolean;
        noEscort: boolean;
    };
    keycard: {
        keycard: number;
        returned: boolean;
    };
}