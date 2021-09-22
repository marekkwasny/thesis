//Funkcja logująca w terminalu wysłane zapytania do warstwy danych.
export function logToConsole(query) {
    console.log('\x1b[36m%s\x1b[0m', '[' + query.name + ']: ' + query.text);
}
