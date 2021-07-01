
type Option<T> = T | null;

export type Row = {
    columns: Column[],
    style?: Option<string>
    class?: Option<string>
}

export type Column = {
    rows: ColumnRow[]
    style?: Option<string>
    class?: Option<string>
}

export type ColumnRow = {
    content: string
    style?: Option<string>
    class?: Option<string>
}
