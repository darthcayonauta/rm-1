import { Button } from 'bootstrap';
import React from 'react';
//tratare de replicar lo de rick y morty
//los estilos faltan....
function CharacterCard(props)
{
 const {character} = props;
 return ( <div className="CharacterCard" >
       <div className="some">
           <img src={character.image}></img>
          {character.name}   
        </div> 
 </div> );
}


class MyPage extends React.Component{

    state = {
        nextPage:1,
        loading:true,
        error:null,
        data:{results:[]}
         };

    componentDidMount(){
        this.fetchCharacters();
    }
    
    //el await lo colocas siempre y cuando sea una funcion asincronica
    fetchCharacters = async () =>{
        this.setState({loading:true, error:null});

        try {

            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`);
            const data = await response.json();
    
            this.setState({
                loading:false,
                data:{
                    info: data.info,
                    results:[].concat(this.state.data.results,data.results) 
                },
                nextPage:this.state.nextPage +1 
            });            
        } catch (error) {
            this.setState({
                loading:false,
                error:error}); 
        }

    }


    render() {

        if( this.state.error )
        {
            return `Error:${this.state.error.message}`;
        }

        return(<div className="container">
            <div className="App">
                <ul className="row">
                    {this.state.data.results.map( character=>(
                        <li className="col-6 col-sm-3" key={character.id}>
                           <CharacterCard character={character} />
                        </li>
                    ) )}
                </ul>
        
               {  this.setState.loading && (
                  <div className="loader">
                      <h1> Cargando - sin imagen</h1>
                  </div> 
               )}    





                {!this.setState.loading && (
                    <button onClick={ ()=>{  this.fetchCharacters() }}>Load More</button>
                )}



            </div>
        </div>
        
        
        );
    }


}

export default  MyPage;