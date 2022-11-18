
function users(){
    fetch("http://localhost:3000/users")
    .then(res=>res.json())
    .then(json=>{
        //traitement
        let html=""
        json.map(user=>{
            html=html+`<tr>
            <td>${user.nom}</td>
            <td>${user.email}</td>
            <td><button onclick="modifier('${user.id}')">Modifier</button></td>
            <td><button onclick="supprimer('${user.id}')">supprimer</button></td>
        </tr>`
        })
        document.getElementById("tbody").innerHTML=html

    })
}


function supprimer(id){
    fetch(`http://localhost:3000/users/${id}`,{
        method:"DELETE",
        headers:{'content-type':"application/json"},
    })
    .then(res=>res.json())
    .then(json=>{alert("suppresion avec sucess !");users()})
    .catch(err=>{alert("erreure de suppression ")})

}

function ajouter(){
    let nom =document.getElementById("nom").value
    let email =document.getElementById("email").value
    if(nom==""||email==""){
        alert("champs vides ")
    }else{
        fetch("http://localhost:3000/users",{
            method:"POST",
            headers:{'content-type':"application/json"},
            body:JSON.stringify({
                "id":3,
                "nom":nom,
                "email":email
            })
        })
        .then(res=>res.json())
        .then(json=>{
            alert("ajout avec succes ")
            users()
        })
        .catch(err=>{
            alert("erreur d'ajout")
            console.log(err)
        })
    }
}

function modifier(id){
    fetch("http://localhost:3000/users/"+id)
    .then(res=>res.json())
    .then(json=>{
        document.getElementById("nom").value=json.nom
        document.getElementById("email").value=json.email
        document.getElementById("btn_mod").innerHTML=`<button type="button" onclick="Enregistrer('${json.id}')">Eregistrer</button>`
    })
}

function Enregistrer(id){
    let nom =document.getElementById("nom").value
    let email=document.getElementById("email").value
    fetch(`http://localhost:3000/users/${id}`,{
        method:"PATCH",
        headers:{'content-type':"application/json"},
        body:JSON.stringify({
            "nom":nom,
            "email":email
        })
    })
    .then(res=>res.json())
    .then(json=>{
        alert("modification reussie ")
        location="./index.html"
    })
    .catch(err=>{
        alert("erreur de modification");
        console.log(err)
    })
}



users()