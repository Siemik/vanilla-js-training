 
    var toggleAllButton = document.getElementById('toggle-all-button');
    toggleAllButton.addEventListener('click', toggleAll);
    
    var addButtom= document.getElementById('add-task-button');
    var addInput= document.getElementById('add-input')
    addButtom.addEventListener('click', add);

    var list = [
      {task: "Zrobic pranie", complete: false},
      {task: "Wywiesic pranie", complete: false},
      {task: "Wyprasowac rzeczy", complete: false}
    ];
    
    displayTodo();

    function add() {
      list.push({task: addInput.value, complete: false})
      addInput.value = ""
      displayTodo();
    }

    function edit(event) {
      newTodoText = prompt("What's your sign?");
      if (newTodoText !== null && newTodoText !== ''){
        position= event.currentTarget.id.split('-')[2]
        list[position].task= newTodoText
        displayTodo();
      }
    }
    
    function toggle(event) {
      position= event.currentTarget.id.split('-')[1]

      if (list[position].complete) {
        list[position].complete = false;
      }
      else {
        list[position].complete = true;
      }

      displayTodo();
    }
    
    function remove(event) {
      position= event.currentTarget.id.split('-')[2]

      list.splice(position, 1);
      displayTodo()
    }

    function displayTodo() {  
      var ulTask = document.getElementById('list-of-task');
      ulTask.innerHTML='';

      for (i=0 ; i < list.length ; i++) {
        var li = document.createElement("li");
        ulTask.appendChild(li)

        var toggleButton = document.createElement("button")
        toggleButton.id="toggle-btn-"+i

        if (list[i].complete) {
          toggleStatus = "<button class=toggle-status-done id=toggle-"+i+">✔️</button>"
          taskContent = "<p class=task-content id=task-content-"+i+">"+list[i].task+"</p>"
          console.log(toggleStatus + taskContent);
          li.innerHTML = toggleStatus + taskContent;
          positionToggle="toggle-"+i
          positionEdit= "task-content-"+i
          document.getElementById(positionToggle).addEventListener('click', toggle)  
          document.getElementById(positionEdit).addEventListener('dblclick', edit)
        } 
        else {
          toggleStatus = "<button class=toggle-status-todo id=toggle-"+i+">⬜</button>"
          taskContent = "<p class=task-content id=task-content-"+i+">"+list[i].task+"</p>"
          console.log(toggleStatus + taskContent);
          li.innerHTML = toggleStatus + taskContent;
          positionToggle="toggle-"+i
          positionEdit= "task-content-"+i
          document.getElementById(positionToggle).addEventListener('click', toggle)  
          document.getElementById(positionEdit).addEventListener('dblclick', edit) 
        }

        var removeButton = document.createElement("button")
        removeButton.id="remove-btn-"+i
        removeButton.className="remove-button"
        removeButton.innerText="🗑️"
        li.appendChild(removeButton)

        removeButton.addEventListener('click', remove)
      }

    }

    function toggleAll() {
      // How much there is true tasks? 
      var trueTaskCounter = 0;
      for (i=0 ; i<list.length ; i++) {
        if (list[i].complete){
          trueTaskCounter++
        }
      }
      // If 100% true- change 100% to fasle
      if (trueTaskCounter===list.length) {
        for (i=0 ; i<list.length ; i++) {
          list[i].complete = false;
        }
      }
      // If 100% false- change to 100% true
      else {
        for (i=0 ; i<list.length ; i++) {
          list[i].complete = true;
        }
      }
      displayTodo();
    }