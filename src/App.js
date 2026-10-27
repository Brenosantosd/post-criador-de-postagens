import React , {useState} from "react"
import "./App.css"


//url = "https://jsonplaceholder.typicode.com/posts"

function App(){

const [titulo , setTitulo] = useState('')
const [mensagem , setMensagem] = useState('')
const [erro, setErro] = useState(false)
const [carregando , setCarregando] = useState(false)
const [conteudo , setConteudo] = useState(null)

const [comentarios , setComentarios] = useState([])

function handleComentario(e){
    e.preventDefault()
   
    // Limpa mensagem de erro
    setErro('')

    // Limpa espaços em branco do input

    if(mensagem.trim() === '' || titulo.trim() === ''){
        setErro(true)
        return;
    }

    // Previne campos vazios a serem enviados !

    if(titulo === '' || mensagem === ''){
        setErro(true)
        return; 
    }

    setCarregando(true)
   

     let url = "https://jsonplaceholder.typicode.com/posts"

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' //AVISA que é um json 
        },
        body: JSON.stringify({
            title: titulo,
            body: mensagem,
            userId: 1

        })
    })

     .then((r)=> r.json())
     .then((json)=>{
        console.log("Resposta correspondente do json" , json)
        setComentarios([...comentarios ,json])
        setCarregando(false)
        setTitulo('')
        setMensagem('')
     })

}

function handleExcluir(idParaExcluir){
   let novaLista = comentarios.filter((item)=> item.id !== idParaExcluir)
   setComentarios(novaLista);
}

    return(
        <div className="container">

            <header>
            <h1>Criador de Postagens para Blog (POST)</h1>
             
         <div className="nav">
             <a>Home</a>
             <a>Favoritos</a>
             <a>Sair</a>               
         </div>

            </header>

          <div className="card-form">
            <h1>Faça um comentário </h1>
            {erro && <p>Preencha os campos corretamente !</p>}
           <form onSubmit={handleComentario}>
            <label>Titulo: </label>
            <input type="text" placeholder="" value = {titulo} onChange={(e)=> setTitulo(e.target.value)} disabled = {carregando}/>
            <label>Comentário: </label>
            <input type="text" placeholder="Digite um comentário" value = {mensagem} onChange = {(e)=> setMensagem(e.target.value)}/>
             <div className="area-btn">
            <button type="submit">{carregando ? "Enviando" : "Enviar"}</button>
             </div>
                
           </form>

          </div>

          <div className="area-lista">
             {comentarios.map((item)=>{
                return(
                    <div key = {item.id} className="container-resultado">
                    <h2>Comentário adicionado com Sucesso !</h2>
                    <p><strong>id: </strong>{item.id}</p>
                    <p><strong>titulo: </strong>{item.title}</p>
                    <p><strong>comentário: </strong>{item.body}</p>


                  <button onClick = {()=> handleExcluir(item.id)}>Excluir</button>

                    </div>
                )
             })}
          </div>


        </div>
    )
}


export default App;