import { useState, memo } from "react";
import "./tarefas.css";
import { UserContext } from "../contexts/UserContext";
import { API_URL } from "./ListaTarefas";

function Tarefas({ texto, id }) { 

    const [concluida, setConcluida] = useState(false);

    const alternarConcluida = () => {
        setConcluida(!concluida);
        const novoStatus = !concluida; 

        const dadosAtualizados = {
            id: id,
            texto: texto,
            concluida: novoStatus
        };
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        })
            .then(res => res.json())
            .then(() => {
                // 4. Só atualiza a tela se a API aceitou a mudança
                setConcluida(novoStatus);

            })
            .catch(error => console.error("Erro ao atualizar tarefa:", error));
    };

    return (
        <li><input type="checkbox" onChange={alternarConcluida} /><span className={concluida ? 'concluida' : ''}>{texto}</span></li>
    )

}
export default memo(Tarefas);