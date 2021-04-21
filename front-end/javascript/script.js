// on appelle l'Id "annonceNounourse" de la div

var annonceNounourse = document.getElementById('annonceNounourse');

// on créer une fonction avec boucle pour afficher tout les nounours


function afficherLeToutSousFormeDeDivisions(nounourse){

        var newDiv = document.createElement("div");
        newDiv.classList.add("articleNounours")

        // ajoute photo
        var divPhoto = document.createElement("div");
        divPhoto.classList.add("divPhoto")
        var image = document.createElement("img");
        image.src = nounourse.imageUrl

        // ajoute nom
        var newName = document.createElement("p");
        var newContentName = document.createTextNode(nounourse.name);

        // créer un prix
        var newPrice = document.createElement("p");
        var newContentPrice = document.createTextNode(nounourse.price + " €");

        // créer un bouton
        var bouton = document.createElement("a");
        var newContentBouton = document.createTextNode("voir produit");
        bouton.setAttribute("href", "produit.html?id=" + nounourse._id);



        // image enfant de divPhoto
        divPhoto.appendChild(image);
        // newContentName enfant de newName
        newName.appendChild(newContentName);
        // newContentPrice enfant de newPrice
        newPrice.appendChild(newContentPrice);
        // newContentBouton enfant de bouton
        bouton.appendChild(newContentBouton)


        // créer des div pour les info
        var divInfo = document.createElement("div")
        divInfo.classList.add("divInfo")
        var divNamePrice = document.createElement("div")
        divNamePrice.classList.add("divNamePrice")
        var divBouton = document.createElement("div")
        divBouton.classList.add("divBouton")
        // les enfants de divNamePrice
        divNamePrice.appendChild(newName);
        divNamePrice.appendChild(newPrice);
        // bouton enfant de divBouton
        divBouton.appendChild(bouton);
        // les enfants de divInfo
        divInfo.appendChild(divNamePrice);
        divInfo.appendChild(divBouton);



        // les enfant de newDiv
        newDiv.appendChild(divPhoto);
        newDiv.appendChild(divInfo);

        // newDiv enfant de annonceNounourse
        annonceNounourse.appendChild(newDiv);

}


fetch("http://localhost:3000/api/teddies")
    .then((response)=> response.json())
    .then((response)=> {console.log(response)
        for (let nounourse of response){
            afficherLeToutSousFormeDeDivisions(nounourse)
        }
    })
    .catch((Error)=>{console.log(Error)})