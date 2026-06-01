import { useState, memo, useContext } from "react";
import "./tarefas.css";
import { UserContext } from "../contexts/userContext";
import { API_URL } from "./ListaTarefas";

function Tarefas({ texto, id }) {

    const [concluida, setConcluida] = useState(false);
    const { usuario } = useContext(UserContext);

    const alternarConcluida = () => {
        setConcluida(!concluida);
        const novoStatus = !concluida;

        const dadosAtualizados = {
            id: id,
            usuario: usuario.nome,
            texto: texto,
            concluida: novoStatus
        };
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Falha na resposta do servidor');
                }
                return res;
            })
            .then(() => {
                setConcluida(novoStatus);
            })
            .catch(error => console.error("Erro ao atualizar tarefa:", error));
    };

    return (
        <li><input type="checkbox" onChange={alternarConcluida} /><span className={concluida ? 'concluida' : ''}>{texto}</span></li>
    )

}
export default memo(Tarefas);