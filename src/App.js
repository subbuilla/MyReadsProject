import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route,Link} from 'react-router-dom'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[]
  }
  componentDidMount(){
    this.getAllBooks()
    }

     getAllBooks = ()=>{
      BooksAPI.getAll().then((books)=>{
        this.setState(()=>(
          {
            books:books
          }
        ))
      })
    }
  
  addBook = (book,shelf)=>{
    this.setState((currentState)=>(
      {
        books:currentState.books.concat([book])
      }
    ))
    BooksAPI.update(book,shelf).then(()=>{this.getAllBooks()})

  }

  updateShelf = (book,shelf)=>{
    const found = this.state.books.find((b)=>(b.id===book.id))
      if(found){
        this.setState((currentState)=>(
          {books : currentState.books.map((b)=>{
            if(book.id===b.id){
              b.shelf = shelf
            }
            return b;
          })
          }))
        BooksAPI.update(book,shelf)
        }
        else{
          this.addBook(book,shelf)
        }
    
   
  }
  
  render() {
    return (
      <div className="app">  
          <div>
          <Route exact path="/" render={()=>(<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
             <CurrentlyReading books={this.state.books} update={this.updateShelf}/>
             <WantToRead books={this.state.books} update={this.updateShelf}/> 
             <Read books={this.state.books} update={this.updateShelf}/>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search" className="link-tag" >Add a book</Link>
          </div>
        </div>)}/>
          <Route exact path="/search" render={()=>(<Search books={this.state.books} update={this.updateShelf}/>)}/>
        </div> 
      </div>
    )
  }
}

export default BooksApp
