const { Matchers } = require("@pact-foundation/pact");
const { like, term } = Matchers;

exports.allFilmsResponse = {
  films: [
    {
      id: like(1),
      Name: "Star Wars",
      Description: term({ generate: "Space", matcher: "^\\w+$" }),
      Year: like(1980),
      Duration: like(120)
    },
    {
      id: like(2),
      Name: "Superman",
      Description: term({ generate: "Comic", matcher: "^\\w+$" }),
      Year: like(1986),
      Duration: like(90)
    },
    {
      id: like(3),
      Name: "Indiana Jones",
      Description: term({ generate: "Adventures", matcher: "^\\w+$" }),
      Year: like(1985),
      Duration: like(100)
    },
  ],
};

exports.oneFilmResponse = {
  film: {
    id: 1,
    Name: "Star Wars",
    Description: "Space",
    Year: like(1980),
    Duration: like(120)
  },
};
