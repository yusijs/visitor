import { Visit } from './visit';
import { Files } from './files';

export interface Visitor {
    company: string;
    name: string;
    confidentiality: boolean;
    _id: string;
    visits?: Visit[];
    attachments: {[fileType: string]: Files};
}