import type { Field, Check, TableHandler } from '..';
import type { UUID } from 'crypto';
export default class FilterHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    set(value: unknown, field: Field<Row>, check: Check, uuid: UUID): void;
    unset(id: UUID): void;
}
