import { useEffect, useState, FormEvent } from "react";
import { api } from "../../service/api";
import Modal from "react-modal";
import { Container } from "./styles";
import {RiCloseCircleFill} from "react-icons/ri";


interface NewModal {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalList({ isOpen, onRequestClose }: NewModal) {
    const [event, setEvent] = useState("");
    const [local, setLocal] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");

    async function Submitdata(events: React.FormEvent) {
      events.preventDefault();
  
      const dados = {
        nomeevento: event,
        local: local,
        diasemana: day,
        horario: time,
      };
  
      console.log({ dados });
      onRequestClose();
      await api.post("/events", dados);

      await api.get("/events")
    }
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <RiCloseCircleFill />
        </button>
  
        <Container onSubmit={Submitdata}>
          <h2>Entre com o novo evento</h2>
  
          <input
            type="text"
            name="nomeevento"
            value={event}
            placeholder="Nome do Evento"
            onChange={(e) => setEvent(e.target.value)}
          />
  
          <input
            type="text"
            name="local"
            value={local}
            placeholder="Local do Evento"
            onChange={(e) => setLocal(e.target.value)}
          />
  
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="Domingo">Domingo</option>
            <option value="Segunda-feira">Segunda-feira</option>
            <option value="Terça-feira">Terça-feira</option>
            <option value="Quarta-feira">Quarta-feira</option>
            <option value="Quinta-feira">Quinta-feira</option>
            <option value="Sexta-feira">Sexta-feira</option>
          </select>
           
  
          <input
            type="time"
            name="horario"
            value={time}
            placeholder="Horário"
            onChange={(e) => setTime(e.target.value)}
          />
  
          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    );
  }
  