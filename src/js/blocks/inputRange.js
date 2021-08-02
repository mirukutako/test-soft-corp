export default function inputRange(){
    let inputRange = document.querySelectorAll('.js-range');

    if(inputRange.length){
        inputRange.forEach(item =>{
            let field = item.querySelector('.js-range-field');
            let out = item.querySelector('.js-range-out');
            out.innerHTML = field.value;

            field.addEventListener('mousemove', ()=>{
                out.innerHTML = field.value;
            })
        })
    }
}