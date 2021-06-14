import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class Search extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired,
      }
    state = {
        query:"",
        searchResults:[]
    }
    
    queryUpdate = (query)=>{
        if(query!==""){
            this.setState(()=>(
                {
                    query:query
                }))
            this.booksUpdate(query)
        }
        else{
            this.setState(()=>({
                searchResults:[]
            }))
        }
        
    }
    booksUpdate = (query)=>{
        BooksAPI.search(query).then((searchResults)=>{
            this.setState(()=>({
                searchResults:searchResults
            }))
        }) 
    }
    updateShelf =(book,shelf)=>{
    book["shelf"]=shelf    
    this.props.update(book,shelf)
    }
    render(){
        const {books} = this.props 
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={(e)=>{this.queryUpdate(e.target.value)}} placeholder="Search by title or author"/>

              </div>
              
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {this.state.searchResults.length>0 && (this.state.searchResults.map((book)=>{
                      
                    const found = books.find((b)=>(b.id===book.id)) 
                    
                    return(
                    <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                    {book.imageLinks ?(<div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>)
                    :
                    (<div className="book-cover" style={{ width: 128, height: 192}}></div>)  
                    }
                      <div className="book-shelf-changer">
                          {found ? (<select value={found.shelf} onChange={(e)=>{this.updateShelf(book,e.target.value)}}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>)
                        :
                        (<select value="none"onChange={(e)=>{this.updateShelf(book,e.target.value)}}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>)}
                        
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                  </div>
                </li>
                )}))}
              
              </ol>
            </div>
          </div>        
          )
    }
}

export default Search