// $(function(){
//     $('body').append("yo")
// })
var $ = require('./jquery-2.2.4.min.js');
function load() {
    $('ul').html("");
    $.get("https://raw.githubusercontent.com/electron/electron.atom.io/gh-pages/_data/apps.yml", function(body) {
    jsyaml.load(body).reverse().forEach(function(val) {
        if(val.icon) {
            $('ul').append(`
            <li class="collection-item avatar">
                <img src="https://raw.githubusercontent.com/electron/electron.atom.io/gh-pages/images/apps/${val.icon}" alt="" class="circle" style="border-radius:0">
                <a class="title" href="${val.website}" data-name="${encodeURIComponent(val.name.toLowerCase())}">${val.name}</a>
                <p data-description="${encodeURIComponent(val.description.toLowerCase())}">
                    ${val.description}
                </p>
            </li>
            `);
        }
    })
})
}

load();
$(document).on('click', 'a:not(#refresh)', function(e){
    e.preventDefault()
    require('electron').shell.openExternal($(this).attr('href'));
})
window.onfocus = function() {
    $("input").val("").trigger('input').blur();
    load();
};
$(document).on('input', 'input', function () {
    var $this = $(this);
    var $val = $this.val().toLowerCase();
    var $titleSearch = encodeURIComponent($val);
    if ($val !== "") {
        $('li').hide();
        $(`li:has(a[data-name*="${$titleSearch}"])`).show();
        $(`li:has(p[data-description*="${$titleSearch}"])`).show();
    } else {
        $('li').show();
    }
})
$('#close').on('click', function () {
    $("input").val("").trigger('input');
})
$('#quit').on('click', function () {
    require('electron').remote.app.quit();
})