const apiUrlRamdon = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_zHNoTR0snzv1NRwL4UA56XDsDHuHoFQrn4jBy4eOsNwhFaHl6UZwqEEdBChXZzqk";
const apiUrlFavourites = "https://api.thecatapi.com/v1/favourites?limit=100";
const apiUrlFavouritesAdd = "https://api.thecatapi.com/v1/favourites";
const apiUrlFavouritesDelete = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const apiUrlUpload = "https://api.thecatapi.com/v1/images/upload"

var spanError = document.getElementById("error"); 

async function loadRamdomCats(){
    const res = await fetch(apiUrlRamdon);
    const data = await res.json();
   
     
    if(res.status != 200){
        spanError.innerHTML = "La aplicacion fallo"+ res.status +"su pc va a explotar";
        console.log("todo fallo con exito");
    }else{
        console.log("ramdom");
        console.log(data);
        const img1 = document.getElementById("img1");
        const img2 = document.getElementById("img2");
        const btn1Save = document.getElementById("btnSaveCat1");
        const btn2Save = document.getElementById("btnSaveCat2");

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1Save.onclick = () => saveFavoriteMichi(data[0].id);
        btn2Save.onclick = () => saveFavoriteMichi(data[1].id);
        console.log("todo funciono con exito"); 
    }   
}

async function loadFavouritesCats(){
    const resFavourites = await fetch(apiUrlFavourites, {
            method: 'GET',
            headers: {
                'x-api-key': 'live_zHNoTR0snzv1NRwL4UA56XDsDHuHoFQrn4jBy4eOsNwhFaHl6UZwqEEdBChXZzqk'
            },
        });
    console.log("favoritos");
    const data = await resFavourites.json();
 
    
    if(resFavourites.status !== 200){
        spanError.outerHTML = "La aplicacion fallo error "+resFavourites.status;
        console.log("la aplicacion fallo en favoritos");
    }else{
        const section = document.getElementById("favoriteCats");
        console.log(data);
        section.innerHTML = "";
        data.forEach(cat =>{
            const article = document.createElement("article");
            const img = document.createElement("img");
            img.width = 300;
            img.height = 250;
            const btn = document.createElement("button");
            const btnText = document.createTextNode("Eliminar de favoritos");


            img.src = cat.image.url;
            btn.appendChild(btnText);
            btn.onclick = ()=>deleteCat(cat.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

        });
    }    
}

async function saveFavoriteMichi(id){
    var rawBody = JSON.stringify({ 
                 image_id: id 
    });

    const resT = await fetch(apiUrlFavouritesAdd, {
        method: 'POST',
        headers: {  
            "content-type":"application/json",
            'x-api-key': 'live_zHNoTR0snzv1NRwL4UA56XDsDHuHoFQrn4jBy4eOsNwhFaHl6UZwqEEdBChXZzqk'
        },
        body: rawBody
    });
    
    
    if(resT.status !== 200){
        spanError.outerHTML = "La aplicacion fallo error "+resT.status;
        console.log("la aplicacion fallo en favoritos");

    }else{
       // alert("gato guardado");
        const data = await resT.json();
        console.log(data);
        loadFavouritesCats();
     
    }

}

async function deleteCat(id){
    const resT = await fetch(apiUrlFavouritesDelete(id), {
        method: 'DELETE',
        'x-api-key': 'live_zHNoTR0snzv1NRwL4UA56XDsDHuHoFQrn4jBy4eOsNwhFaHl6UZwqEEdBChXZzqk'
    });

    if(resT.status !== 200){
        spanError.outerHTML = "La aplicacion fallo error "+resT.status;
        console.log("la aplicacion fallo en favoritos");

    }else {
       // alert(`cat con id ${id} eliminado`);
        loadFavouritesCats();
    }
}

async function uploadCatPhoto(){
    const form = document.getElementById("uploadForm");
    const formData = new FormData(form);

    const res = await fetch(apiUrlUpload, {
        method: 'POST',
        headers: {
            'Content-type': 'multipart/form-data',
            'x-api-key': 'live_zHNoTR0snzv1NRwL4UA56XDsDHuHoFQrn4jBy4eOsNwhFaHl6UZwqEEdBChXZzqk'
        },
        body:formData,
    });

    const data = await res.json();

}

loadRamdomCats();
loadFavouritesCats();
