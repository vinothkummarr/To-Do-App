

let projects =[]
let display = "all_tasks"

function submition(){
  const title = document.getElementById('title').value
  const description =document.getElementById('description').value
  const date = document.getElementById('date').value
  const priority =document.getElementById('priority').value
  const projecto = document.getElementById('project').value
  const project =projecto.toLowerCase()
  const task1 = new Tasks(project,title,description,date,priority)
  
  saveLocal(task1)
  
}

const Tasks = function(project,title,description,date,priority){
  this.project =project;
  this.title =title;
  this.description = description;
  this.date = date;
  this.priority =priority;

  const obj =new Object;
  obj.id = (new Date().getTime()).toString(36)
  obj.project =this.project;
  obj.title= this.title
  obj.description = description;
  obj.date = this.date
  obj.priority =this.priority
  return obj  
}

function saveLocal(task){
  projects.push(task)
  checking(projects)
}
function checking (projects){
  localStorage.setItem("tasks", JSON.stringify(projects));
    
  console.log(JSON.parse(localStorage.getItem("tasks"))); 
  task_container.innerHTML =""
  function createe(){
  for(proj of projects){
    createCards(proj)
  }
}
createe()
}
///// Add proj /////

function add_proj(){
  const new_proj_space = document.getElementById('new_proj_space')
  new_proj_space.innerHTML =""
  showing()   
}
///// Showing in Proj List and ADD in Dropdown//////
function showing(){
  const new_proj_space = document.getElementById('new_proj_space')
  const new_proj_space2 = document.getElementById('new_proj_space2')
  const add_label = document.createElement('input')
  add_label.id = 'top_add'
  new_proj_space2.appendChild(add_label)
  const add_btn = document.createElement('button')
  add_btn.id ="add_btn"
  add_btn.innerHTML ='ADD'
  new_proj_space2.appendChild(add_btn)
  add_btn.addEventListener('click', ()=>{
    const btn_list2 = document.getElementById('btn_list2')
    const top_add = document.getElementById('top_add').value
    const top_add2 = top_add.toLowerCase()
    btn_list2.innerHTML += `
    <li><button id ="${top_add2}" onclick="projectFilter(id)">${top_add}</button></li>
    `
    const projectChoice = document.getElementById('project')
    const newProjChoice = document.createElement('option')
    newProjChoice.innerHTML = top_add
    projectChoice.appendChild(newProjChoice)
    new_proj_space2.innerHTML =""
  })
}
//////////Display as Cards/////
function createCards(obj){
  const task_container = document.getElementById('task_container')
  const card = document.createElement('div')
  card.id ="card"
  card.innerHTML +=`
  <p class="card_p" id="idd">Id : ${obj.id}</p>
  <p class="card_p" id="title_d">Title : ${obj.title}</p>
  <p class="card_p" id="description_d">Description : ${obj.description}</p>
  <p class="card_p" id="date_d">Due Date : ${obj.date}</p>
  <p class="card_p" id="project_d">Project : ${obj.project}</p>
  <p class="card_p" id="priority_d">Priority : ${obj.priority}</p>
  <button id ="${obj.id}" onclick ="delete_card(id)">Delete </button>
  `
  task_container.appendChild(card)
}

///////////   Filtering   //////////
function important_tasks(){
  const task_container = document.getElementById('task_container').innerHTML=""
  display="important"
  
  let id ="important"
     const filtered = (JSON.parse(localStorage.getItem('tasks')).filter(proj => proj.priority === id))
      for (filterr of filtered){
        createCards(filterr)
      }
  
}

function allTasks(){
  display = "all_tasks"
  const task_container = document.getElementById('task_container').innerHTML=""
  for(proj of projects){
    createCards(proj)    
  }
}

function todayTasks(){
  display ="today_tasks"
  const task_container = document.getElementById('task_container').innerHTML=""
  task_container.id = "today_tasks"
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  
  const formattedToday = yyyy + '-' + mm + '-' + dd;
  //console.log(formattedToday)
  let id = formattedToday
  const filtering = (JSON.parse(localStorage.getItem('tasks')).filter(proj => proj.date === id))
   for(filt of filtering){
    createCards(filt)
   }
}

function projectFilter(value){
  display =value
  const task_container = document.getElementById('task_container').innerHTML=""
  const filtering = (JSON.parse(localStorage.getItem('tasks')).filter(proj => proj.project === value))
  for(filt of filtering){
   createCards(filt)
  }
  
}
//////// Delete Cards//////
function delete_card(value){
  console.log(display)
  const task_container = document.getElementById('task_container').innerHTML=""
  console.log(task_container.id)
  const filtering = (JSON.parse(localStorage.getItem('tasks')).filter(proj => proj.id != value))
  projects = filtering
  checking(projects)
  if(display == 'important'){
    important_tasks()
  } else if(display == 'all_tasks'){
    allTasks()
  } else if (display == 'today_tasks'){
    todayTasks()
  } else{
    projectFilter(display)
  } 
  console.log(projects)  
}
