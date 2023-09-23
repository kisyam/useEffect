import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [grade, setGrade] = useState("7");

    useEffect(() => {
        const getMovies = async () => {
            const response = await fetch(
                `https://yts.mx/api/v2/list_movies.json?minimum_rating=${grade}&sort_by=year`
            );
            const json = await response.json();
            setMovies(json.data.movies);
            setLoading(false);
        };
        getMovies();
    }, [grade]);

    const gradeHandle = (event) => {
        setGrade(event.target.value);
    };

    return (
        <div className="App">
            <select value={grade} onChange={gradeHandle}>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
            {loading ? (
                <div>
                    <h1>Loading....</h1>
                </div>
            ) : (
                <div className="movie">
                    {movies.map((movie) => (
                        <div key={movie.id}>
                            <img
                                alt="movie poster"
                                src={movie.medium_cover_image}
                            />
                            <h2>{movie.title}</h2>
                            <p>{movie.summary}</p>
                            <ul>
                                {movie.genres.map((g) => (
                                    <li key={g}>{g}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            ;
        </div>
    );
}

export default App;
