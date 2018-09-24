var get = function (s) {
    return $(`input[name=${s}]`).val()
}

var set = function (s, v) {
    $(`input[name=${s}]`).val(v)
    $(`input[name=${s}_follow]`).val(v)
}
