const responsable = document.getElementById("responsable")
const nom = document.getElementById("nom")
const priorite= document.getElementById("priorite")
const description = document.getElementById("Description")
const form_ajout = document.getElementById("form-ajout")
const btn_fermer = document.getElementById("btn-fermer")
const btn_enreg = document.getElementById("btn-enreg")
const statut= document.getElementById("statut")
const date_limite= document.getElementById("date_limite")
const btn_ajout= document.getElementById("btn-ajout")
const list_tache= document.getElementById("list-tache")
const encours=document.getElementById("cours")
const afaire=document.getElementById("afaire")
const enretard=document.getElementById("enretard")
const termine=document.getElementById("termine")
const prioriti = document.getElementById("prioriti")
const filtre = document.getElementById("filtre")

btn_ajout.onclick = function(){
    form_ajout.removeAttribute("hidden")     
    btn_ajout.setAttribute("hidden","") 
}

btn_fermer.onclick = function(){
    form_ajout.setAttribute("hidden","")     
    btn_ajout.removeAttribute("hidden")     
}
let tab_tache=[];
function listerTache (){
    list_tache.innerHTML ="";
    tab_tache.forEach((element,indice) => {
        let couleur_priorite = "";
        let couleur_statut = "";
        if(element.statut == "A FAIRE" ){
            couleur_statut = "text-bg-info";
        }else{
            if(element.statut=="en cours"){
                couleur_statut = "text-bg-warning";
            }else{
                couleur_statut = "text-bg-success"
            }
        }
        if(element.priorite == "basse" ){
            couleur_priorite = "text-bg-info";
        }else{
            if(element.priorite=="moyenne"){
                couleur_priorite = "text-bg-warning";
            }else{
                couleur_priorite = "text-bg-danger"
            }
        }
        list_tache.innerHTML +=`
              <div class="col-md-4">
                <div class="card">
                    <div class="card-header bg-dark text-white"> ${element.nom}</div>
                    <div class="card-body">
                        <p class="text-justify">${element.description}</p>
                        <p> STATUT : <span class="${couleur_statut} px-4 py-2 rounded-pill"> ${element.statut} </span></p>
                        <div class="text-end">
                            <p>RESPONSABLE : <span class="fw-bold">${element.responsable}</span></p>
                            <p>DATE LIMITE : <span class="fw-bold">${element.date_limite}</span></p>
                        </div>
                         <p>PRIORITE : <span class="${couleur_priorite} rounded-pill px-4 py-2">${element.priorite}</span></p>
                    </div>
                    <div class="card-footer" ${element.statut == "terminer" ? 'hidden' : ""}>
                        <div class="text-center">
                            <button type="button" class="btn btn-sm btn-warning" id="btn-cours" onclick="changerStatut('${indice}','en cours')"> EN COURS </button>
                            <button type="button" class="btn btn-sm btn-success" id="btn-ter" onclick="changerStatut('${indice}','terminer')"> TERMINER </button>
                            <button type="button" class="btn btn-sm btn-danger" id="btn-sup" onclick="supprimer('${indice}','en cours')"> SUPPRIMER </button>
                        </div>
                    </div>          
                </div>
            </div>     
        `;
    });
    let nb_encours=0;
    let nb_termine=0;
    let nb_enretard=0;
    let nb_afaire=0;
    let date_a=new Date();
    tab_tache.forEach((element)=>{
        if(element.statut=="en cours"){
            nb_encours += 1;
        }
         if(element.statut=="A FAIRE"){
            nb_afaire += 1;
        }
         if(element.statut=="terminer"){
            nb_termine += 1;
        }
        let date_tache=new Date(element.date_limite)
         if(element.statut !="terminer" && date_tache<date_a){
            nb_enretard += 1;
        }
    });
    encours.textContent=nb_encours;
    termine.textContent=nb_termine;
    afaire.textContent=nb_afaire;
    enretard.textContent=nb_enretard;
}
btn_enreg.onclick=function (){
    let tache = {
        nom : nom.value,
        description : description.value,
        priorite : priorite.value,
        responsable : responsable.value,
        date_limite : date_limite.value,
        statut : statut.value,
    };
    tab_tache.push(tache);
    listerTache();
    nom.value=""; 
    description.value="";
    responsable.value="";
    date_limite.value="";
    statut.value="A FAIRE";
    priorite.value="haute";
}
function supprimer(indice){
    if(confirm ("Voulez vous supprimer cette tache ")){
        tab_tache.splice(indice,1);
        listerTache();
    }
}
function changerStatut(indice,nouveau_statut){
    tab_tache[indice].statut=nouveau_statut;
    listerTache();
}
prioriti.onchange=function (){
    let choix = prioriti.value;
    filtre.innerHTML = "";
    tab_tache.forEach(function(t){
    if(t.priorite == choix){
        filtre.innerHTML = filtre.innerHTML+t.nom+"<br>"
    }
    });
}