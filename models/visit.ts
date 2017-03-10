import { Keycard } from './keycard';
import { Badge } from './badge';
import { Visitor } from './visitor';

export interface Visit {
    _id: string;
    visitor: Visitor;
    date: Date;
    site: 'Vestby' | 'Tananger';
    comments: string;
    badge: Badge;
    keycard: Keycard
}