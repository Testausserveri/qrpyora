export function slug(string) {
    return string.toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'')
    ;
}