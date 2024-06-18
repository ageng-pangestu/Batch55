let dataProject=[];

const timeNow = new Date();
// console.log(timeNow.getHours());

function durationTime(start, end) {
    console.log(start);
    console.log(end);

    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = endDate - startDate;

    console.log(duration);
    
    const durationDays = Math.floor(duration / 1000/ 60 / 60 / 24);
    const durationMonth = Math.floor(duration / 1000/ 60 / 60 / 24 / 30);

    console.log(durationDays);
    console.log(durationMonth);

    if(durationMonth<1){
        return "Durasi: "+durationDays+" hari";
    } else {
        return "Durasi: "+durationMonth+" bulan";
    }
}

function radioCheck(){
    let radio = document.getElementsByName("technologies");

    for (let index = 0; index < radio.length; index++) {
        if (radio[index].checked==true) {
            console.log(radio[index].value)
            return "technologi "+radio[index].value;
        }
    };
}

function submitProject(event){
    event.preventDefault();


    let inputProjectName = document.getElementById("inputProjectName").value;
    let inputStartDate = document.getElementById("inputStartDate").value;
    let inputEndDate = document.getElementById("inputEndDate").value;
    let inputRadio = document.getElementsByName("technologies");
    for (let index = 0; index < inputRadio.length; index++) {
        if (inputRadio[index].checked==true) {
            console.log(inputRadio[index].value)
            var inputTechnologies = inputRadio[index].value;
        }
    };

    let inputDescription= document.getElementById("inputDescription").value;
    let inputImage = document.getElementById("inputImage").files;

    inputImage = URL.createObjectURL(inputImage[0]);

    
    let project = {
        projectName: inputProjectName,
        startDate: inputStartDate,
        endDate: inputEndDate,
        technologies: inputTechnologies,
        description: inputDescription,
        image: inputImage,
    };
    
    dataProject.push(project);

    alert("Project ditambahkan")

    renderProject();
}

function renderProject(){

    document.getElementById("project").innerHTML="";

    for (let index = 0; index < dataProject.length;index++){
        document.getElementById("project").innerHTML += `
        
        <div class="project-container">
            <div class="project-card">        
                <div class="project-image">
                    <img src="${dataProject[index].image}" alt="image upload" class="image-content">
                </div>

                <div class="project-content">
                    <h2>
                        <a href="projectDetail.html" target="_blank">${dataProject[index].projectName} - ${timeNow.getFullYear()}</a>
                    </h2>
                    <p>
                        ${dataProject[index].technologies}
                    </p>
                    <p class="duration-text"> 
                        ${durationTime(dataProject[index].startDate, dataProject[index].endDate)}
                    </p>

                    <p class="text-description">
                        ${dataProject[index].description}
                    </p>

                    <div class="logo">
                        <a href=""><span><i class="fa-brands fa-google-play"></i></span></a>
                        <a href=""><span><i class="fa-brands fa-android"></i></span></a>
                        <a href=""><span><i class="fa-brands fa-java"></i></span></a>
                    </div>

                </div>

                <div class="btn-content">
                    <button onclick="editContent()">Edit</button>
                    <button onclick="deleteContent()">Delete</button>
                </div>

            </div>


        `
    }
}