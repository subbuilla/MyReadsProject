import React, {Component} from 'react'
import PropTypes from 'prop-types';


class CurrentlyReading extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired,
      }

    updateShelf =(book,shelf)=>{
        this.props.update(book,shelf)

    }
    
    render(){
        const {books} = this.props
        const currentlyReading= books.filter((book)=>(book.shelf.toLowerCase()==="currentlyreading"))
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {currentlyReading.map((book)=>(
                    <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                      <div className="book-shelf-changer">
                        <select value='currentlyReading' onChange={(e)=>{this.updateShelf(book,e.target.value)}}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading" >Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
                  ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default CurrentlyReading