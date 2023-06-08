document.querySelector("#salvar").addEventListener("click", cadastrar)

let tarefas = []

window.addEventListener("load", () => {
    tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
    atualizar()
})

document.querySelector("#busca").addEventListener("keyup", ()=> {
    let busca = document.querySelector("#busca").value
    let tarefasFiltradas = tarefas.filter((tarefa) =>{
        return tarefa.titulo.toLowerCase().includes(busca.toLowerCase())
    })
    filtrar(tarefasFiltradas)
})


function filtrar(tarefas){
    document.querySelector("#tarefas").innerHTML = ""
    tarefas.forEach((tarefa) =>{
        document.querySelector("#tarefas").innerHTML 
                    += createCard(tarefa)
    })
}

function atualizar(){
    document.querySelector("#tarefas").innerHTML = ""
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    tarefas.forEach((tarefa) =>{
        document.querySelector("#tarefas").innerHTML 
                    += createCard(tarefa)
    })
}

function cadastrar(){
    const titulo = document.querySelector("#titulo").value
    const descricao = document.querySelector("#descricao").value
    const categoria = document.querySelector("#categoria").value
    const prioridade = document.querySelector("#prioridade").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const tarefa = {
        id: Date.now(),
        titulo,
        descricao,
        categoria,
        prioridade,
        concluida: false
    }
    
    if (!validar(tarefa.titulo, document.querySelector("#titulo"))) return
    if (!validar(tarefa.descricao, document.querySelector("#descricao"))) return
    
    tarefas.push(tarefa)    
    
    atualizar()

    modal.hide()

}



function validar(valor, campo){
    if(valor == ""){
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }

    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
    return true
    
}

function apagar(id){

    tarefas = tarefas.filter((tarefa) => {
        return tarefa.id != id
    })
    atualizar()
 
}

function concluir(id){
    let tarefaEncontrada = tarefas.find((tarefa) => {
        return tarefa.id == id
    })
    tarefaEncontrada.concluida = true
    atualizar()
}


// Função para adicionar um novo item à tabela
function addItem() {
    var productName = document.getElementById("productName").value;
    var priority = document.getElementById("priority").value;
    var price = parseFloat(document.getElementById("price").value);

    var table = document.getElementById("consumptionTable");
    var row = table.insertRow(-1);

    var productNameCell = row.insertCell(0);
    productNameCell.innerHTML = productName;

    var priorityCell = row.insertCell(1);
    priorityCell.innerHTML = priority;

    var priceCell = row.insertCell(2);
    priceCell.innerHTML = price.toFixed(2);

    calcularTotal();
  }

  // Função para calcular o total
  function calcularTotal() {
    var table = document.getElementById("consumptionTable");
    var rows = table.rows;
    var total = 0;

    for (var i = 1; i < rows.length; i++) {
      var price = parseFloat(rows[i].cells[2].innerHTML);
      var subtotal = price;
      total += subtotal;
    }

    var totalElement = document.getElementById("total");
    totalElement.innerHTML = "<p>Total: R$ " + total.toFixed(2) + "</p>";
  }

  function preverGastoDespesas() {
    var numDespesas = parseInt(prompt("Digite o número de despesas:"));
  
    if (isNaN(numDespesas) || numDespesas <= 0) {
      alert("Número inválido de despesas. Por favor, digite um número válido.");
      return;
    }
  
    var valorTotal = 0;
  
    for (var i = 0; i < numDespesas; i++) {
      var valorDespesa = parseFloat(prompt("Digite o valor da despesa " + (i + 1) + ":"));
  
      if (isNaN(valorDespesa) || valorDespesa <= 0) {
        alert("Valor inválido da despesa. Por favor, digite um valor válido.");
        return;
      }
  
      valorTotal += valorDespesa;
    }
  
    alert("O valor total gasto para " + numDespesas + " despesa(s) é: R$ " + valorTotal.toFixed(2));
  }
  
  function redirecionar() {
    // Substitua 'https://www.exemplo.com' pelo link de destino desejado
    window.location.href = 'https://linktr.ee/yblastzz?utm_source=linktree_admin_share';
  }


  
function createCard(tarefa){
    let disabled = tarefa.concluida ? "disabled" : ""

    return `
            <div class="col-lg-3 col-md-6 col-12">
                <div class="card">
                    <div class="card-header">
                        ${tarefa.titulo}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${tarefa.descricao}</p>
                        <p>
                            <span class="badge text-bg-warning">${tarefa.categoria}</span>
                        </p>
                        <p>
                            <span class="badge text-bg-warning">${tarefa.prioridade}</span>
                        </p>
                        <a onClick="apagar(${tarefa.id})" href="#" class="btn btn-danger">
                            <i class="bi bi-trash"></i>
                        </a>
                    </div>
                </div> <!-- card -->
            </div> <!-- col -->
    ` //template literals
}