// ######################### to remove the messages within 3 sec ##########################
let removeinsec = document.querySelector('.removeinsec');
// console.log(removeinsec);
function remove(){setTimeout(() => {
    removeinsec.style.display = "none";
}, 3000)}
if(removeinsec){
    remove();
}
