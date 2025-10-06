const titleInput=document.getElementById("title"); //提出物の名前
const subjectInput=document.getElementById("subject"); //提出物の科目
const deadlineInput=document.getElementById("deadline"); //提出期限
const addButton=document.getElementById("addbutton"); //追加ボタン
const tasklist=document.getElementById("tasklist"); //提出物リスト
const submittedList=document.getElementById("submittedList"); //提出済みリスト
let taskhistory=[]; //提出物履歴
//履歴消去関数
function deleteTask(task){taskhistory = taskhistory.filter(t=>
            !(t.title === task.title &&
                t.subject === task.subject &&
                t.deadline === task.deadline))
            localStorage.setItem("tasks",JSON.stringify(taskhistory));
        } 

//課題をリストに追加する関数
function addTaskToList(task,isSubmitted = false){
    const li=document.createElement("li");
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked = isSubmitted;

//提出期限超過日数
    let overdueText="";
    const today=new Date();
    const deadlineDate=new Date(task.deadline);
    const diffTime=today-deadlineDate;
    const diffDays=Math.floor(diffTime/(1000*60*60*24));
    if (today>deadlineDate){
        overdueText=`【提出期限超過:${diffDays}日】`;
    }

    li.append(checkbox, document.createTextNode(`
        課題内容:${task.title},科目:${task.subject},締切:${task.deadline},${overdueText}
        `));
    //提出期限を超過しており、提出済みのものを削除する
    checkbox.addEventListener("change",function(){
        if (checkbox.checked){
            submittedList.appendChild(li);
            setTimeout(()=>{
                if (checkbox.checked,diffDays>0){
                    deleteTask(task);
                    li.remove();
                }
            },1000);
            } else{
                tasklist.appendChild(li);
            }
        });
    

    const deletebutton=document.createElement("button");
    deletebutton.textContent="🗑️delete";
    deletebutton.addEventListener("click",function(){
        deleteTask(task);
        li.remove();
    });
    li.append(deletebutton);
    if (isSubmitted){
        submittedList.appendChild(li); 
    } else{
        tasklist.appendChild(li);
    }
}
//取得
window.addEventListener("DOMContentLoaded",function(){
    const savedTasks = JSON.parse(localStorage.getItem("tasks")||"[]");
    taskhistory=savedTasks;
    savedTasks.forEach(task=>addTaskToList(task));
});

addButton.addEventListener("click",function(){
    //提出内容の定数
    const task={
        title:titleInput.value,
        subject:subjectInput.value,
        deadline:deadlineInput.value
    }; 

    //入力されてるかの確認
    if(!task.title || !task.subject || !task.deadline){
        alert("すべての項目を入力してください")
        return;
    }; 

    //存在の確認ができる定数
    const exists = taskhistory.some(t=>
        t.title === task.title &&
        t.subject === task.subject &&
        t.deadline === task.deadline
    ); 
    if (exists) {
        alert("この課題は既に追加されています");
        return;
    }

    taskhistory.push(task);
    localStorage.setItem("tasks",JSON.stringify(taskhistory));
    
    //deadlineを昇順にする
    taskhistory.sort((a,b)=> new Date(a.deadline)-new Date(b.deadline));
    
    tasklist.innerHTML="";
    submittedList.innerHTML="";
    taskhistory.forEach(t=>addTaskToList(t));
    
    titleInput.value="";
    subjectInput.value="";
    deadlineInput.value="";
});