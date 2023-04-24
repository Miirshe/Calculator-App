let buttons =document.querySelectorAll("button");
let opInput = document.querySelector("#ope-input");
let resInput = document.querySelector("#rest-input");
let historyIcon = document.querySelector(".history-icon");
let historyPage = document.querySelector(".history-page");
let historyOperation= document.querySelector(".history-operation");
let DeleteHis = document.querySelector(".fa-trash");
let valueOne = 0 ;
let valuetwo = 0;
let operations = " ";
let option2 = false;
Allvalue = (JSON.parse(localStorage.getItem("operations"))||[]);
ShowHistory();
historyIcon.addEventListener("click",()=>{
    historyPage.classList.toggle("active");
    ShowHistory();
    historyElement = document.querySelectorAll(".history-element");
    historyElement.forEach( element =>{
        element.addEventListener("click",(e)=>{
            opInput.value = e.target.parentElement.children[0].value;
            resInput.value = e.target.parentElement.children[1].value;
        })
    })
})
DeleteHis.style.cursor = 'pointer';
DeleteHis.addEventListener("click", ()=>{
    deletHistory();
    ShowHistory();
})

buttons.forEach( (btn)=>{
    btn.addEventListener("click" , ( )=>{
        if(btn.classList.contains("clear-all") || btn.classList.contains("clear") ){

            // Clear-all & clear 

            if(btn.classList.contains("clear")){
                if(resInput.value > 0){
                    Clears(resInput);
                }else{
                    Clears(opInput);
                }
            }else{
                ClearAll();
            }

        }else if(btn.classList.contains("operation")){
            // Operations
            if(btn.value != "="){
                option2=true;
                valueOne = opInput.value;
                operations = btn.value;
            }else{
                if(option2){
                    let sum = `${(valueOne)} ${operations} ${(valuetwo)}`;
                    resInput.value = `${eval(sum)}`;
                    let currentOperations = {
                        val1 : valueOne,
                        op : operations,
                        val2 : valuetwo,
                        // result : resInput.value
                    }
                    Allvalue.push(currentOperations);
                    localStorage.setItem("operations", JSON.stringify(Allvalue));
                    valueOne = 0;
                    valuetwo = 0;
                    operations = " ";

                }
            }
        }else{

            if(option2){
                valuetwo == 0 ? valuetwo = btn.value : valuetwo += btn.value;
                opInput.value= `${valueOne} ${operations} ${valuetwo}`
            }
            else{
                opInput.value == 0 ? opInput.value = btn.value : opInput.value += btn.value;
            }
        }
    })
})


const Clears = (input)=>{
    let currentValue = input.value.split('');
    let newValue = currentValue.pop();
    if(currentValue.length > 0){
        input.value = currentValue.join("");
    }else{
        input.value = 0;
        option2 = false;
        valueOne = 0 ;
        valuetwo = 0 ;
        operations = " ";
        
    }
}

const ClearAll= ()=>{
    opInput.value = 0;
    resInput.value = 0;
    option2 = false;
    valueOne = 0 ;
    valuetwo = 0 ;
    operations = " ";
}
function ShowHistory(){
    let ops = "";
    if(Allvalue.length > 0 ){
        Allvalue.forEach( op =>{
            let current = `${(op.val1) } ${(op.op)} ${(op.val2)}`
            ops +=`<div class="history-element">
            <input type="text" id="ope-input" class="cal-input" value="${op.val1} ${op.op} ${op.val2}" disabled>
            <input type="text" id="rest-input" class="cal-input" value="${eval(current)}" disabled>
            </div><hr/>
            `
        })
    }else{
        ops = "<h5>We don't have any history</h5>";
    }
    historyOperation.innerHTML= ops;
}

function deletHistory(){
    localStorage.clear();
    Allvalue = [];
}



