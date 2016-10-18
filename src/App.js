import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Modal
} from 'react-bootstrap';


class App extends Component {
    constructor(){
        super()
    }

    state = {
        artist: "",
        title: "",
        album: "",
        rate: "",
        movies: [],
        no: "",
	    suggestion:"",
        records:[],
        show: false,
        selectedArtist: "",
        
	    selectedRate: "",
        selectedMovies: [],
        selectedNo: "",
        selectedsuggestion: "",
        selectedId: ""
    };


/*-------------------------------------------------------------*/
    componentDidMount(){

        this.refreshData();
    }

     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };

    modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedMovies;
            state[fieldName] = targetArray;
            this.setState(state.selectedMovies);
        }
    };


    saveSurvey = ()=> {
/*-------------------------------------------------------------*/
       
        var data = {artist: this.state.artist,
                    title: this.state.title,
                    album: this.state.album,
                    no: this.state.no,
                    suggestion:this.state.suggestion,
                    rate: this.state.rate,
                    movies: this.state.movies};
         console.log(data);
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {
                    console.log('delete');
                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };
    
    editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        artist: data.artist,
                        title: data.title,
                        album: data.album,
                        
                    })
                }).catch((error)=>{
                    
                });
        };
    };

    openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedArtist: data.artist,
                        selectedTitle: data.title,
                        selectedAlbum: data.album,
                        selectedRate: data.rate,
                        selectedMovies: data.movies,
                        selectedNo: data.no,
			selectedsuggestion: data.suggestion,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.artist);
                }).catch((error)=>{
                    
                });

            };
        };

    

    saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {artist: this.state.selectedArtist,
                         title: this.state.selectedTitle,
                        album: this.state.selectedAlbum,
                        rate: this.state.selectedRate,
                        no: this.state.selectedNo,
			            suggestion: this.state.selectedsuggestion,
                        movies: this.state.selectedMovies};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                selectedTitle: "",
                selectedAlbum: "",
                selectedRate: "" ,
                selectedNo: "" ,
                selectedMovies: [] ,
		        selectedsuggestion: "",
                selectedArtist: ""
            });
        }
    };


    render() {

        var rows  = this.state.records.map((item,i)=>{






            return (
                <tr key={i}>
                     <td><Button  bsStyle="warning" onClick={this.deleteItem(item.id)}>Delete</Button></td>
                     <td><Button  bsStyle="warning" onClick={this.openModal(item.id)}>Edit</Button></td>
                     <td>{item.id}</td>
                     <td>{item.artist}</td>
                     <td>{item.title}</td>
                     <td>{item.album}</td>
                    
                     <td>{
                         item.movies.map((movie, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{movie}</span>
                                 </div>
                         })

                      }
                     </td>
                     <td>{item.no}</td>
                      <td>{item.rate}</td>
		     
                </tr>
            );
        });
        
        let close = () => this.setState({ show: false })



        return (
            <div className="container">
                <h1> {this.state.suway} </h1>
                <div className="playlist">
                <center><h4>C R E A T E - P L A Y L I S T</h4></center>

                    
                </div>

                <div className="jumbotron">
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <Form>
                                    <FormGroup>
                                        <ControlLabel>Contributing Artist</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Artist"
                                            value={this.state.artist}
                                            onChange={this.onChange('artist')}
                                            />
                                        
                                    </FormGroup>


                                    <FormGroup>
                                        <ControlLabel>Song Title</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Title"
                                            value={this.state.title}
                                            onChange={this.onChange('title')}
                                            />
                                        
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Album</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Album"
                                            value={this.state.album}
                                            onChange={this.onChange('album')}
                                            />
                                        
                                    </FormGroup>


                                  
                                     {/*-------------------------------------------------------------------------*/}
                                    <FormGroup>
                                        <ControlLabel>Genre</ControlLabel>
                                        <Checkbox value="Rock"
                                                  checked={this.state.movies.indexOf('Rock')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Rock 
                                        </Checkbox>
                                        <Checkbox value="Jazz"
                                                  checked={this.state.movies.indexOf('Jazz')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Jazz
                                        </Checkbox>
                                        <Checkbox value="Hip-Hop"
                                                  checked={this.state.movies.indexOf('Hip-Hop')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Hip-Hop
                                        </Checkbox>
                                        <Checkbox value="Raggae"
                                                  checked={this.state.movies.indexOf('Raggae')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Raggae
                                        </Checkbox>
                                        <Checkbox value="Experimental"
                                                  checked={this.state.movies.indexOf('Experimental')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Experimental
                                        </Checkbox>
                                    </FormGroup>
                                     {/*-------------------------------------------------------------------------*/}
                                     <FormGroup>
                                                    <ControlLabel>Track No.</ControlLabel>
                                                    <FormControl componentClass="select"
                                                                placeholder="no"
                                                                value={this.state.no}
                                                                onChange={this.onChange('no')}
                                                        >
                                                        <option value="01">01</option>
                                                        <option value="02">02</option>
                                                        <option value="03">03</option>
                                                        <option value="04">04</option>
                                                        <option value="05">05</option>
                                                        <option value="06">06</option>
                                                        <option value="07">07</option>
                                                        <option value="08">08</option>
                                                        <option value="09">09</option>
                                                        <option value="10">10</option>
                                                    </FormControl>
                                        </FormGroup>

                               
  {/*-------------------------------------------------------------------------*/}
                                    <FormGroup>
                                                    <ControlLabel>Ranking</ControlLabel>
                                                    <FormControl componentClass="select"
                                                                placeholder="rate"
                                                                value={this.state.rate}
                                                                onChange={this.onChange('rate')}
                                                        >
                                                        <option value="★">★</option>
                                                        <option value="★★">★★</option>
                                                        <option value="★★★">★★★</option>
                                                        <option value="★★★★">★★★★</option>
                                                        <option value="★★★★★">★★★★★</option>
                                                    </FormControl>
                                        </FormGroup>




{/*------------------------------------------------------------------------------------------------------------------------------- */}





                                    <ButtonGroup>







                                        <Button bsStyle="primary" onClick={this.saveSurvey}>Add To Playlist</Button>

                                    </ButtonGroup>
                                </Form>
                            </Col>

{/*End of the col */}

{/*start of the col */}
{/*------------------------------------------------------------------------------------------------------------------------------- */}


                            <Col md={6}>
                            

                                <Table condensed hover>
                                    <thead>
                                    <tr>
                                        <th>Delete</th>
                                        <th>Edit</th>
                                        <th>ID</th>
                                        <th>Artist</th>
                                        <th>Title</th>
                                        <th>Album</th>
                                        <th>Genre</th>
                                        <th>No.</th>
                                        <th>Ranking</th>
				
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Grid>

                </div>
                 <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title"><div className="note"></div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                                                <FormGroup>
                                                    <ControlLabel>Contributing Artist</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Artist"
                                                        value={this.state.selectedName}
                                                        onChange={this.modalonChange('selectedName')}
                                                        />
                                                   
                                                </FormGroup>

                                                <FormGroup>
                                                    <ControlLabel>Song Title</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="title"
                                                        value={this.state.selectedTitle}
                                                        onChange={this.modalonChange('selectedTitle')}
                                                        />
                                                   
                                                </FormGroup>

                                                <FormGroup>
                                                    <ControlLabel>Album</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="album"
                                                        value={this.state.selectedAlbum}
                                                        onChange={this.modalonChange('selectedAlbum')}
                                                        />
                                                   
                                                </FormGroup>

         

                                                <FormGroup>
                                        <ControlLabel>Genre</ControlLabel>
                                        <Checkbox value="Rock"
                                                  checked={this.state.selectedMovies.indexOf('Rock')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Rock 
                                        </Checkbox>
                                        <Checkbox value="Jazz"
                                                  checked={this.state.selectedMovies.indexOf('Jazz')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Jazz
                                        </Checkbox>
                                        <Checkbox value="Hip-Hop"
                                                  checked={this.state.selectedMovies.indexOf('Hip-Hop')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Hip-Hop
                                        </Checkbox>
                                        <Checkbox value="Raggae"
                                                  checked={this.state.selectedMovies.indexOf('Raggae')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Raggae
                                        </Checkbox>
                                        <Checkbox value="Experimental"
                                                  checked={this.state.selectedMovies.indexOf('Experimental')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Experimental
                                        </Checkbox>
                                    </FormGroup>
                                               
						<FormGroup>
                                                    <ControlLabel>Track No.</ControlLabel>
                                                    <FormControl componentClass="select"
                                                                placeholder="no"
                                                                value={this.state.selectedNo}
                                                                onChange={this.onChange('selectedNo')}
                                                        >
                                                        <option value="01">01</option>
                                                        <option value="02">02</option>
                                                        <option value="03">03</option>
                                                        <option value="04">04</option>
                                                        <option value="05">05</option>
                                                        <option value="06">06</option>
                                                        <option value="07">07</option>
                                                        <option value="08">08</option>
                                                        <option value="09">09</option>
                                                        <option value="10">10</option>
                                                    </FormControl>
                                        </FormGroup>
					 


					
                                         <FormGroup>
                                                    <ControlLabel>Ranking</ControlLabel>
                                                    <FormControl componentClass="select"
                                                                placeholder="rate"
                                                                value={this.state.selectedRate}
                                                                onChange={this.modalonChange('selectedRate')}
                                                        >
                                                        <option value="★">★</option>
                                                        <option value="★★">★★</option>
                                                        <option value="★★★">★★★</option>
                                                        <option value="★★★★">★★★★</option>
                                                        <option value="★★★★★">★★★★★</option>
                                                    </FormControl>
                                        </FormGroup>

	




						 <ButtonGroup>

                                                    <Button bsStyle="primary" onClick={this.saveEdit(this.state.selectedId)}>Save</Button>

                                                </ButtonGroup>
                                            </Form>
                            </Modal.Body>
                        </Modal>
                        </div>
            </div>
        );
    }
}

export default App;