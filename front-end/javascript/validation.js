const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString)

const orderid = urlParams.get('orderid')
const valeur = urlParams.get('prixtotal')



function validation(){

    var prixTotal = document.querySelector("#prixTotal")
    prixTotal.innerHTML = "le prix total : " + valeur + " €"

    var idCommande = document.querySelector("#idCommande")
    idCommande.innerHTML = "identitifiant de votre commande : " + orderid

}

validation()