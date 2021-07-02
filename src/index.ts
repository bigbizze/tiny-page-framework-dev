type Option<T> = T | null;

interface Style {
    [prop: string]: string
}

type Row = {
    columns: Column[],
    style?: Option<Style>
    class?: Option<string>
}

type Column = {
    rows: ColumnRow[]
    style?: Option<Style>
    class?: Option<string>
}

type ColumnRow = {
    content: string
    style?: Option<Style>
    class?: Option<string>
}

export const column_row = (content: string, style?: Style, item_class?: string): ColumnRow => (
    {
        content: content,
        style: style ? style : null,
        class: item_class ? item_class : null
    }
);

export const column = (rows: ColumnRow | ColumnRow[], style?: Style, item_class?: string): Column => (
    {
        rows: Array.isArray(rows) ? [...rows] : [rows],
        style: style ? style : null,
        class: item_class ? item_class : null
    }
);

export const row = (columns: Column | Column[], style?: Style, item_class?: string): Row => (
    {
        columns: Array.isArray(columns) ? [...columns] : [columns],
        style: style ? style : null,
        class: item_class ? item_class : null
    }
);

const set_style = (style: Style, element: HTMLElement) => {
    for (let k in style) {
        // https://github.com/Microsoft/TypeScript/issues/17827
        (<any>element.style)[k] = style[k];
    }
}

export const build_page = (
    _rows: Row[] | Row,
    main_div_id: string,
    default_row_class: string,
    default_column_class: string,
    default_column_row_class: string
) => () => {
    const rows = Array.isArray(_rows) ? _rows : [_rows];
    const main_container = document.getElementById(main_div_id);

    if (!main_container) throw new Error(`No element with main div id supplied exists in DOM.`);

    for (let row of rows) {
        const new_row = document.createElement('div');
        new_row.className = row.class ? row.class : default_row_class;
        if (row.style) {
            set_style(row.style, new_row);
        }
        main_container.appendChild(new_row);
        for (let column of row.columns) {
            const new_column = document.createElement('div');
            new_column.className = column.class ? column.class : default_column_class;
            if (column.style) {
                set_style(column.style, new_column)
            }
            new_row.appendChild(new_column);
            for (let columnrow of column.rows) {
                const new_column_row = document.createElement('div');
                new_column_row.className = columnrow.class ? columnrow.class : default_column_row_class;
                if (columnrow.style) {
                    set_style(columnrow.style, new_column_row);
                }
                new_column_row.innerHTML = columnrow.content;
                new_column.appendChild(new_column_row);
            }
        }
    }
};