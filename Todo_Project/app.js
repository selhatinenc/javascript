
const todo_add_button=document.querySelector("#todoAddButton");
const todo_add_form=document.querySelector("#todoAddForm");
const todo_add_Name=document.querySelector("#todoName");
const todo_list=document.querySelector(".list-group");
const first_card_body=document.querySelectorAll(".card-body")[0];
const sec_card_body=document.querySelectorAll(".card-body")[1];
const clear_button=document.querySelector("#clearButton");
const filter_todos=document.querySelector("#todoSearch");
let storage_list=[];
console.log("...");

start_events();

function start_events(){
    todo_add_form.addEventListener("submit",event_todo_add);
    document.addEventListener("DOMContentLoaded",page_loaded);
    sec_card_body.addEventListener("click",remove_element);
    clear_button.addEventListener("click",clear_all_list);
    filter_todos.addEventListener("keyup",filter_todo_list);
}

function filter_todo_list(e){
    const word=e.target.value.toLowerCase().trim();
    const todo_list_items=document.querySelectorAll(".list-group-item");
    if(todo_list_items.length>0){
        todo_list_items.forEach(function(x){
            if(x.textContent.toLocaleLowerCase().trim().includes(word)){
                x.setAttribute("style","display : block");
            }
            else {
                x.setAttribute("style","display : none !important");
    
            }
        });
   //     show_alert("success","filtered!");

    }
    else {
        show_alert("warning","Can not filter!");
    }
  
}
function page_loaded(){
    check_storage_list();
    storage_list.forEach(function(todo){
        add_to_UI(todo);
    });

}
function clear_all_list(){
    const todos_list=document.querySelectorAll(".list-group-item");
    if(todos_list.length>0){
        todos_list.forEach(function(todo){
            todo.remove();
        });
        storage_list=[];
        localStorage.setItem("todos",JSON.stringify(storage_list));
        show_alert("succes","Succesfully deleted all todos");
    }
    else {
        show_alert("warning","Todo list is free");
    }
}
function remove_element(e){
    if(e.target.className==="fa fa-remove"){
    //    console.log(e.target);
    // delete from interface
       const todo_element_removed= e.target.parentElement.parentElement;
       todo_element_removed.remove();

    // remove element from storage        
    remove_todo_from_storage(todo_element_removed.textContent   );
    show_alert("succes","TODO Was Deleted Succesfully");    
    }
}
function     remove_todo_from_storage(removed_element){
check_storage_list();
    storage_list.forEach(function(todo,index){
        if(removed_element==todo){
            storage_list.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(storage_list));
}
function event_todo_add(e){
    console.log("Submit event runned");
    let submit_text=todo_add_Name.value.trim();
    if(submit_text==""||submit_text==null){
        console.log("text is free");
        show_alert("warning","please fill in blank");

    }
    else{
        add_to_UI(submit_text);
      //  console.log("after UI");

        add_To_Storage(submit_text);
//        console.log("after storage");
        show_alert("primary","succesfully added into todo list");
      

    }
    e.preventDefault();


}
function add_To_Storage(stored_value){
  //  console.log("start");
    check_storage_list();
    storage_list.push(stored_value);
    localStorage.setItem("todos",JSON.stringify(storage_list));
 //   console.log("end");

}
function check_storage_list(){
    if(localStorage.getItem("todos")==null){
        storage_list=[];
        
    }
    else {
        storage_list=JSON.parse( localStorage.getItem("todos"));

    }
    
}

function show_alert(type,message){
    /*
    <div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>
*/
    const div=document.createElement("div");
   // div.id=`alert alert-${type}`;
    div.id="alert alert-"+type;
    div.role="alert";
    div.textContent=message;
 //   const hr=document.createElement("hr");
   // first_card_body.appendChild(hr);// add horizontal line
    first_card_body.appendChild(div);
    setTimeout(function(){
        div.remove();
     //   hr.remove();
    },2500);

}



function add_to_UI(submit_text){
    /*
      <!--
                        <li class="list-group-item d-flex justify-content-between">Todo 1
                            <a href="#" class="delete-item">
                                <i class="fa fa-remove"></i>
                            </a>
                        </li>
                    -->
                    */
    const li=document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent=submit_text;

    const a=document.createElement("a") ;
    a.href="#";
    a.className="delete-item";
    
    const i=document.createElement("i");
    i.className="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todo_list.appendChild(li);
    todo_add_Name.value="";

}