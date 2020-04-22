// three details required id,task and completed 

window.onload = () => {
    if(localStorage.getItem('taskholder') !== null){
        const arr = JSON.parse(localStorage.getItem('taskholder'));
        
        if(arr.length > 0){
            updateLists(arr);
        }
    }else{
        console.log("sorry no array")
    }
}


window.addEventListener('click',(e) => {
    console.log(e);
    if(e.target.className == 'taskSpan'){
        console.log("Click on delete")
        const arr = JSON.parse(localStorage.getItem('taskholder'));

        const position = e.target.parentNode.id;

        arr.splice(position,1);

        localStorage.setItem('taskholder',JSON.stringify(arr));
        updateLists(arr);
    }

    if(e.target.className == 'checkbox'){
        console.log("Checkbox");
        const position = e.target.parentNode.parentNode.id;

        const arr = JSON.parse(localStorage.getItem('taskholder'));

        if(arr[position].completed == false){
            arr[position].completed = true;
            e.target.parentNode.parentNode.children[1].style.textDecoration = 'line-through';
            e.target.parentNode.parentNode.style.backgroundColor = '#9e9e9e';
            e.target.parentNode.parentNode.style.color = 'black';
        }else{
            arr[position].completed = false;
            e.target.parentNode.parentNode.children[1].style.textDecoration = 'none';
            e.target.parentNode.parentNode.style.backgroundColor = '#343a40';
            e.target.parentNode.parentNode.style.color = 'white';
        }

        localStorage.setItem('taskholder',JSON.stringify(arr));
    }
})




const parentDiv = document.getElementById('todoList');
const btn = document.getElementById('taskbtn');

function updateLists(tasks){
    const parent = document.createElement('div');
    tasks.forEach((task,index)=>{
        const divP = document.createElement('div');
        const div = document.createElement('div');
        div.innerText = task.task;
        div.style.textDecoration = task.completed ? 'line-through' : 'none';
        divP.className = 'taskdiv';
        divP.style.backgroundColor = task.completed ? '#9e9e9e' : '#343a40';
        divP.style.color = task.completed ? 'black' : 'white';
        divP.id = index;
        const span = document.createElement('img');
        span.src = 'trash.svg';
        span.className = 'taskSpan'
        const span2 = document.createElement('span');
        const inputEl = document.createElement('input');
        inputEl.type = 'checkbox';
        inputEl.className = 'checkbox';
        console.log(task.completed);
        inputEl.defaultChecked = task.completed;
        span2.appendChild(inputEl);
        span2.className = 'checkSpan'
        divP.appendChild(span2);
        span.className = 'taskSpan'
        divP.append(div);
        divP.append(span);
        parent.prepend(divP);
    })
    parentDiv.innerHTML = parent.innerHTML;
}

btn.addEventListener('click', (e) => {
    e.preventDefault();

    // get the text field value and update the lists
    const text = document.getElementById("task").value.trim();
    if(text == ''){
        alert("Please enter something");
    }else{
        if(localStorage.getItem('taskholder') !== null){
            const arr = JSON.parse(localStorage.getItem('taskholder'));
            const newDetail = {
                task: text, 
                completed: false
            }
            
            arr.push(newDetail);

            localStorage.setItem('taskholder',JSON.stringify(arr));
            updateLists(arr);
        }else{
            const arr = []
            const newDetail = { 
                task: text, 
                completed: false
            }
            arr.push(newDetail);
            localStorage.setItem('taskholder',JSON.stringify(arr));
            updateLists(arr);
        }
        
    }

})