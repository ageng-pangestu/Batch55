
let dataProject=[];

const timeNow = new Date();

console.log(timeNow.getFullYear());

function submitProject(event){
    event.preventDefault();

    let inputProjectName = document.getElementById("inputProjectName").value;
    let inputStartDate = document.getElementById("inputStartDate").value;
    let inputEndDate = document.getElementById("inputEndDate").value;
    let inputDescription= document.getElementById("inputDescription").value;
    let inputImage = document.getElementById("inputImage").files;

    inputImage = URL.createObjectURL(inputImage[0]);

    
    let project = {
        projectName: inputProjectName,
        startDate: inputStartDate,
        endDate: inputEndDate,
        description: inputDescription,
        image: inputImage,
    };
    
    dataProject.push(project);



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
                    <h1>
                        <a href="projectDetail.html" target="_blank">${dataProject[index].projectName} - ${timeNow.getFullYear()}</a>
                    </h1>
                    <p class="duration-text"    > 
                        Durasi: 1 bulan
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