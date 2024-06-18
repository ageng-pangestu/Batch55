const testimonial = new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest();
    // https://api.npoint.io/eb69bf8dbd9332cfa29e
    xhr.open("GET","https://api.npoint.io/eb69bf8dbd9332cfa29e",true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
        } else {
            reject("Error Loaded Data");
        }
    };

    xhr.onerror = function() {
        reject("404 Not Found");
    };

    xhr.send();
});

async function allTestimonial(){
    // alert("All function aman");
    try {
        const response = await testimonial;
        let testimonialHtml =``;

        response.forEach((item) =>{
            testimonialHtml +=`
            <div class="card">
            <img src="${item.image}" alt="content foto">
            <p class="quotes">"${item.quotes}"</p>
            <p class="name">-${item.name}</p>
            <p class="rating">${item.rating}<i class="fa-solid fa-star"></i></p>
            </div>
            `
        });
        document.getElementById("testimonial-content").innerHTML = testimonialHtml;
    } catch (error) {
        console.log(error);
    }
}

allTestimonial();


async function filterTesttimonial(rating){
    // alert("Filter function aman");
    try {
        const response = await testimonial;
        let testimonialHtml=``;

        const dataFiltered = response.filter((item)=>{
            return item.rating==rating;
        });

        if (dataFiltered.length==0) {
            testimonialHtml=`<h1>Data tidak ada :(</h1>`
        } else {
            dataFiltered.forEach((item)=>{
                testimonialHtml+=`
                <div class="card">
                <img src="${item.image}" alt="content foto">
                <p class="quotes">"${item.quotes}"</p>
                <p class="name">-${item.name}</p>
                <p class="rating">${item.rating}<i class="fa-solid fa-star"></i></p>
                </div>
                `
            });
        }

        document.getElementById("testimonial-content").innerHTML = testimonialHtml
    } catch (error) {
        console.log(error);
    }
}