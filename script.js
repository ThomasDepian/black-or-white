
function strToBool(s) {
    regex=/^\s*(true|1|on)\s*$/i

    return regex.test(s);
}

function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

function fillCaseInfo() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    const caseNr = params.case || "?";
    const lastCase = params.last;

    document.getElementById("case-placeholder").innerText = caseNr;

    if (lastCase && strToBool(lastCase)) {
        document.getElementById("button-next-case").style.display = "none";
    } else {
        if (isNumeric(caseNr)) {
            document.getElementById("link-next-case").setAttribute("href", `/cases/case-${(+caseNr) + 1}.html`);
        } else {
            document.getElementById("link-next-case").setAttribute("href", '/index.html');
        }
        
    }
}