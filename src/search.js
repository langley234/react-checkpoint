import App from 'App.js'
import Search from 'search.css'

class Search extends React.Component
{
    constructor (props)
    {
        super(props)
        this.search = ''

        this.userSearched = this.userSearched.bind(this)
    }

    render() 
    {
        return 
        (
            <div class="search-bar">
                <input type='text' placeholder="Search">
                <button>Search</button>
            </div>
        )
    }
}

export default Search