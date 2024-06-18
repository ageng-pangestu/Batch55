function submitData() {
    let fullName = document.getElementById("inputName").value;
    let email = document.getElementById("inputEmail").value;
    let phoneNumber = document.getElementById("inputNumber").value;  
    let subject = document.getElementById("inputSubject").value;
    let message = document.getElementById("inputMessage").value;

    alert(`Nama: ${fullName}\n
    Email: ${email}\n
    Phone Number: ${phoneNumber}\n
    Subject: ${subject}\n
    Message: ${message}`);

    console.log(`Nama: ${fullName}\n
    Email: ${email}\n
    Phone Number: ${phoneNumber}\n
    Subject: ${subject}\n
    Message: ${message}`);

    let a = document.createElement("a");
    a.href = `mailto:${email}?subject=${email}&body=Hello my name ${fullName}, and my number ${phoneNumber} ${message}`;
    a.click();
}
