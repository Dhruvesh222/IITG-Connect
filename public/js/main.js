let searchUser = document.getElementById('searchUser');
if(searchUser){
    searchUser.addEventListener('input',()=>{
        let inputvalue = searchUser.value.toLowerCase();
        let allusers = document.getElementsByClassName('allusers');
        // console.log(forsearch);
        Array.from(allusers).forEach((element)=>{
            let content = element.querySelector('.forsearch').innerHTML.toLowerCase();
            // console.log(element,content,inputvalue);
            if(content.includes(inputvalue)){
                element.style.display = "block";
            }else{
                element.style.display = "none";
            }
        })
    })
}
