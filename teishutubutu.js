const titleInput=document.getElementById("title"); //提出物の名前
const subjectInput=document.getElementById("subject"); //提出物の科目
const deadlineInput=document.getElementById("deadline"); //提出期限
const addButton=document.getElementById("addbutton"); //追加ボタン
const tasklist=document.getElementById("tasklist"); //提出物リスト
const submittedList=document.getElementById("submittedList"); //提出済みリスト
let taskhistory=[]; //提出物履歴
//リストの表示内容の定数
const li=document.createElement("li");

//リストの内容
const tasks={
    title:titleInput.value,
    subject:subjectInput.value,
    deadline:deadlineInput.value,
    isSubmitted: false
    }; 

//履歴消去関数
function deleteTask(task){taskhistory = taskhistory.filter(t=>
            !(t.title === tasks.title &&
                t.subject === task.subject &&
                t.deadline === task.deadline))
            localStorage.setItem("tasks",JSON.stringify(taskhistory));
        } 

//課題をリストに追加する関数

const checkbox=document.createElement("input");
    checkbox.type="checkbox";

const isSubmitted=checkbox.checked;
function addTaskToList(_task,_isSubmitted = false){
    li.append(checkbox, document.createTextNode(`
        課題内容:${tasks.title},科目:${tasks.subject},締切:${tasks.deadline},${overdueText}
        `));
    li.append(deleteButton);
    };

//提出期限超過日数
    let overdueText="";
    const today=new Date();
    const deadlineDate=new Date(tasks.deadline);
    const diffTime=today-deadlineDate;
    const diffDays=Math.floor(diffTime/(1000*60*60*24));
    if (today>deadlineDate){
        overdueText=`【提出期限超過:${diffDays}日】`;
    };
    //提出期限を超過しており、提出済みのものを削除する
    checkbox.addEventListener("change",function(){
            task.isSubmitted=checkbox.checked;
            localStorage.setItem("tasks",JSON.stringify(taskhistory));
        });
    
    const deleteButton=document.createElement("button");
    deleteButton.textContent="🗑️delete";
    deleteButton.addEventListener("click",()=>{
        if(confirm("本当に消しますか？")){
            deleteTask(tasks);
            li.remove();
        } else{
            alert(deleteはキャンセルされました);
            return;
        }
    });
    if (isSubmitted){
        submittedList.appendChild(li); 
    } else{
        tasklist.appendChild(li);
    }

//取得
window.addEventListener("DOMContentLoaded",function(){
    const savedTasks = JSON.parse(localStorage.getItem("tasks")||"[]");
    taskhistory=savedTasks;
});

addButton.addEventListener("click",function(){
    addTaskToList(tasks);
    
    //入力されてるかの確認
    if(!tasks.title || !tasks.subject || !tasks.deadline){
        alert("すべての項目を入力してください")
        return;
    }; 

    if (exists) {
        alert("この課題は既に追加されています");
        return;
    }
    
    taskhistory.push(tasks);
    localStorage.setItem("tasks",JSON.stringify(taskhistory));

    titleInput.value="";
    subjectInput.value="";
    deadlineInput.value="";
});
