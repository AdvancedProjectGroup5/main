import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Movies.css";
import axios from "axios";

const MoviesPage = () => {
    // const predefinedLanguages = [
    //     "English",
    //     "Japanese",
    //     "Hindi",
    //     "Spanish",
    //     "French",
    //     "German",
    //     "Mandarin",
    //     "Korean",
    //     "Italian",
    //     "Arabic",
    //     "Portuguese",
    //     "Russian",
    //     "Bengali",
    //     "Punjabi",
    // ];
    //
    // const predefinedGenres = [
    //     "Comedy",
    //     "Romance",
    //     "Action",
    //     "Drama",
    //     "Thriller",
    //     "Horror",
    //     "Sci-Fi",
    //     "Fantasy",
    //     "Adventure",
    //     "Mystery",
    //     "Animation",
    //     "Documentary",
    // ];

    const navigate = useNavigate();

    const [genres, setGenres] = useState([]); // fetch genres from backend
    const [languages, setLanguages] = useState([]); // fetch languages from backend

    const [searchTerm, setSearchTerm] = useState("");
    const [genreSearchTerm, setGenreSearchTerm] = useState(""); // New state for genre search
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]); // New state for selected genres
    const [activeFilter, setActiveFilter] = useState("genres");

    const [filteredMovies, setFilteredMovies] = useState([]);
    // const movies = [
    //     { title: "The Shawshank Redemption", year: 1994, rating: 9.3 },
    //     { title: "Inception", year: 2010, rating: 8.8 },
    //     { title: "The Godfather", year: 1972, rating: 9.2 },
    //     { title: "The Banshees of Inisherin", year: 2022, rating: 9.4 },
    //     { title: "Palm Springs", year: 2020, rating: 7.4 },
    //     { title: "Nomadland", year: 2020, rating: 7.5 },
    //     { title: "Fifty Shades of Grey", year: 2015, rating: 69 },
    // ];

    const movie = [];

    // Fetch genres from backend
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get("/genres");
                if (response.data && Array.isArray(response.data)) {
                    setGenres(response.data);
                    console.log("Fetched genres:", response.data);
                } else {
                    console.error("Unexpected genres data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching genres:", error.message);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get("/languages");
                setLanguages(response.data);
                console.log("Fetched genres:", response.data);
            } catch (error) {
                console.error("Error fetching languages:", error.message);
            }
        };

        fetchLanguages();
    }, []);


    const toggleFilter = (filter) => {
        setActiveFilter(activeFilter === filter ? null : filter);
    };

    const handleSelectLanguage = (language) => {
        if (!selectedLanguages.includes(language)) {
            setSelectedLanguages([...selectedLanguages, language]);
        }
        setSearchTerm(""); // Clear the search input
    };

    const handleRemoveLanguage = (language) => {
        setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
    };

    const handleSelectGenre = (genreName) => {
        if (!selectedGenres.includes(genreName)) {
            setSelectedGenres([...selectedGenres, genreName]);
        }
        setGenreSearchTerm(""); // Clear the genre search input
    };

    const handleRemoveGenre = (genre) => {
        setSelectedGenres(selectedGenres.filter((gen) => gen !== genre));
    };

    const handleSearch = async (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term) {
            // const results = movies.filter((movie) =>
            //     movie.title.toLowerCase().includes(term)
            // );
            // setFilteredMovies(results);
            try {
                const results = await axios.get("/movies/search", { params: { title: term } });
                setFilteredMovies(results.data);
            } catch (error) {
                console.error("Error fetching movies:", error.message);
            }
        } else {
            setFilteredMovies([]);
        }
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    return (
        <div className="movies-page">
            <div className="two-columns">
                {/* Filters Section */}
                <aside className="filters">
                    <h3>Filters</h3>
                    {/* Genres Filter */}
                    <div className="filter-group">
                        <h4 onClick={() => toggleFilter("genres")} className="filter-header">
                            Genres
                        </h4>
                        {activeFilter === "genres" && (
                            <div>
                                <div className="searchable-dropdown">
                                    <input
                                        type="text"
                                        placeholder="Search genre"
                                        value={genreSearchTerm}
                                        onChange={(e) => setGenreSearchTerm(e.target.value)}
                                    />
                                    {genreSearchTerm && (
                                        <ul className="dropdown-list">
                                            {/*{predefinedGenres*/}
                                            {genres
                                                .filter(
                                                    (genre) =>
                                                        genre.name.toLowerCase().includes(genreSearchTerm.toLowerCase()) &&
                                                        !selectedGenres.includes(genre.name)
                                                )
                                                .map((genre, index) => (
                                                    <li key={index} onClick={() => handleSelectGenre(genre.name)}>
                                                        {genre.name}
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="selected-languages">
                                    {selectedGenres.map((genre, index) => (
                                        <span key={index} className="selected-language">
                                            {genre}
                                            <button onClick={() => handleRemoveGenre(genre)}>✖</button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Rating Filter */}
                    <div className="filter-group">
                        <h4 onClick={() => toggleFilter("rating")} className="filter-header">
                            Rating
                        </h4>
                        {activeFilter === "rating" && (
                            <ul>
                                <li><input type="radio" id="1star" name="rating" /><label htmlFor="1star">1 Star</label></li>
                                <li><input type="radio" id="2star" name="rating" /><label htmlFor="2star">2 Stars</label></li>
                                <li><input type="radio" id="3stars" name="rating" /><label htmlFor="3stars">3 Stars</label></li>
                                <li><input type="radio" id="4stars" name="rating" /><label htmlFor="4stars">4 Stars</label></li>
                                <li><input type="radio" id="5stars" name="rating" /><label htmlFor="5stars">5 Stars</label></li>
                            </ul>
                        )}
                    </div>
                    {/* Release Date Filter */}
                    <div className="filter-group">
                        <h4 onClick={() => toggleFilter("release-date")} className="filter-header">
                            Release Date
                        </h4>
                        {activeFilter === "release-date" && <input type="date" />}
                    </div>
                    {/* Language Filter */}
                    <div className="filter-group">
                        <h4 onClick={() => toggleFilter("language")} className="filter-header">
                            Language
                        </h4>
                        {activeFilter === "language" && (
                            <div>
                                <div className="searchable-dropdown">
                                    <input
                                        type="text"
                                        placeholder="Search language"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <ul className="dropdown-list">
                                            {/*{predefinedLanguages*/}
                                            {languages
                                                .filter(
                                                    (language) =>
                                                        language.toLowerCase().includes(searchTerm.toLowerCase()) &&
                                                        !selectedLanguages.includes(language)
                                                )
                                                .map((language, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleSelectLanguage(language)}  // Select language when clicked
                                                    >
                                                        {language}
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="selected-languages">
                                    {selectedLanguages.map((language, index) => (
                                        <span key={index} className="selected-language">
                                            {language}
                                            <button onClick={() => handleRemoveLanguage(language)}>✖</button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="apply-button">Apply</button>
                </aside>

                {/* Search Bar Section */}
                <section className="search-bar">
                    <h1>Discover Movies</h1>
                    <p>Find the perfect movie for your mood</p>
                    <input
                        type="text"
                        placeholder="Search by title, genre, or actor"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button onClick={handleSearch}>Search</button>
                </section>
            </div>

            {/* Search Results */}
            <section className="search-results">
                <h2>Search Results</h2>
                <div className="movies-list">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie, index) => (
                            <div key={index} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
                                <div className="movie-poster">
                                    <img className="movie-poster" src={movie.image} />
                                </div>
                                <h3>{movie.title}</h3>
                                <p>{movie.year}</p>
                                <p>
                                    <strong>{movie.rating}</strong>
                                </p>
                            </div>
                        ))
                    ) : searchTerm ? (
                        <p>No results found for "{searchTerm}"</p>
                    ) : (
                        <p>Start typing to search for movies...</p>
                    )}
                </div>
            </section>

            {/* Popular Movies Section */}
            <section className="popular-movies">
                <h2>Popular Movies</h2>
                <p>Check out what's trending</p>
                <div className="movies-list">
                    <div className="movie-card">
                        <div className="movie-poster"></div>
                        <h3>The Shawshank Redemption</h3>
                        <p>1994</p>
                        <p><strong>9.3</strong></p>
                    </div>
                    <div className="movie-card">
                        <div className="movie-poster"></div>
                        <h3>Inception</h3>
                        <p>2010</p>
                        <p><strong>8.8</strong></p>
                    </div>
                    <div className="movie-card">
                        <div className="movie-poster"></div>
                        <h3>The Godfather</h3>
                        <p>1972</p>
                        <p><strong>9.2</strong></p>
                    </div>
                </div>
            </section>

            <div className="new-releases">
                <h2>New Releases</h2>
                <p>Fresh movies waiting for you</p>
                <div className="content-wrapper">
                    <div className="movies-grid">
                        <div className="movie-card">
                            <div className="movie-rating">9.4</div>
                            <div className="movie-poster"></div>
                            <p className="movie-genre">Comedy/Horror</p>
                            <h3>The Banshees of Inisherin</h3>
                            <p className="movie-year">2022</p>
                        </div>
                        <div className="movie-card">
                            <div className="movie-rating">7.4</div>
                            <div className="movie-poster"></div>
                            <p className="movie-genre">Comedy</p>
                            <h3>Palm Springs</h3>
                            <p className="movie-year">2020</p>
                        </div>
                        <div className="movie-card">
                            <div className="movie-rating">7.5</div>
                            <div className="movie-poster"></div>
                            <p className="movie-genre">Drama</p>
                            <h3>Nomadland</h3>
                            <p className="movie-year">2020</p>
                        </div>
                        <div className="movie-card">
                            <div className="movie-rating">7.5</div>
                            <div className="movie-poster"></div>
                            <p className="movie-genre">Drama</p>
                            <h3>Nomadland</h3>
                            <p className="movie-year">2020</p>
                        </div>
                    </div>
                    <div className="image-block">
                        <div className="placeholder-image"></div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MoviesPage;
