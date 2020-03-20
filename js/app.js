// CODE EXPLAINED channel

//Selecionar os elementos
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

//Nomes das classes
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"

//Variáveis
let LIST, id

//Pegar o item do localStorage
let data = localStorage.getItem("TODO")
if(data)   //Checa se data não está vazio
{
    LIST = JSON.parse(data)
    id = LIST.length            //Set the ID to the last one in the list
    loadList(LIST)              //Load the list to the user interface     
}
else
{
    LIST = []
    id = 0
}

//Load items to the user's interface
function loadList (array)
{
    array.forEach
    (
        function (item)
        {
            addToDo (item.name, item.id, item.done, item.trash)
        }
    )
}


//
clear.addEventListener
(
    "click",
    function ()
    {
        localStorage.clear()
        location.reload()
    }
)


//Exibe a data de hoje
const options = {weekday:"long", month:"short", day:"numeric"}
const today = new Date()
dateElement.innerHTML = today.toLocaleDateString("en-US", options)

//Função que adiciona um TODO item
function addToDo(toDo, id, done, trash)
{
    if(trash) {return}

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : ""

    const item = `
                    <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                `
    const position = "beforeend"
    list.insertAdjacentHTML(position, item)
}

//Adiciona um item na lista quando aperta Enter
document.addEventListener
(
    "keyup",
    function(event)
    {
        //Checa se a tecla apertada é o enter (keycode 13)
        if (event.keyCode == 13)
        {
            //Pega o valor que estava no campo de texto
            const toDo = input.value

            //Checa se o toDo não está vazio
            if (toDo)
            {
                //Chama a função que adiciona o item e passa o valor que estava no campo de texto
                addToDo(toDo, id, false, false)

                LIST.push
                (
                    {
                        name : toDo,
                        id : id,
                        done : false,
                        trash : false
                    }
                )

                //Adicionar o item ao localStorage
                localStorage.setItem("TODO", JSON.stringify(LIST))

                id++
            }
            //Limpa o campo de texto
            input.value = ""
        }
    }
)

//Função que marca como concluído o item ao clicar no círculo
function completeToDo(element)
{
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)
    
    LIST[element.id].done = LIST[element.id].done ? false : true
}

//Função que remove o item da lista
function removeToDo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true
}

//Target the items created dynamically
list.addEventListener
(
    "click",
    function(event)
    {
        const element = event.target
        const elementJob = element.attributes.job.value

        if (elementJob == "complete")
        {
            completeToDo(element)
        }
        else if (elementJob == "delete")
        {
            removeToDo(element);
        }

        //Adicionar o item ao localStorage
        localStorage.setItem("TODO", JSON.stringify(LIST))
    }
)
