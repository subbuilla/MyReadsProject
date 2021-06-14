import React, {Component} from 'react'
import PropTypes from 'prop-types';

class Shelf extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired,
        shelf:PropTypes.string.isRequired,
        shelfTitle:PropTypes.string.isRequired
      }

    updateShelf = (book,shelf) =>{
        this.props.update(book,shelf)
    }
    
    render(){
        const {books} = this.props
        const bookRack = books.filter((book)=>(book.shelf.toLowerCase()===this.props.shelf.toLowerCase()))
        return (
            
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
            <div className="bookshelf-books">
                {bookRack.length>0 ?(<ol className="books-grid">
                  {bookRack.map((book)=>(
                    <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                    {book.imageLinks ?(<div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>)
                    :
                    (<div className="book-cover" style={{ width: 128, height: 192}}></div>)  
                    }
                      <div className="book-shelf-changer">
                        <select value={this.props.shelf} onChange={(e)=>{this.updateShelf(book,e.target.value)}}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                  </div>
                </li>
                  ))} 
              </ol>):(<p className="empty-shelf">Shelf is Empty</p>)}
              
            </div>
          </div>
        )
    }
}

export default Shelf