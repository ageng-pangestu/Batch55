const testimonialData = [
{
    image:"https://i2-prod.football.london/incoming/article28806096.ece/ALTERNATES/s615/0_Mykhailo-Mudryk.jpg",
    quotes:"ayo liga melon",
    name:"Mykhailo Mudryk",
    rating:"1",
},
{
    image:"https://akcdn.detik.net.id/visual/2020/09/30/flora-shafiq_43.jpeg?w=480&q=90",
    quotes:"Bapak lo aja yang bondol",
    name:"Flora Shafiqa Jkt48",
    rating:"5",
},
{
    image:"assets/image/foto1.jpeg",
    quotes:"Serunya belajar di dumbways",
    name:"Ageng Pangestu",
    rating:"5",
},
{
    image:"https://radartasik.disway.id/upload/00cb8eeff96bffaa234a5921987d2fd4.jpg",
    quotes:"kaizoku ou ni ore wa ni naru",
    name:"Luffy",
    rating:"3",
},
{
    image:"https://dayaknews.com/wp-content/uploads/2023/11/buaya3.jpg",
    quotes:"Kalo aku chat ada yang marah ga",
    name:"Buaya",
    rating:"2",
},
]

allTestimonial();

function html(data) {
    return `
        <div class="card">
            <img src="${data.image}" alt="content foto">
            <p class="quotes">"${data.quotes}"</p>
            <p class="name">-${data.name}</p>
            <p class="rating">${data.rating}<i class="fa-solid fa-star"></i></p>
        </div>`;
}

function allTestimonial() {
    let testimonialHtml = "";
    testimonialData.forEach((item) => {
      testimonialHtml += html(item);
    });
  
    document.getElementById("testimonial-content").innerHTML = testimonialHtml;
}

function filterTesttimonial(rating){
    let testimonialHtml = "";
    const filteredRating = testimonialData.filter((item) =>{
        return item.rating==rating;
    });

    if (filteredRating.length==0) {
        testimonialHtml="<h2>Data tidak ada :(</h2>";
    } else
    filteredRating.forEach((item)=>{
        testimonialHtml+=html(item);
    });

    document.getElementById("testimonial-content").innerHTML = testimonialHtml;

}