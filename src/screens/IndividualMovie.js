import { useEffect, useState} from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from "../context/AuthContext"
import './IndividualMovie.css'

export default function IndividualMovie() {
    const { movieId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [movieDetail, setMovieDetail] = useState({id: 0, title: "", overview: "", releaseDate: "", genres: [], voteAverage: 0, posterUrl: "", backdropUrl: ""})
    const [reviews, setReviews] = useState([])
    const [favoriteStatus, setFavoriteStatus] = useState(false)
    const { user } = useAuth()

    const addFavorite = async () => {
        if (user) {
            try {
                const header = { headers: { Authorization: "Bearer " + localStorage.getItem("token") } };
                if (favoriteStatus) {
                    // Remove the movie from the user's favorites
                    // TODO: Not yet implemented
                    setFavoriteStatus(false)
                } else {
                    // Add the movie to the user's favorites
                    await api.post('/favourites', { userId: user.id, movieId: movieDetail.id }, header)
                    setFavoriteStatus(true)
                }
                
            } catch (error) {
                alert(error.response.data.error ? error.response.data.error : error)
            }
        } else {
            // Redirect to sign in page if user is not logged in
            navigate('/signin')
        }
    }

    const addReview = async () => {
        navigate('/reviews', { state: movieDetail })
    }

    const getMovieDetail = async () => {
        try {
            const movieDetailRes = await api.get('/movies/' + movieId)
            const movieData = movieDetailRes.data.data
            console.log(movieData)
            setMovieDetail(movieData)
            console.log(movieDetail)
            
        } catch (error) {
            alert(error.response.data.error ? error.response.data.error : error)
        }
    }

    const getReviews = async () => {
        try {
            const reviewsRes = await api.get('/reviews/' + movieId)
            const reviewsData = reviewsRes.data
            setReviews(reviewsData)
        } catch (error) {
            alert(error.response.data.error ? error.response.data.error : error)
        }
    }

    // Get the movie details and reviews from the API
    useEffect(() => {
        try {
            getMovieDetail()
            getReviews() 
            
        } catch (error) {
            alert(error.response.data.error ? error.response.data.error : error)
        }
    }, [location])


    return (
        <div>
            <div className="movie-layout-flex" style={{backgroundImage: `url(${movieDetail.backdropUrl})`}}>
                <div className="movie-image">
                    <img src={movieDetail.posterUrl} alt="Movie Poster" />
                </div>
                <div className="movie-description">
                    <div className="movie-title">
                        <h1>{movieDetail.title}</h1>
                    </div>
                    <div className="movie-detail">
                        <label>Release Date: </label>
                        <span>{movieDetail.releaseDate}</span>
                    </div>
                    <div className="movie-detail">
                        <label>Genre: </label>
                        {movieDetail.genres.map((genre, index) => { return <span key={index}>{genre + " "}</span> })}
                    </div>
                    <div>
                        <h2>Overview</h2>
                        <p>
                            {movieDetail.overview}
                        </p>
                    </div> 
                    <button className={favoriteStatus? "liked-button" : "like-button"} onClick={addFavorite}>♥</button>
                    <button className="add-review-button" onClick={addReview}>Add your review</button>
                </div>
            </div>

            <div className="recent-reviews-container">
                <div className="header">
                    <h2>Reviews</h2>
                    <p>See what others are saying about the movie.</p>
                </div>
                <dev className="reviews">
                    {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <div className="user-icon"></div>
                                    <span className="user-name">{review.user_name}</span>
                                    <div className="rating">
                                        {'★'.repeat(Math.floor(review.rating))}{'☆'.repeat(5 - Math.floor(review.rating))}
                                    </div>
                                </div>
                                <p className="review-text">{review.comment}</p>
                            </div>
                    ))}
                </dev>
                
            </div>
        </div>
    )
}
