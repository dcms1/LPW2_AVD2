import {useEffect,useState} from 'react';
import {api} from "../../service/api";
import {GrLike,GrDislike} from "react-icons/gr"
import {Container,Action} from "./styles"
import {AiFillDelete} from "react-icons/ai"
interface IEvents{
    id: string;
    nomeevento: string;
    local: string;
    diasemana: string;
    horario: string;
    like: number;
    dislike: number;
}

export function Dashboard(){
    const [events,setEvents]= useState<IEvents[]>([])

    async function loadData() {
        const dados = await api.get('/events').then((response) => response.data)
        setEvents(dados);
    }
    useEffect(() => {loadData()},[]);

    function deleteEvent(id: string) {
        api.delete("/events/"+id);
        loadData()
    }

    function addLike (id: string)  {
        api.post("/events/like/"+id);
        loadData();
    };

    function addDislike (id: string) {
        api.post("/events/dislike/"+id);
        loadData();
    };

    return(
    <Container>
      {events.map((event) => (
        <div key={event.id} className="event">
          <p>
            <h4>Nome do Evento:</h4> {event.nomeevento}
          </p>
          <p>
            <h4>Local:</h4> {event.local}
          </p>
          <p>
            <h4>Dia da semana:</h4> {event.diasemana}
          </p>
          <p>
            <h4>Horário:</h4> {event.horario}
          </p>

          <div className="like-box">
            <p>
              <h4>Like:</h4> {event.like}
            </p>
            <p>
              <h4>Dislike:</h4> {event.dislike}
            </p>
          </div>
        <Action>
          <div className="button-container">
            <button type="button"  onClick={() => {
                    addLike(event.id);
                }}>
                <GrLike size={35}/>
            </button>

            <button onClick={() => {
                    addDislike(event.id);
                }}>
                <GrDislike size={35}/>
            </button>

            <button onClick={() => {
                  deleteEvent(event.id);
                }}>
                <AiFillDelete size={35}/>
            </button>
          </div>
        </Action>
        </div>
      ))}
    </Container>
    )
}