import { useState,useEffect} from "react"
import { debounce } from "lodash"
import "./SearchBar.css"

export const SearchBar = ({ onSearchChange }) => {
    const [inputValue, setInputValue] = useState('')

    const debounceSearch = debounce((value) => {
        onSearchChange(value)
    }, 500);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        debounceSearch(e.target.value)
    };

    useEffect(() => {
    return () => debounceSearch.cancel();
  }, []);

    return (
        <input type="text" placeholder="Search notes..." onChange={handleChange} className="search-bar"/>
    );

};