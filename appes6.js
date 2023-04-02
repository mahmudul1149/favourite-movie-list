class Movie {
  constructor(movieName, author, released) {
    this.movieName = movieName;
    this.author = author;
    this.released = released;
  }
}

class UI {
  showMessage(message, alert) {
    const container = document.getElementById("container");
    const form = document.getElementById("form");

    const messageDiv = document.createElement("div");

    messageDiv.className = `${alert}`;

    messageDiv.appendChild(document.createTextNode(message));

    container.insertBefore(messageDiv, form);

    setTimeout(function () {
      messageDiv.remove();
    }, 2000);
  }

  createMovieItem(movie) {
    const movieList = document.querySelector("#table-body");

    const row = document.createElement("tr");

    row.innerHTML = `
	  <td>${movie.movieName}</td>
	  <td>${movie.author}</td>
	  <td>${movie.released}</td>
	  <td><a href="#" class = "delete">x</a></td>
	  `;

    movieList.appendChild(row);
  }

  deleteMovie(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();

      this.showMessage("Romove successful.", "success");
    }
  }

  clearFild() {
    document.getElementById("movie-name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("released").value = "";
  }
}

class Store {
  static getMovies() {
    let movies;

    if (localStorage.getItem("movies") === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem("movies"));
    }

    return movies;
  }

  // DISPLAY MOVIES
  static displayMovies() {
    const movies = Store.getMovies();

    movies.forEach(function (movie) {
      const ui = new UI();

      ui.createMovieItem(movie);
    });
  }

  static addMOvie(movie) {
    const movies = Store.getMovies();

    movies.push(movie);

    localStorage.setItem("movies", JSON.stringify(movies));
  }

  static removeMovie(released) {
    const movies = Store.getMovies();

    movies.forEach(function (movie, index) {
      if (movie.released === released) {
        movies.splice(index, 1);

        localStorage.setItem("movies", JSON.stringify(movies));
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", Store.displayMovies());

document.getElementById("form").addEventListener("submit", function (e) {
  const movieName = document.getElementById("movie-name").value;
  const author = document.getElementById("author").value;
  const released = document.getElementById("released").value;

  const movie = new Movie(movieName, author, released);

  const ui = new UI();

  if (movieName === "" || author === "" || released === "") {
    ui.showMessage("Please Fill Out All Input Form", "error");
  } else {
    ui.createMovieItem(movie);

    Store.addMOvie(movie);

    ui.showMessage("Your movie successfully added.", "success");

    ui.clearFild();
  }

  e.preventDefault();
});

document.querySelector("#table-body").addEventListener("click", function (e) {
  const ui = new UI();

  ui.deleteMovie(e.target);

  Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});
