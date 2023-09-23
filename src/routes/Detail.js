import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState("");
    const { id } = useParams();
    const getMovie = async () => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            )
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    };
    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div>{loading ? <h1>loading....</h1> : <div>{movie.title}</div>}</div>
    );
}

export default Detail;
