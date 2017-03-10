import { Visit } from './visit';
import { Files } from './files';

export interface Visitor {
    company: string;
    name: string;
    confidentiality: boolean;
    attachments: Files[];
}