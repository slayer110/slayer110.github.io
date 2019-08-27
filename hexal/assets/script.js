document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var linksForNetwork = document.querySelectorAll('.icons div')
    linksForNetwork = Array.prototype.slice.call(linksForNetwork);
    linksForNetwork.forEach(function (item, index) {

        item.addEventListener('mouseover', function () {
            item.style.backgroundColor="#6dcbbd";

        });
        item.addEventListener('mouseout', function () {
            item.style.backgroundColor="#a4dbd5";

        })
    });
    var linksForContacts = document.querySelectorAll('.contacts li a');
    console.log(linksForContacts);
    linksForContacts = Array.prototype.slice.call(linksForContacts);
    linksForContacts.forEach(function (item, index) {

        item.addEventListener('mouseover', function () {
            item.style.zoom='1.1';

        });
        item.addEventListener('mouseout', function () {
            item.style.zoom='1';

        })
    })
}

