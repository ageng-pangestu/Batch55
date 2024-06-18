const arrayName= [1,2,3,4,5,6];

let angkaGenap = arrayName.filter((item) =>{
    return item%2==0;
});

console.log(angkaGenap);