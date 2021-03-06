function clickPassei(materia){
    this.materia = document.getElementById(materia) 
    
    // Verde forte
    this.materia.className = "verde-forte"
    // Transformar para verde forte os pré-requisitos desta matéria
    let materiasDesbloqueio1 = JSON.parse(document.getElementById(materia).dataset.prerequisites)
    for (let i in materiasDesbloqueio1) {
        if (materiasDesbloqueio1[i] != ""){
            document.getElementById(materiasDesbloqueio1[i]).className = "verde-forte"
        }
    }


    // Verde fraco
    let materiasDesbloqueio = JSON.parse(this.materia.dataset.desbloqueia)
    if (materiasDesbloqueio[0] !== "") {
        for (let e in materiasDesbloqueio){
            document.getElementById(materiasDesbloqueio[e]).className = "verde-fraco"
        }
    }


    // Voltar cores ao normal caso tenha sido antes bloqueado
    let materiasNormal = JSON.parse(this.materia.dataset.bloqueia)
    for (let e in materiasNormal){
        let materiaRequisito = JSON.parse(document.getElementById(materiasNormal[e]).dataset.prerequisites)
        if ((document.getElementById(materiasNormal[e]).className !== "verde-fraco" &&
        document.getElementById(materiasNormal[e]).className !== "verde-forte")){
            // Checa se algum requisito dessa matéria já não está "perdido", ou seja, vermelho forte ou vermelho fraco

            for (let i in materiaRequisito) {
                if (!(materiasNormal.find(element => element === materiaRequisito[i]))){
                    if (document.getElementById(materiaRequisito[i]).className === "vermelho-forte" ||
                    document.getElementById(materiaRequisito[i]).className === "vermelho-fraco"){
                        document.getElementById(materiasNormal[e]).className = "vermelho-fraco"
                        break
                    } else {
                        document.getElementById(materiasNormal[e]).className = "normal"
                    }
                }
            }
        }
        
        /* Checar se existem matérias com todos pré-requisitos preenchidos.
           A variável contarPassados contará quais matérias pré-requisitos já estão passadas.
           Se todas estiverem, a matéria que contêm esses pré-requisitos será liberada. */
        let contarPassados = 0 

        for (let i in materiaRequisito){
            if (document.getElementById(materiaRequisito[i]).className === "verde-forte"){
                contarPassados++
            }
        }

        if (contarPassados == materiaRequisito.length) {
            document.getElementById(materiasNormal[e]).className = "verde-fraco"
        }
    }
}


function clickPerdi(materia){
    this.materia = document.getElementById(materia)

    // Vermelho forte
    this.materia.className = "vermelho-forte"
    // Vermelho fraco
    let materiasBloqueio = JSON.parse(this.materia.dataset.bloqueia)
    if (materiasBloqueio[0] !== ""){
        for (let e in materiasBloqueio){
            document.getElementById(materiasBloqueio[e]).className = "vermelho-fraco"
        }
    }
}