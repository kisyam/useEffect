import Movie from "../components/Movie";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";

function Home() {
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
        <div className={styles.container}>
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
                <div className={styles.movies}>
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            year={movie.year}
                            coverImg={movie.medium_cover_image}
                            title={movie.title}
                            summary={movie.summary}
                            genres={movie.genres}
                        />
                    ))}
                </div>
            )}
            ;
        </div>
    );
}

export default Home;
