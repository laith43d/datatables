import type { Field, TableHandler, SortParams } from '..';
import type { UUID } from 'crypto';
export default class SortHandler<Row> {
    private backup;
    private table;
    constructor(table: TableHandler<Row>);
    set(field: Field<Row>, uuid: UUID, params?: SortParams): void;
    asc(field: Field<Row>, uuid: UUID, { locales, options }?: SortParams): void;
    desc(field: Field<Row>, uuid: UUID, { locales, options }?: SortParams): void;
    clear(): void;
    restore(): void;
    private save;
}
