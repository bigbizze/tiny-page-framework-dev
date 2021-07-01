import {Column, ColumnRow, Row} from "./types";

export const column_row = (content: string, style?: string, item_class?: string): ColumnRow => (
    {
        content: content,
        style: style ? style : null,
        class: item_class ? item_class : null
    }
);

export const column = (rows: ColumnRow | ColumnRow[], style?: string, item_class?: string): Column => (
    {
        rows: Array.isArray(rows) ? [...rows] : [rows],
        style: style ? style : null,
        class: item_class ? item_class : null
    }
);

export const row = (columns: Column | Column[], style?: string, item_class?: string): Row => (
    {
        columns: Array.isArray(columns) ? [...columns] : [columns],
        style: style ? style : null,
        class: item_class ? item_class : null
    }
);

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
        main_container.innerHTML += `<div class = "${row.class ? row.class : default_row_class}" style = "${row.style ? row.style : ''}">`;
        for (let column of row.columns) {
            main_container.innerHTML += `<div class = "${column.class ? column.class : default_column_class}" style = "${column.style ? column.style : ''}">`;
            for (let columnrow of column.rows) {
                main_container.innerHTML += `<div class = "${columnrow.class ? columnrow.class : default_column_row_class}" style = "${columnrow.style ? columnrow.style : ''}">`
                main_container.innerHTML += columnrow.content;
                main_container.innerHTML += `</div>`
            }
            main_container.innerHTML += `</div>`;
        }
        main_container.innerHTML += `</div>`;
    }
};