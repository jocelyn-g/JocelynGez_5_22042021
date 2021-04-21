function idArticle(){
    // récup l'id de l'article dans la barre de recherche
    const param = window.location.search;
    const id = param.replace("?id=", "");

    // créer un url avec le lien "http" et l'"id"
    let url = "http://localhost:3000/api/teddies/" + id;

    return url
}



// créer une fonction qui permet de modifier les info de l'article
function afficherLeProduit(response){

    // ajoute photo
    var image = document.querySelector(".divPhotoproduit img");
    image.setAttribute("src", response.imageUrl);

    // ajoute nom
    var newName = document.querySelector("p.name");
    newName.innerHTML = response.name

    // créer un prix
    var newPrice = document.querySelector("p.price");
    newPrice.innerHTML = response.price/100 + " €";

    // créer une description
    var newDescription = document.querySelector("p.description")
    newDescription.innerHTML = response.description

    // créer une selection de couleur
    var select = document.querySelector("select")
    for (let couleur of response.colors){
        var option = document.createElement("option")
        var ContentOption = document.createTextNode(couleur)
        option.appendChild(ContentOption)
        select.appendChild(option)
    }

    // créer un bouton
    var bouton = document.querySelector("button");
    bouton.innerHTML = "ajouter au panier"


    // créer un event au bouton "ajouter au panier"
    bouton.addEventListener("click", function(){
        const couleur = document.getElementsByTagName("select")
        const choixCouleur = couleur[0].value
        console.log(choixCouleur)
    
        let panier = localStorage.getItem("panier");
        console.log(panier)
       

        let element = {
            image: response.imageUrl,
            name: response.name, 
            price: response.price/100,
            color: choixCouleur,
            total: 1,
            id: idArticle()
        }

        if (panier == null){

            panier = [];
            panier.push(element)
            localStorage.setItem("panier", JSON.stringify(panier))
        
        } else {

            panier = JSON.parse(panier)
            let found = false

            for (let produit of panier){

                if (produit.name === element.name && produit.color === element.color){

                    found = true
                    produit.total = produit.total + 1
                    localStorage.setItem("panier", JSON.stringify(panier))           
                
                }
            }

            if (found === false){

                panier.push(element)
                localStorage.setItem("panier", JSON.stringify(panier)) 
                
            }
            
        }


    })


}









fetch(idArticle())
    .then((response)=> response.json())
    .then((response)=> {afficherLeProduit(response)})
    .catch((Error)=>{console.log(Error)})