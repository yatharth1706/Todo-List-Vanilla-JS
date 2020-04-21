window.onload = () => {
    if(localStorage.getItem('Brrays') !== null){
        const arr = JSON.parse(localStorage.getItem('Brrays'));
        
        if(arr.length > 0){
            arr.forEach((el)=>{
                updateLists(el);            
            })
        }
    }else{
        console.log("sorry no array")
    }
}


const parentDiv = document.getElementById('todoList');
const btn = document.getElementById('taskbtn');

function deleteTask(e){
    const toRemove = e.target.parentNode;
    const fromRemove = toRemove.parentNode;

    fromRemove.removeChild(toRemove);

    // need to remove from taArray
    const arr = JSON.parse(localStorage.getItem('Brrays'));
    let toSearch = (e.target.parentNode.children[1].innerText);
    let newArr = arr.filter((el)=>{
        return (el[0] != toSearch);
    })
    console.log(newArr)
    // console.log(arr);
    localStorage.setItem('Brrays',JSON.stringify(newArr));

}

function fn(e){
    if(e.target.checked == true){
        e.target.parentNode.parentNode.children[1].style.textDecoration = 'line-through'
        // also update in the arr
        let arr = JSON.parse('Brrays');
        // find the children in array
    }else{
        e.target.parentNode.parentNode.children[1].style.textDecoration = 'none'
    }
}

function updateLists(task){
    // create a template
    console.log(task)
    const divP = document.createElement('div');
    const div = document.createElement('div');
    div.innerText = task[0];
    divP.className = 'taskdiv';
    const span = document.createElement('span');
    span.innerText = 'X';
    span.className = 'taskSpan'
    const span2 = document.createElement('span');
    const inputEl = document.createElement('input');
    inputEl.type = 'checkbox';
    inputEl.checked = task[1];
    inputEl.addEventListener('input', fn);
    span2.appendChild(inputEl);
    span2.className = 'checkSpan'
    divP.appendChild(span2);
    span.className = 'taskSpan'

    span.addEventListener('click', deleteTask);
    divP.append(div);
    divP.append(span);
    parentDiv.prepend(divP);
}

btn.addEventListener('click', (e) => {
    e.preventDefault();

    // get the text field value and update the lists
    const text = document.getElementById("task").value.trim();
    if(text == ''){
        alert("Please enter something");
    }else{
        if(localStorage.getItem('Brrays') !== null){
            const arr = JSON.parse(localStorage.getItem('Brrays'));
            arr.push([text, false]);
            localStorage.setItem('Brrays',JSON.stringify(arr));
            updateLists([text, false]);
        }else{
            const arr = []
            arr.push([text, false]);
            localStorage.setItem('Brrays',JSON.stringify(arr));
            updateLists([text, false]);
        }
        
    }

})