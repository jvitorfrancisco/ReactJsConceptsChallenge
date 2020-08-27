import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const repository = res.data;

    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`/repositories/${id}`);

    if(res.status !== 204) return;

    const temp = repositories;
    const index = temp.findIndex(r => r.id === id);

    if(index < 0)
      return;
  
      temp.splice(index, 1);

      setRepositories([...temp])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(e => 
        <li key={e.id}>
          {e.title}  
          <button onClick={() => handleRemoveRepository(e.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;