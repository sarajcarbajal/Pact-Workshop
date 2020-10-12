class Film {
    constructor(id, Name, Description, Year, Duration) {
        this.id = id;
        this.Nombre = Name;
        this.Descripcion = Description;
        this.Year = Year;
        this.Duration;
    }

    static fromJson(data) {
        return new Film(data.id, data.Name, data.Description, data.Year, data.Duration);
    }

}

module.exports = Film;