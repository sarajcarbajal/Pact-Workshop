const Film = require("../models/filmModel");
const FilmRepository = require("../models/filmsRepository");

const filmRepository = new FilmRepository();

exports.filmRepository = filmRepository;

exports.list_init_data = function (req, res) {
  filmRepository.clear();
  filmRepository.insert(new Film(1, "Star Wars", "Space", 1980, 120));
  filmRepository.insert(new Film(2, "Superman", "Comic", 1986, 90));
  filmRepository.insert(new Film(3, "Indiana Jones", "Adventures", 1985, 100));
  res.end();
};

exports.init_data = () => {
  filmRepository.insert(new Film(1, "Star Wars", "Space", 2980, 220));
  filmRepository.insert(new Film(20, "Superman", "Fantastic", 2986, 290));
  filmRepository.insert(new Film(30, "Indiana Jones", "Romance", 2985, 200));
};

exports.list_all_films = function (req, res) {
  const response = {
    films: filmRepository.fetchAll(),
  };
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(response));
};

exports.create_a_film = function (req, res) {
  var new_film = Film.fromJson(req.body);

  var filmExist = filmRepository.getById(new_film.id);

  var returnCode = 200;
  var response = new_film;
  if (filmExist != undefined) {
    returnCode = 500;
    response = "Duplicate ID";
  } else {
    returnCode = 200;
    filmRepository.insert(new_film);
    response = new_film;
  }
  res.writeHead(returnCode, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(response));
};

exports.delete_a_film = (req, res) => {
  var id = req.params.filmId;
  var filmExist = filmRepository.getById(id);

  if (filmExist != undefined) {
    var result = filmRepository.delete(id);
    if (result != -1) returnCode = 200;
    else returnCode = 500;
    response = "Film Deleted";
  } else {
    returnCode = 404;
    response = "ID Not found";
  }
  res.writeHead(returnCode, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(response));
};

exports.read_a_film = function (req, res) {
  var id = req.params.filmId;

  response = {
    film: filmRepository.getById(id),
  };
  var returnCode = 200;

  if (typeof response.film === "undefined") {
    returnCode = 404;
    response = "Film not found";
  }

  res.writeHead(returnCode, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(response));
};
