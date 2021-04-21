var recupitulatif = document.getElementById("Recupitulatif")
let local = JSON.parse(localStorage.getItem("panier"));



var inputNom = document.getElementById("inputNom")
var inputPrenom = document.getElementById("inputPrenom")
var inputEmail = document.getElementById("inputEmail")
var inputAdresse = document.getElementById("inputAdresse")
var inputVille = document.getElementById("inputVille")

var erreurNom = document.getElementById("erreurNom")
var erreurPrenom = document.getElementById("erreurPrenom")
var erreurEmail = document.getElementById("erreurEmail")
var erreurAdresse = document.getElementById("erreurAdresse")
var erreurVille = document.getElementById("erreurVille")


var form = document.getElementById("form")
var panier = document.getElementById("panier")



function afficherLesArticle(){

    if (local === null){
        var paraVide = document.createElement("p")
        var contenueVide = document.createTextNode("votre Panier est actuellement vide")
        paraVide.appendChild(contenueVide)
        recupitulatif.appendChild(paraVide)
        panier.removeChild(form)
            
    } else {

        // Tableau
        var tableau = document.createElement("table")

        // ligne legende
        var legende = document.createElement("tr")

        // Colonne image
        var image0 = document.createElement("th")
        var contenueImage0 = document.createTextNode("Images")
        image0.appendChild(contenueImage0)

        // Colonne nom
        var nom0 = document.createElement("th")
        var contenueNom0 = document.createTextNode("Nom")
        nom0.appendChild(contenueNom0)

        // Colonne couleur
        var couleur0 = document.createElement("th")
        var contenueCouleur0 = document.createTextNode("Couleur")
        couleur0.appendChild(contenueCouleur0)

        // Colonne prix
        var prix0 = document.createElement("th")
        var contenuePrix0 = document.createTextNode("Prix")
        prix0.appendChild(contenuePrix0)

        // Colonne quantite
        var quantite0 = document.createElement("th")
        var contenueQuantite0 = document.createTextNode("Quantité")
        quantite0.appendChild(contenueQuantite0)



        legende.appendChild(image0)
        legende.appendChild(nom0)
        legende.appendChild(couleur0)
        legende.appendChild(prix0)
        legende.appendChild(quantite0)


        tableau.appendChild(legende)


        let prixTotal = 0        

        for (let produit of local){

            // ligne
            var ligne = document.createElement("tr")

            // afficher image dans le tableau
            var image1 = document.createElement("th")
            var paraImage = document.createElement("img")
            paraImage.setAttribute("src", produit.image)
            image1.appendChild(paraImage)
            ligne.appendChild(image1)

            // afficher nom dans le tableau
            var nom1 = document.createElement("th")
            var paraNom = document.createElement("p")
            var contenueNom = document.createTextNode(produit.name)
            paraNom.appendChild(contenueNom)
            nom1.appendChild(paraNom)
            ligne.appendChild(nom1)

            // afficher couleur dans le tableau
            var couleur1 = document.createElement("th")
            var paraCouleur = document.createElement("p")
            var contenueCouleur = document.createTextNode(produit.color)
            paraCouleur.appendChild(contenueCouleur)
            couleur1.appendChild(paraCouleur)
            ligne.appendChild(couleur1)

            // afficher prix dans le tableau
            var prix1 = document.createElement("th")
            var paraPrix = document.createElement("p")
            var contenuePrix = document.createTextNode(produit.price)
            paraPrix.appendChild(contenuePrix)
            prix1.appendChild(paraPrix)
            ligne.appendChild(prix1)

            // afficher quantite dans le tableau
            var quantite1 = document.createElement("th")
            var paraQuantite = document.createElement("p")
            var contenueQuantite = document.createTextNode(produit.total)
            paraQuantite.appendChild(contenueQuantite)
            quantite1.appendChild(paraQuantite)
            ligne.appendChild(quantite1)

            // deduire la quantite
            var deduire = document.createElement("th")
            var btnDeduire = document.createElement("button")
            var contenueDeduire = document.createTextNode("-")
            btnDeduire.addEventListener("click", function(){
                if (produit.total > 1){
                    produit.total = produit.total - 1
                    localStorage.setItem("panier", JSON.stringify(local))
                    window.location.reload() 
                }
            })
            btnDeduire.appendChild(contenueDeduire)
            deduire.appendChild(btnDeduire)
            ligne.appendChild(deduire)

            // ajouter la quantite
            var ajouter = document.createElement("th")
            var btnAjouter = document.createElement("button")
            var contenueAjouter = document.createTextNode("+")
            btnAjouter.addEventListener("click", function(){
                produit.total = produit.total + 1
                localStorage.setItem("panier", JSON.stringify(local))
                window.location.reload()
            })
            btnAjouter.appendChild(contenueAjouter)
            ajouter.appendChild(btnAjouter)
            ligne.appendChild(ajouter)






            tableau.appendChild(ligne)
            recupitulatif.appendChild(tableau)


            // calcul du prix total
            prixTotal = prixTotal + produit.price*produit.total
        }

        // afficher le prix total
        var paraPrixTotal = document.createElement("p")
        var contenuePrixTotal = document.createTextNode("le prix total est de " + prixTotal + " €")
        paraPrixTotal.appendChild(contenuePrixTotal)
        recupitulatif.appendChild(paraPrixTotal)

        // ajouter un bouton pour vider la panier
        var btnSupprimer = document.createElement("button")
        var contenueSupprimer = document.createTextNode("vider le panier")
        btnSupprimer.addEventListener("click", function(){
            localStorage.removeItem("panier")
            window.location.reload()
        })
        btnSupprimer.appendChild(contenueSupprimer)
        recupitulatif.appendChild(btnSupprimer)


        // creer le bouton commander
        var btnCommander = document.createElement("input")
        btnCommander.setAttribute("type", "button")
        btnCommander.setAttribute("value", "Valider la Commande")
        btnCommander.classList.add("btnCommande")
        btnCommander.addEventListener("click", async function (e){
            e.preventDefault()
            var formValid = true

            // verrification du nom
            inputNom.value = inputNom.value.trim()

            if (inputNom.value == ""){
                erreurNom.innerHTML = "Veuillez renseigner un Nom"
                erreurNom.style.color = "red"
                formValid = false
            } else if (! inputNom.value.match(/^([a-z A-Z ]+)$/)) {
                erreurNom.innerHTML = "Nom incorrect"
                erreurNom.style.color = "red"
                formValid = false
            }
            else {
                erreurNom.innerHTML = "Nom correct"
                erreurNom.style.color = "green"
            }


            // verrification du prenom
            inputPrenom.value = inputPrenom.value.trim()

            if (inputPrenom.value == ""){
                erreurPrenom.innerHTML = "Veuillez renseigner un Prenom"
                erreurPrenom.style.color = "red"
                formValid = false
            } else if (! inputPrenom.value.match(/^([a-z A-Z ]+)$/)) {
                erreurPrenom.innerHTML = "Prenom incorrect"
                erreurPrenom.style.color = "red"
                formValid = false
            }
            else {
                erreurPrenom.innerHTML = "Prenom correct"
                erreurPrenom.style.color = "green"
            }


            // verrification du email
            inputEmail.value = inputEmail.value.trim()

            if (inputEmail.value == ""){
                erreurEmail.innerHTML = "Veuillez renseigner un Email"
                erreurEmail.style.color = "red"
                formValid = false
            } else if (! inputEmail.value.match(/^([a-z A-Z @ .]+)$/)) {
                erreurEmail.innerHTML = "Email incorrect"
                erreurEmail.style.color = "red"
                formValid = false
            }
            else {
                erreurEmail.innerHTML = "Email correct"
                erreurEmail.style.color = "green"
            }


            // verrification du adresse
            inputAdresse.value = inputAdresse.value.trim()

            if (inputAdresse.value == ""){
                erreurAdresse.innerHTML = "Veuillez renseigner un Adresse"
                erreurAdresse.style.color = "red"
                formValid = false
            } else if (! inputAdresse.value.match(/^([a-z A-Z , 0-9 ]+)$/)) {
                erreurAdresse.innerHTML = "Adresse incorrect"
                erreurAdresse.style.color = "red"
                formValid = false
            }
            else {
                erreurAdresse.innerHTML = "Adresse correct"
                erreurAdresse.style.color = "green"
            }


            // verrification du Ville
            inputVille.value = inputVille.value.trim()

            if (inputVille.value == ""){
                erreurVille.innerHTML = "Veuillez renseigner un Ville"
                erreurVille.style.color = "red"
                formValid = false
            } else if (! inputVille.value.match(/^([a-z A-Z ]+)$/)) {
                erreurVille.innerHTML = "Ville incorrect"
                erreurVille.style.color = "red"
                formValid = false
            }
            else {
                erreurVille.innerHTML = "Ville correct"
                erreurVille.style.color = "green"
            }




            if (formValid === true){
                envoiAPI()//.then((response)=>{
                    //window.location = "validation.html?orderid=" + (response.orderId) + "&prixtotal=" + (prixTotal);
                    //localStorage.removeItem("panier")
                //})
                }

        })
        panier.appendChild(btnCommander)

        
        
    }

}


let idProduit = []
if (local != null){
        for (let produit of local){
            idProduit.push(produit.id)
        }
    }

function formaterCommande(){
    const cle = {
                    contact : {
                    firstName: inputPrenom.value,
                    lastName: inputNom.value,
                    email: inputEmail.value,
                    address: inputAdresse.value,
                    city: inputVille.value
                    },
                    products :
                        idProduit
                }
        
    return cle
}


afficherLesArticle()

function envoiAPI(){
    let data = formaterCommande()
    console.log(data)
    return fetch("http://localhost:3000/api/teddies/order", {method: "post", body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      } })
    .then((response)=> response.json())
    .then((response)=>{return response})
    .catch((Error)=>{console.log(Error)})

}