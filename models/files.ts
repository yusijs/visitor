export interface Files {
    type: 'confidentiality' | 'recording' | 'approved';
    filename: string;
    dateSigned: Date;
}