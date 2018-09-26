
var newValues = function () {
    var primes = [101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199]

    var n = primes[Math.floor(Math.random() * primes.length)]
    var g = Math.floor(2 + (n - 3) * Math.random())
    var b = Math.floor(2 + (n - 3) * Math.random())
    var B = powN(g, b)
    set("n", n)
    set("g", g)
    set("b", b)
    set("gbn", B)
    set("B", B)
    set("y", g)
    set("z", n + 2)
    set("x", 2)
    updateChanged()
}

var invalid = function (s) {
    return (s == "" || parseInt(s) == NaN || parseFloat(s) != parseInt(s))
}

var verify = function () {


    var n = get("n")
    if (invalid(n)) {
        mark("n", 0)
    } else {
        n = parseInt(n)
    }



    var a = get("a")
    if (invalid(a)) {
        mark("a", -1)
    } else {
        a = parseInt(a)
        if (a == a % n) {
            mark("a", 1)
        } else {
            mark("a", 0)
        }
    }

    var g = get("g")
    if (invalid(g)) {
        mark("g", 0)
    }


    var gan = get("gan")
    if (invalid(gan)) {
        mark("gan", -1)
    } else {
        gan = parseInt(gan)
        if (gan == powN(g, a)) {
            mark("gan", 1)
        } else {
            mark("gan", 0)
        }
    }

    var A = get("A")
    if (invalid(A)) {
        mark("A", -1)
    } else {
        A = parseInt(A)
        if (A == gan) {
            mark("A", 1)
        } else {
            mark("A", 0)
        }
    }

    var Ba = get("Ba")
    if (invalid(Ba)) {
        mark("Ba", -1)
    } else {
        Ba = parseInt(Ba)
        if (Ba == powN(parseInt(get("B")), a)) {
            mark("Ba", 1)
        } else {
            mark("Ba", 0)
        }
    }
}

var mark = function (n, t) {
    //console.log(n + ": " + t)
    var response = ""
    if (t == 1) {
        response = " ✔"
    }
    if (t == 0) {
        response = " ✘"
    }
    $(`#${n}`).text(response)
}


var wipe = function (n) {
    if (n < 2) {
        $("input[name=g]").val("")
        $("input[name=n]").val("")
    }
    if (n < 3) {
        $("input[name=a]").val("")
        $("input[name=b]").val("")
    }
    if (n < 4) {
        $("input[name=gan]").val("")
        $("input[name=A]").val("")
        $("input[name=gbn]").val("")
        $("input[name=B]").val("")
    }
    if (n < 4) {
        $("input[name=Ba]").val("")
        $("input[name=Ab]").val("")
    }
}

var powN = function (a, b) {
    if (b > 1) {
        return (a * (powN(a, b - 1) % get("n"))) % get("n")
    } else {
        return a
    }
}

var updateChanged = function () {
    var san = function (n) {
        if (invalid(n)) { return "" } else { return n }
    }

    var n = get("n")
    set("follower_n", n)
    var g = get("g")
    var b = get("b") % n
    var A = get("A")
    set("b", b)
    var B = powN(g, b)
    set("gbn", B)
    set("B", B)

    var yx = powN(get("y"), get("x")) % n

    set("yx", san(yx))
    set("zn", san(get("z") % n))
    set("Ab", san(powN(A, b)))
    verify()
}

$(function () {
    $("input").change(updateChanged)
    $("input").keyup(updateChanged)
    $("#refresh").click(newValues)
    newValues()
})