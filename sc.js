var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

var range = (a, b) => {
    var a = parseInt(a)
    var b = parseInt(b)
    if (b < a) {
        return range(b, a)
    } else if (b == a) {
        return [a]
    } else {
        return [a].concat(range(a + 1, b))
    }
}

var table = (id, contents, headers) => {
    var acc = ""

    for (let row in contents) {
        acc += $("<div></div>")
            .css("grid-column-start", "1")
            .css("grid-column-end", (contents[row].length + 1).toString())
            .css("grid-row", (parseInt(row) + 1).toString())
            .addClass("row")
            .addClass("row" + (parseInt(row) + 1).toString())
            .prop('outerHTML')
    }


    var addCell = (i, j, c) => acc += ($("<div>" + c + "</div>")
        .css("grid-column", (parseInt(j) + 1).toString())
        .css("grid-row", (parseInt(i) + 1).toString())
        .addClass("lookupCell"))
        .prop('outerHTML')

    if (headers !== undefined) {
        for (let h in headers) {
            addCell(h, 0, headers[h])
        }
    }
    for (let row in contents) {
        for (let col in contents[row]) {
            addCell(row, col, contents[row][col])
        }
    }
    var t = $(id).html(acc)
}

var san = s =>
    s.toUpperCase().split("").map(
        c => c.replace(/[^A-Z]/g, "")).join("")

var rot = (string, n) =>
    string.split("").map(
        c => String.fromCharCode(65 + ((c.charCodeAt(0) - 65 + 26 + n) % 26))
    ).join("")

var repeat = (string, length) => {
    if (length < string.length) {
        return string.substring(0, length)
    } else {
        return string + repeat(string, length - string.length)
    }
}

var vignere = (key, text, forwards) => {
    var k = repeat(key, text.length)
    var e = ""
    var num = (s) => {
        if (forwards) {
            return s.charCodeAt(0) - 64
        } else {
            return 26 - (s.charCodeAt(0) - 64)
        }
    }

    for (let i = 0; i < text.length; i++) {
        e += rot(text[i], num(k.charAt(i)))
    }
    return e
}

var update = () => {
    var singleLetter = san(get("singleLetter"))
    var singleLetterRot = parseInt(get("singleLetterRot")) % 26
    set("singleLetterAfterRot", rot(singleLetter, singleLetterRot))
    set("rotPlainWithPunct", rot(singleLetter, singleLetterRot))


    var caesarPlain = san(get("caesarPlain"))
    set("caesarPlain", caesarPlain)
    var caesarRot = parseInt(get("caesarRot")) % 26
    set("caesarRot", caesarRot)
    set("caesarCypher", rot(caesarPlain, caesarRot))



    var caesarUndoRot = parseInt(get("caesarUndoRot"))
    set("caesarUndoRot", caesarUndoRot)
    set("caesarUndo", rot(caesarPlain, caesarRot - caesarUndoRot))

    var vignereKey1 = san(get("vignereEncode"))
    set("vignereEncode", vignereKey1)
    var vignerePlain = san("PARANOIDCAESAR")
    var vignereEncoded = vignere(vignereKey1, vignerePlain, true)

    table("#vignereTableEncode", [
        vignerePlain,
        repeat(vignereKey1, vignerePlain.length),
        vignereEncoded
    ])

    var vignereKey2 = san(get("vignereDecode"))
    set("vignereDecode", vignereKey2)

    table("#vignereTableDecode", [
        vignereEncoded,
        repeat(vignereKey2, vignerePlain.length),
        vignere(vignereKey2, vignereEncoded, false)
    ])
}

$(() => {
    $("input").change(update)
    table("#az126", [alpha, range(1, 26)])
    update()
})