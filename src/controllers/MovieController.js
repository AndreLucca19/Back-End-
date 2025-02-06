const Movie = require('../models/movie');
const MovieList = require('../models/movieList');

const lista = new MovieList();
const filme1 = new Movie('Aventura nas Estrelas', 'Justin Lin', 'Universal', '15 de abril de 2011');
const filme2 = new Movie('O Mistério da Ilha', 'James Wan', 'Universal', '15 de abril de 2015');

lista.addmovie(filme1);
lista.addmovie(filme2);

const router = {
    addMovie: (req, res) => {
        try {
            const { title, duration, releaseDate, director, synopsis } =  req.body;
            if(!title || !releaseDate || !duration || !director || !synopsis) {
                throw new Error('Preencha todos os campos!')
            }
            const filme = new Movie (title, duration, releaseDate, director, synopsis)
            lista.addmovie(filme);
            res.status(201).json({message: "Criado com sucesso"});
        } catch (error) {
            res.status(400).json({message: "Erro ao criar o filme", error});
        }
    },

    getAllMovies: (req, res) => {
        try {
            const Movies = lista.getAllMovies();
            res.status(200).json(Movies);
        } catch (error) {
            res.status(404).json({message: 'Erro ao buscar o filme', error});
        }
    },

    getMovieById: (req, res) => {
        try {
            const id = req.params.id;
            res.status(200).json(lista.getMovieById(id));
        } catch (error) {
            res.status(404).json({message: 'Erro ao buscar o filme por id', error });
        }
    },

    updateMovie: (req, res) => {
        try {
            res.status(200).json(lista.updateMovie(req.params.id, req.body));
        } catch (error) {
            res.status(404).json('Erro ao atualizar', error);
        }
    },

    deleteMovie: (req, res) => {
        try {
            lista.deleteMovie(req.params.id);
            res.status(200).json({message: 'Filme deletado com sucesso'})
        } catch (error) {
            res.status(404).json('Erro ao deletar o filme', error);
        }
    },
};

module.exports = router;