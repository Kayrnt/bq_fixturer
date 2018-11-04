import nameAsAlias from "./bq_reserved_words"

function wrapWith(dataPart) {
    return `WITH fixture AS (SELECT ${dataPart})`;
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isObject(obj) {
    return obj === Object(obj);
}

function escapeChar(str) {
    //replace ' before \ so it won't replace the \ from \'
    return str.replace("\\", "\\\\").replace("'", "\\\'")
}

function elementToField(key, value, useAlias) {
    if (typeof value === 'string') {
        value = "'" + escapeChar(value) + "'"
    } else if (value === null) {
        value = "null"
    } else if (Array.isArray(value)) {
        const [headValue, ...tail] = value;
        const headItem = elementToField("", headValue, useAlias);
        const tailItems = tail.map(v => {
            return elementToField("", v, false)
        });
        let items = [headItem].concat(tailItems);
        value = "[" + items.join(",") + "]"
    } else if (isObject(value)) {
        value = "STRUCT(" + rowToField(value, useAlias) + ")"
    }
    return useAlias === true && key !== "" ? value + " AS " + nameAsAlias(key) : value;
}

function rowToField(jsonElement, useAlias) {
    return Object.keys(jsonElement).map(key => {
        return elementToField(key, jsonElement[key], useAlias);
    });
}

function singleFixture(parsedJson) {
    const data = rowToField(parsedJson, true).join(",");
    return wrapWith(data);
}

function multipleFixtures(parsedJson) {
    const [head, ...tail] = parsedJson;
    const headItem = rowToField(head, true).join(",");
    const tailItems = tail.map(e => {
        return rowToField(e, false).join(",")
    });
    let items = [headItem].concat(tailItems);
    const data = items.map(i => {
        return `STRUCT(${i})`;
    }).join(",");
    return wrapWith(`* FROM UNNEST([${data}])`);
}

function toBQFixtures(inputJsonString) {
    if(inputJsonString === '') return '';
    if (isJsonString(inputJsonString)) {
        const parsedJson = JSON.parse(inputJsonString);
        return Array.isArray(parsedJson) ?
            (parsedJson.length !== 1 ?
                multipleFixtures(parsedJson) :
                singleFixture(parsedJson[0])) :
            singleFixture(parsedJson);
    }
    else {
        return "Invalid JSON";
    }
}

export default toBQFixtures;